import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "bootstrap/dist/css/bootstrap.css";

const queryClient = new QueryClient(/*{
  possible customization of React Query:
  
  defaultOptions: {
    queries: {
      retry: 3,
      cacheTime: 300_000,
      staleTime: 10 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
    },
  },
}*/);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);

/* QueryClient = core object for managing and caching remote data 
  - create QueryClient object
  - wrap app component in QueryClientProvider using that object 
  - stale data is automatically refreshed when:
      * the network is reconnected
      * a component is mounted
      * the window is refocused
  
  React Query Dev Tools will not be included in production */
