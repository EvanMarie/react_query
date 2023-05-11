import React from "react";
import usePostsLoad from "./hooks/usePostsLoad";

const PostListLoad = () => {
  const pageSize = 10;
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } =
    usePostsLoad({
      pageSize,
    });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <ul className="list-group">
        {/* go to data.pages, and map each page to a React fragment */}
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {/* inside the fragment, map the contents of each page, an array
            of posts, to list items */}
            {page.map((post) => (
              <li key={post.id} className="list-group-item">
                {post.title}
              </li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      {/* Previous and Next buttons */}
      <button
        className="btn btn-primary my-3 ms-1"
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </>
  );
};

export default PostListLoad;
