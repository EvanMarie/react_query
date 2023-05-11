import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
    page: number,
    pageSize: number,
}

/*  The usePostsPagination function takes a query parameter of type PostQuery.
    - Inside the function, the useQuery hook is used to define a data fetching query.
    - The queryKey property specifies the unique key for the query. In this case, 
      it is an array containing the string "posts" and the query object.
    - The queryFn property specifies the function that will be called to fetch the 
      data. It sends a GET request to "https://jsonplaceholder.typicode.com/posts" 
      with query parameters _start and _limit based on the provided query.page and 
      query.pageSize values. It then extracts and returns the response data.
    - The staleTime property sets the time (in milliseconds) for how long the data 
      is considered fresh without re-fetching.
    - The keepPreviousData property is set to true to keep the previous page's data 
      until the next page is loaded, preventing jumping visuals on the page. */


const usePostsPagination = (query: PostQuery
  ) => useQuery<Post[], Error>({
    queryKey: ["posts", query],
    queryFn: () =>   
    axios
    .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
            _start: (query.page - 1) * query.pageSize,
            _limit: query.pageSize
        }
        })
      .then((response) => response.data),
    staleTime: 10 * 1000,
    // keeps previous page's data until next page is loaded to avoid
    // jumping visuals on the page
    keepPreviousData: true,
});

export default usePostsPagination