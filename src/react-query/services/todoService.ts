import APIClient from "./apiClient"

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}
const apiClient = new APIClient<Todo>('/todos')

export default new APIClient<Todo>('/todo')