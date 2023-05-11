import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const usePosts = (userId: number | undefined) => useQuery<Post[], Error>({
    /* Heirarchical structure that represents the relationship of objects
       left to right data gets more specific 
       If a userId is selected, the array contains all data, otherwise, 
       it contains all the posts only */
    queryKey: userId ? ["users", userId, "posts"] : ["posts"],
    queryFn: () =>   
    axios
    .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
            userId
        }
        })
      .then((response) => response.data),
    staleTime: 10 * 1000,
});

export default usePosts