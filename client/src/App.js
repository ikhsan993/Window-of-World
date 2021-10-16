
import {useContext, useState, useEffect } from "react";
import LandingPage from './pages/LandingPage';
import Home from './pages/Home'
import DetailBook from './pages/DetailBook'
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';
import { Switch, Route, useHistory } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Subscribe from './pages/Subscribe';
import AddBook from './pages/AddBook';
import AdminDashBoard from './pages/AdminDashBoard';
import DetailBookAdmin from './pages/DetailBookAdmin';
import ReadBook from './pages/ReadBook';
import Transaction from './pages/Transaction';
import { UserContext } from "./context/userContext";

import {API} from './config/api'

export default function App() {
let api = API();
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin == false) {
      history.push('/');
    } else {
      if (state.user.role == "admin") {
        history.push("/transaction");
        // history.push("/complain-admin");
      } else if (state.user.role == "user") {
        history.push("/home");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const config = {
        method: "GET",
        headers: {
          Authorization: "Basic " + localStorage.token,
        },
      };
      const response = await api.get("/check-auth", config);

      // If the token incorrect
      if (response.status === "failed") {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // // Get user data
      let payload = response.data.user;
      // // Get token from local storage
      payload.token = localStorage.token;

      // // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
    return ( 
    

        <Switch>
            <Route exact path="/" component={LandingPage}/>
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/subscribe" component={Subscribe} />
            <PrivateRoute path="/add-book" component={AddBook} />
            <PrivateRoute path="/book-admin" component={AdminDashBoard} />
            <PrivateRoute path="/detail-book-admin/:id" component={DetailBookAdmin} />
            <PrivateRoute path="/transaction" component={Transaction} />
            <PrivateRoute path="/read-book/:id" component={ReadBook} />
            <PrivateRoute path="/book-detail/:id" component={DetailBook} />
            <Route path="*" component={NotFound} />
        </Switch>
    
    );
}