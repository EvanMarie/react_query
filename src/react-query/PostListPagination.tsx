import { useState } from "react";
import usePostsPagination from "./hooks/usePostsPagination";

const PostListPagination = () => {
  /* Initializing the page size and page state variables:
    pageSize is set to 10, representing the number of posts to be displayed per page.
    page is a state variable created using the useState hook. It is initialized with 
    a value of 1, indicating the current page.
    */
  const pageSize = 10;
  const [page, setPage] = useState(1);

  /* The usePostsPagination hook is is responsible for fetching the paginated 
     posts data and is called with an object containing the page and 
     pageSize values as parameters. It returns an object with the data, error, and 
     isLoading properties.
    - data represents the fetched posts data.
    - error holds any error that occurred during the data fetching process.
    - isLoading indicates whether the data is currently being fetched. */

  const { data, error, isLoading } = usePostsPagination({ page, pageSize });

  /* If isLoading is true, a loading message is displayed.
     If error exists, an error message is displayed using the error.message 
     property. */

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  /* If no loading or error state is present, the paginated post list is rendered.
    - The posts data is mapped over using the map method. Each post is rendered 
      as an <li> element with its title displayed.
    - Two buttons are included for pagination: "Previous" and "Next". The "Previous" 
      button is disabled when the current page is the first page (page === 1).
    - Clicking the "Previous" button triggers the setPage function with the current 
      page decremented by 1.
    - Clicking the "Next" button triggers the setPage function with the current page 
      incremented by 1. */

  return (
    <>
      <ul className="list-group">
        {data?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      {/* Previous and Next buttons */}
      <button
        disabled={page === 1}
        className="btn btn-primary my-3"
        onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <button
        className="btn btn-primary my-3 ms-1"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
};

export default PostListPagination;
