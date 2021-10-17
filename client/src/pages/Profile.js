// React Components
import React from 'react'
import { useQuery } from "react-query";
import { API } from "../config/api";
import Sidebar from '../components/Sidebar';
import BookCard from '../components/BookCard';
import EditProfile from '../components/EditProfile';
// Assets
import mail from '../assets/img/mail.png'
import phoneIco from '../assets/img/phone.png'
import place from '../assets/img/place.png'
import genderIco from '../assets/img/gender.png'
import UserImage from '../assets/img/user.jpg'

export default function Profile() {

  let api = API();
  let { data: books} = useQuery("booksCache", async () => {
  const config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.token,
    },
  };
  const response = await api.get("/book-list", config);
  return response.data;
  });

  let { data: user} = useQuery("userCache", async () => {
    const config = {
      method: "GET",
      headers: {Authorization: "Basic " + localStorage.token,},
    };
  const response = await api.get("/user", config);
    return response.data;
  });

  let userStatus = "";
    if (user?.userStatus ==='Active') {userStatus=<b className="text-success ">Subscribed</b>}
    else {userStatus=<b className="text-red ">Not Subscribed Yet </b>}
    let havePhoto = false;
    if (user?.photo ==null) {havePhoto=false}
    else {havePhoto=true}  
    let address = "";
    if (user?.address ==null) {address='-'}
    else {address=user?.address}
    let gender = "";  
    if (user?.gender ==null) {gender='-'}
    else {gender=user?.gender}    
    let phone = "";
    if (user?.phone ==null) {phone='-'}
    else {phone=user?.phone}  

  return (
    <>
      <div className="container-fluid main-bg home-container">
        <div className="row px-2 py-5">
        <Sidebar/>
        <div className="col-9 px-5 mt-5">
          <h3><b>Profile</b></h3>
          <div className="row  mt-3">
            <div className="col-11 profile">
              <div className= "row">
                <div className = "col-9">
                  <div className="row px-3 py-3">
                    <div className="col-1 ps-4">
                      <img src={mail} alt="mail"/>
                    </div>
                    <div className="col-11"><p className="info"><b>{user?.email}</b></p>
                      <span className="info-ext text-grey">Email</span>
                    </div>
                  </div>
                  <div className="row px-3 py-3">
                    <div className="col-1 ps-4">
                      <img src={genderIco} alt="gender"/>
                    </div>
                  <div className="col-11">
                    <p className="info"><b>{gender}</b></p>
                    <span className="info-ext text-grey">Gender</span>
                  </div>
                </div>
                <div className="row px-3 py-3">
                  <div className="col-1 ps-4">
                    <img src={phoneIco} alt="phone"/>
                  </div>
                  <div className="col-11">
                    <p className="info"><b>{phone}</b></p>
                    <span className="info-ext text-grey">Phone</span>
                  </div>
                </div>
                <div className="row px-3 py-3">
                  <div className="col-1 ps-4">
                    <img src={place} alt="place"/>
                  </div>
                  <div className="col-11">
                    <p className="info"><b>{address}</b></p>
                    <span className="info-ext text-grey">Address</span>
                  </div>
                </div>
              </div>
              <div className="col-3 px-3 py-3 text-center">
                {havePhoto ?
                  <img src={user?.photo} alt="user" width = "150px" height = "150px" /> :
                  <img src={UserImage} alt="user" width = "150px" height = "150px" />
                }
                <EditProfile/>
              </div>
            </div>
          </div>
          <div className ="col-1">
          </div>
        </div>
        <div className="mt-5"></div>
          <h4><b> My List Book </b></h4>
          <div className="mt-4">
            <div className="books">
              {books?.map((item, index) => (
                <BookCard item={item} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)}
