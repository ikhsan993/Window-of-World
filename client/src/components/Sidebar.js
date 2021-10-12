import {React,useState,useContext} from 'react'
import Icon from '../assets/img/Icon.png';
import UserImage from '../assets/img/user.jpg'
import bil1 from '../assets/img/bill 1.png'
import user1 from '../assets/img/user 1.png'
import logout1 from '../assets/img/user 1.png'
import {Link,useHistory} from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function Sidebar() {
 
let api = API();
const [state, dispatch] = useContext(UserContext);
const userName = state.userName;
let history = useHistory()
const logout = (e) => {
    e.preventDefault();
    dispatch({
        type: "LOGOUT"
        })
    }
  let { data: user} = useQuery("userCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/user", config);
    return response.data;
  });
  let userStatus = "";
    if (user?.userStatus ==='Active') {userStatus=<b className="text-success ">Subscribed</b>}
    else {userStatus=<b className="text-red ">Not Subscribed Yet </b>}
    let photo = "";
    if (user?.photo ==null) {photo=UserImage}
    else {photo=user?.photo}    
    return (
        <>
            <div className="col-3 px-3">
            <div className="logo mt-4 text-center">
           <img src={Icon} alt="WoW" width="80px" className="rotate" />
           </div>
           <div className="user-image mt-4 text-center">
           <img src={photo} alt="WoW" width="80px" />
           </div>
           <div className="user text-center">
           <p className="mt-2 fs-4s bold">{user?.name}</p>
           <p>{userStatus}</p>
           </div>
           <div className="row ms-3 mt-5 text-grey">
          <div className="col-2 text-left"> <img className="ico" src={user1} alt="" /></div>
          <div className="col-9 text-left mb-5 link">
            <Link to="/profile">Profile</Link>
           </div>
           <div className="col-2 text-left "> <img className ="ico" src={bil1} alt="" /></div>
          <div className="col-9 text-left mb-5 link">
           <Link to="/subscribe">Subscribe</Link>
           </div>
           <div className="col-2 text-left"> <img className ="ico" src={logout1} alt="" /></div>
          <div className="col-9 text-left link">
            <Link to="#" onClick = {logout} >Logout</Link>
           </div>
           </div>
        </div>        
        </>
    )
}
