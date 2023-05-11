import { useQuery } from '@tanstack/react-query';
import { CACHE_KEY_TODOS } from '../constants';
import APIClient from '../services/apiClient';

const apiClient = new APIClient<Todo>('/todos')

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

const useTodos = () => {
      return (
        useQuery<Todo[], Error>({
    queryKey: CACHE_KEY_TODOS,
    queryFn: apiClient.getAll,
    staleTime: 10 * 1000,
}));
}

export default useTodos

  /*  useQuery is the React Query hook used for fetching data
        - it takes a configuration object with 2 props
            1) queryKey: unique id for query used internally for caching
                - any data retrieved from the backend, it is stored in the cache
                    and is accessible using this key
                - the key's first value is usually a string that identifies the 
                    type of data to be stored
                - it can also take additional values specifying use of the data
            2) queryFn: the function used to fetch data from the backend
                - it returns a promise that resolves the data or throws an error 
        - This can be used with axios as above or with any other HTTP library for
            fetching data 
    - At runtime, getTodos will be called. When the promise is resolved, 
        it will return an array of Todos that will be stored in the cache
        against the query key 
    - This configuration allows for multiple retries with react query if the
        call to the server fails at first. 
    - It also allows for auto refresh and caching, which improves performance 
    - React Query also makes state variables for errors, data, loading, etc 
        unnecessary, as the useQuery object contains all these */