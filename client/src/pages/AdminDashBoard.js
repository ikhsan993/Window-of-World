// react components
import {React,useState,useContext }from 'react';
import { UserContext } from "../context/userContext";
import BookCardAdmin from '../components/BookCardAdmin';
import Sidebar from '../components/Sidebar';
import { useQuery } from "react-query";
import { API } from "../config/api";
import {Link,useHistory} from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
// assets

import UserImage from '../assets/img/user.jpg'
import Icon from '../assets/img/Icon.png';
export default function AdminDashboard() {

   let api = API();
    const [state, dispatch] = useContext(UserContext)
    let history = useHistory()
    const logout = (e) => {
    e.preventDefault();
    dispatch({
        type: "LOGOUT"
        })
    }
  let { data: books, refetch} = useQuery("booksCache", async () => {
  const config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.token,
    },
  };
  const response = await api.get("/books", config);
  return response.data.books;  
  refetch();
});
    let transaction = ()=>{
    history.push("/transaction")
}
    return (
        <>
         <div className="container-fluid main-bg home-container">
            <div className="row px-5">
                <div className="col-1 px-5 mt-5">
                  <img src={Icon} alt="" width="80px" className="rotate" />
                </div>
                <div className="col-9"></div>
                  <div className="col-1 px-5 mx-5 mt-5 user-image">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic" className="noborder">
                        <img className="dropdown-toggle " src={UserImage} alt="WoW" width="40px" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item className="link" onClick={transaction}> Transaction </Dropdown.Item>
                        <Dropdown.Item className="link" onClick={logout}>Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
            <div className="col-8 mx-auto mt-5">
                      <div className="row mt-3 ms-1">
                          <h2 className="mb-5"><b>List Book</b></h2>
                          <div className="books">
                          {books?.map((item, index) => (
                          <BookCardAdmin item={item} key={index} />
                          ))}
                          </div>
                   
                </div>
                </div>
                </div>
                </div>

        </>
    )
}
