import React from 'react'
import LandingPage from './pages/LandingPage';
import Home from './pages/Home'
import DetailBook from './pages/DetailBook'
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Route, Switch,Link} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import Subscribe from './pages/Subscribe';
import AddBook from './pages/AddBook';
import ReadBook from './pages/ReadBook';
import Transaction from './pages/Transaction';

export default function App() {

    return ( 
    
        <Router>
        <Switch>
            <Route exact path="/" component={LandingPage}/>
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/subscribe" component={Subscribe} />
            <PrivateRoute path="/add-book" component={AddBook} />
            <PrivateRoute path="/transaction" component={Transaction} />
            <PrivateRoute path="/read" component={ReadBook} />
            <PrivateRoute path="/book-detail/:id" component={DetailBook} />
            <Route path="*" component={NotFound} />
        </Switch>
        </Router>       
    );
}