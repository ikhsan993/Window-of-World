import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./context/userContext";

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
     <UserContextProvider>
      <QueryClientProvider client={client}>
      <Router>
          <App />
      </Router>
      </QueryClientProvider>
     </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);