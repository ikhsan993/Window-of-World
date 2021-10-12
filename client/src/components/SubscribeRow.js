import React from 'react'
import triangle from '../assets/img/triangle.png';

export default function SubscribeRow({ item }) {

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
      <th scope="row">1</th>
      <td>{item.name}</td>
      <td><img src ={item.transferProof} width ="100px"/></td>
      <td>{item.remainingActive} Days</td>
      <td className ={userStatusClass}>{item.userStatus}</td>
      <td className={paymentStatusClass}>{item.paymentStatus}</td>
      <td className="text-center"><img src={triangle}/> </td>
    </tr> 
        </>
    )
}
