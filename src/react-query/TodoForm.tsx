import { useRef } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Todo } from "./services/todoService";

/* The useMutation and useQueryClient hooks are used for managing mutations and 
accessing the query client respectively.
- The useQueryClient hook is called to obtain the query client instance. It is
used to manage and interact with the cache.
- The mutationFn property specifies the actual function that will be called when 
the mutation is triggered. In this case, it sends a POST request to 
"https://jsonplaceholder.typicode.com/todos" with the todo object as the 
request payload. The response is then extracted and returned.*/

const TodoForm = () => {
  const queryClient = useQueryClient();
  const addTodo = useMutation<Todo, Error, Todo>({
    mutationFn: (todo: Todo) =>
      axios
        /* The Todo type represents the structure of a todo item.*/
        .post<Todo>("https://jsonplaceholder.typicode.com/todos", todo)
        .then((response) => response.data),

    onSuccess: (savedTodo, newTodo) => {
      /* Approach 1: invalidating the cache (does not work with JSONplaceholder)
         queryClient.invalidateQueries({
           queryKey: ['todos']
         })
      Approach 2: Updating the data in the cache directly using setQueryData and 
                    passing the queryKey and an updating function */

      queryClient.setQueryData<Todo[]>(["todos"], (todos) => [
        savedTodo,
        ...(todos || []),
      ]);

      // clearning the form field if the value is already being added
      if (ref.current) ref.current.value = "";

      /* The onSuccess property defines a callback function that will be executed 
        if the mutation succeeds. It receives the savedTodo (the response data from 
        the server) and newTodo (the todo object passed to addTodo.mutate(), which 
        is not used in this case).
        - Inside the onSuccess callback, the cache is updated by using the setQueryData 
        function of the query client. It sets the new data for the "todos" query key 
        in the cache. The new data is an array that includes the savedTodo as the first 
        item, followed by the existing todos (if any). */
    },
  });

  /* The useRef hook is used to create a reference to the input element in the form. 
     It is initialized with a value of null. */
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
          <button disabled={addTodo.isLoading} className="btn btn-primary">
            {addTodo.isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoForm;
