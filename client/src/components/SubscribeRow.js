import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import triangle from '../assets/img/triangle.png';

export default function SubscribeRow({ item,idx }) {

let userStatusClass = "";
    if (item.userStatus ==='Active') {userStatusClass="text-success"}
    else {userStatusClass="text-danger"}

let paymentStatusClass = "";
    if (item.paymentStatus ==='Approved') {paymentStatusClass="text-success"}
    else if (item.paymentStatus ==='Pending') { paymentStatusClass="text-warning"}
    else {paymentStatusClass="text-danger"}
    return (
        <>
  <tr>
      <th scope="row">{idx+1}</th>
      <td>{item.name}</td>
      <td><img src ={item.transferProof} width ="100px"/></td>
      <td>{item.remainingActive} Days</td>
      <td className ={userStatusClass}>{item.userStatus}</td>
      <td className={paymentStatusClass}>{item.paymentStatus}</td>
      <td className="text-center"><img />
      <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" className="noborder">
                        <img className="dropdown-toggle " src={triangle} alt="" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item className="link text-success" onClick=""> Approved </Dropdown.Item>
                        <Dropdown.Item className="link text-danger" onClick=""> Cancel</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown></td>
    </tr> 
        </>
    )
}
