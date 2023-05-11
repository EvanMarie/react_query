import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostQuery {
    pageSize: number,
}

const usePostsLoad = (query: PostQuery
  ) => useInfiniteQuery<Post[], Error>({
    queryKey: ["posts", query],
    // initialized to 1 to get the data for first page initially
    queryFn: ({ pageParam = 1 }) =>   
    axios
    .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
            _start: (pageParam- 1) * query.pageSize,
            _limit: query.pageSize
        }
        })
      .then((response) => response.data),
    staleTime: 10 * 1000,
    // keeps previous page's data until next page is loaded to avoid
    // jumping visuals on the page
    keepPreviousData: true,
    // allPages contains the data for all of the pages
    // this is called when the Load More button is clicked
    getNextPageParam: (lastPage, allPages) => {
        // return the next page number if we have not reached the end
        // the API used here requires this method, because it does not tell
        // the total number of pages ahead of time so we can calculate
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
    }
});

export default usePostsLoad