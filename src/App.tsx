import "./App.css";
import PostList from "./react-query/PostList";
import PostListLoad from "./react-query/PostListLoad";
import PostListPagination from "./react-query/PostListPagination";
import TodoForm from "./react-query/TodoForm";
import TodoFormWithHook from "./react-query/TodoFormWithHook";
import TodoList from "./react-query/TodoList";

const App = () => {
  return (
    <>
      <hr className="red-hr" />
      <h2>POST LIST with USER FILTER</h2>
      <PostList />
      <hr className="red-hr" />
      <h2>POST LIST with PAGINATION</h2>
      <PostListPagination />
      <hr className="red-hr" />
      <h2>POST LIST - Load More</h2>
      <PostListLoad />
      <hr className="red-hr" />
      <h2>TODO LIST</h2>
      <TodoForm />
      <TodoList />
      <hr className="red-hr" />
      <h2>TODO LIST w/ FORM HOOK</h2>
      <TodoFormWithHook />
      <TodoList />
    </>
  );
};

export default App;
