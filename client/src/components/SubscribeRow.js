// React Component
import { React ,useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useQuery,useMutation } from "react-query";
import {useHistory} from "react-router-dom";
import { API } from "../config/api";
import {Modal} from 'react-bootstrap';

// Assests
import triangle from '../assets/img/triangle.png';

export default function SubscribeRow({ item, idx}) {

let api = API();
let history = useHistory()

const [showApprove, setShowApprove] = useState(false);
const [showCancel, setShowCancel] = useState(false);
const handleCloseApprove = () => setShowApprove(false);
const handleShowApprove = () => setShowApprove(true);
const handleCloseCancel = () => setShowCancel(false);
const handleShowCancel = () => setShowCancel(true);

let userStatusClass = "";
  if (item.userStatus ==='Active') {userStatusClass="text-success"}
  else {userStatusClass="text-danger"}
let paymentStatusClass = "";
  if (item.paymentStatus ==='Approved') {paymentStatusClass="text-success"}
  else if (item.paymentStatus ==='Pending') { paymentStatusClass="text-warning"}
  else {paymentStatusClass="text-danger"}

const subscribeId = item.id;  
const userId = item.userId;      

const handleApprove = useMutation(async (e) => {
  try {
    e.preventDefault();
    const body = (JSON.stringify({id : subscribeId, userId:userId, userStatus:"Active", paymentStatus: "Approved", remainingActive : 30 }));
    const config = {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + localStorage.token,
      },
      body: body,
    };

    const response = await api.patch("/subscribe", config);
    handleShowApprove();
  } catch (error) {
    console.log(error);
    }
});   

  const handleCancel = useMutation(async (e) => {
    try {
      e.preventDefault();
      const body = (JSON.stringify({id : subscribeId, userId:userId, userStatus:"Inactive", paymentStatus: "Canceled", remainingActive : 0 }));
      const config = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + localStorage.token,
        },
        body: body,
      };

      const response = await api.patch("/subscribe", config);
      handleShowCancel();
    } catch (error) {
      console.log(error);
  }
});       
  return (
    <>
      <tr key={item.id}>
        <th>{idx+1}</th>
        <td>{item.name}</td>
        <td><img src ={item.transferProof} width ="100px"/></td>
        <td>{item.remainingActive} Days</td>
        <td className ={userStatusClass}>{item.userStatus}</td>
        <td className={paymentStatusClass}>{item.paymentStatus}</td>
          <Modal show={showApprove} onHide={handleCloseApprove}>
            <div className="container mb-3 py-3 px-5 text-success">
            Subscription Approved
            </div>
          </Modal>
          <Modal show={showCancel} onHide={handleCloseCancel}>
            <div className="container mb-3 py-3 px-5 text-danger">
            Subscription Canceled
            </div>
          </Modal>
        <td className="text-center">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" className="noborder">
              <img className="dropdown-toggle " src={triangle} alt="" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item className="link text-success" onClick={(e) => handleApprove.mutate(e)}> Approved </Dropdown.Item>
              <Dropdown.Item className="link text-danger" onClick={(e) => handleCancel.mutate(e)}> Cancel</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
    </tr> 
  </>
)}
