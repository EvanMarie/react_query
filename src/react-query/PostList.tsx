import { useState } from "react";
import usePosts from "./hooks/usePosts";

/* The usePosts is responsible for fetching the posts data based on 
   the selected user. */

const PostList = () => {
  /* userId is a state variable created using the useState hook. 
     It is initialized without a value (undefined) because no user is 
     selected initially.
     - setUserId is a function that can be used to update the value of userId. */

  const [userId, setUserId] = useState<number>();

  /* The usePosts hook is called with the userId value as a parameter. 
       It returns an object with the data, error, and isLoading properties.
       - data represents the fetched posts data.
       - error holds any error that occurred during the data fetching process.
       - isLoading indicates whether the data is currently being fetched. */

  const { data, error, isLoading } = usePosts(userId);

  /* If isLoading is true, a loading message is displayed.
     If error exists, an error message is displayed using the error.message 
     property. */

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  /* If no loading or error state is present, the user selection dropdown 
     and post list are rendered.
     - The select element represents a dropdown menu for selecting a user. 
       The onChange event handler is triggered whenever the selected value changes. 
       It updates the userId state with the parsed integer value of the selected option.
     - The selected value is set to userId, so the dropdown maintains the selected user.
     - The data array is mapped over using the map method. Each post is rendered as 
       an <li> element with its title displayed. */

  return (
    <>
      <select
        onChange={(event) => setUserId(parseInt(event.target.value))}
        value={userId}
        className="form-select mb-3"
      >
        <option value=""></option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {data?.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
