import { useRef } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "./services/todoService";

interface AddTodoContext {
  previousTodos: Todo[];
}

const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo, AddTodoContext>({
    mutationFn: (todo: Todo) =>
      axios
        /* The Todo type represents the structure of a todo item.*/
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((response) => response.data),

    // Implementing optimistic update, step one = onMutate:
    onMutate: (newTodo) => {
      // creating a context object that holds all todos before mutating
      // if it is undefined, we will return an empty array
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || [];
      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        newTodo,
        ...(todos || []),
      ]);

      if (ref.current) ref.current.value = "";

      return { previousTodos };
    },

    /* Handling success scenario:
    - if the request is successful, we should replace the new todo with the one we
      get from the backend, because the new todo does not have an id. We have set
      it to 0.
    - we will replace it with a saved todo from the backend instead
    - we will get a todo object from the backend if the input todo is the same as 
      the saved todo. We will then replace the new todo with the saved todo.
    - otherwise, we return the same todo object
    */

    onSuccess: (savedTodo, newTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (todos) =>
        todos?.map((todo) => (todo === newTodo ? savedTodo : todo))
      );
    },
    /* Handling an error scenario:
    - if the request fails, we should roll back and restore the UI to previous state
    - the third parameter below is context. This object is used to pass data between
    our callbacks 
    - Here we need a context object that includes the previous todos before we 
    updated the cache, which we created above, previousTodos.
    */

    onError: (error, newTodo, context) => {
      if (!context) return;
      queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos);
    },
  });

  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      {addTodo.error && (
        <div className="alert alert-danger">{addTodo.error.message}</div>
      )}
      <form
        className="row mb-3"
        onSubmit={(event) => {
          event.preventDefault();
          // insuring a user inputs a value before sending a post request
          if (ref.current && ref.current.value)
            addTodo.mutate({
              id: 0,
              title: ref.current?.value,
              completed: false,
              userId: 1,
            });
        }}
      >
        <div className="col">
          <input ref={ref} type="text" className="form-control" />
        </div>
        <div className="col">
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
