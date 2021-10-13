// React components
import {React,useState,useContext }from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link,useHistory} from "react-router-dom";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { useQuery } from "react-query";
import SubscribeRow from '../components/SubscribeRow';
//assets
import Icon from '../assets/img/Icon.png';
import UserImage from '../assets/img/user.jpg'


export default function Transaction() {

    let api = API();
    const [state, dispatch] = useContext(UserContext)
    let history = useHistory()
    const logout = (e) => {
    e.preventDefault();
    dispatch({
        type: "LOGOUT"
        })
        history.push("/")
    }

  let { data: subscribes} = useQuery("subscribesCache", async () => {
  const config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.token,
    },
  };
  const response = await api.get("/subscribes", config);
  return response.data;
});
let addBook = ()=>{
    history.push("/add-book")
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
                        <Dropdown.Item className="link" onClick={addBook}> Add Book </Dropdown.Item>
                        <Dropdown.Item className="link" onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
          </div>
          <div className="col-8 mx-auto mt-5">
           <h4><b>Incoming Transcation</b></h4> 

           <table className="table table-striped">
  <thead>
    <tr className="text-red">
      <th scope="col">No</th>
      <th scope="col">Users</th>
      <th scope="col">Bukti Transfer</th>
      <th scope="col">Remaining Active</th>
      <th scope="col">Status User</th>
      <th scope="col">Status Payment</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
 {subscribes?.map((item, index) => (
  <SubscribeRow item={item} idx={index} />
  ))}
  </tbody>
</table>
           </div>
        </div>
        </>
    )   
}
