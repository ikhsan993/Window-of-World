import React from 'react'
import Sidebar from '../components/Sidebar'
import mail from '../assets/img/mail.png'
import phone from '../assets/img/phone.png'
import place from '../assets/img/place.png'
import gender from '../assets/img/gender.png'
import UserImage from '../assets/img/user.jpg'
import BookCard from '../components/BookCard'
export default function Profile() {
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
              <div className="col-11"><p className="info"><b>egigans@gmail.com</b></p>
              <span className="info-ext text-grey">Email</span>
              </div>
              </div>
              <div className="row px-3 py-3">
              <div className="col-1 ps-4">
              <img src={gender} alt="gender"/>
              </div>
              <div className="col-11">
                <p className="info"><b>Male</b></p>
                <span className="info-ext text-grey">Gender</span>
              </div>
              </div>
              <div className="row px-3 py-3">
              <div className="col-1 ps-4">
              <img src={phone} alt="phone"/>
              </div>
              <div className="col-11">
                <p className="info"><b>0812-8623-8911</b></p>
                <span className="info-ext text-grey">Phone</span>
              </div>
              </div>
              <div className="row px-3 py-3">
              <div className="col-1 ps-4">
              <img src={place} alt="place"/>
              </div>
              <div className="col-11">
                <p className="info"><b>Perumahan Permata Bintaro Residence C-3</b></p>
                <span className="info-ext text-grey">Address</span>
              </div>
              </div>
          </div>
          <div className="col-3 px-3 py-3 text-center">
            <img src={UserImage} alt="user" />
            <button className ="mt-3 btn bg-red text-light btn-lg px-4 fs-6">Edit Profile</button>
          </div>
          </div>
          </div>
         
          <div className ="col-1">
          </div>
          
          </div>
          <div className="mt-5"></div>
          <h4><b> My List Book </b></h4>
          <div className="mt-4">
          <BookCard/>
          </div>
          </div>
          </div>
          </div>
        </>
    )
}
