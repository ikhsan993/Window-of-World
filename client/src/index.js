import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./context/userContext";

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
     <UserContextProvider>
      <QueryClientProvider client={client}>
          <App />
      </QueryClientProvider>
     </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);