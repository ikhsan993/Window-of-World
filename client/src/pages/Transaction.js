// React components
import {React,useState,useContext }from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link,useHistory} from "react-router-dom";
import { UserContext } from "../context/userContext";
//assets
import Icon from '../assets/img/Icon.png';
import UserImage from '../assets/img/user.jpg'
import triangle from '../assets/img/triangle.png';

export default function Transaction() {
    const [state, dispatch] = useContext(UserContext)
    let history = useHistory()
    const logout = (e) => {
    e.preventDefault();
    console.log(state)
    dispatch({
        type: "LOGOUT"
        })
        history.push("/")
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
                        <Dropdown.Item className="link"> <Link to="/add-book">Add Book</Link></Dropdown.Item>
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
  <tbody><tr>
      <th scope="row">1</th>
      <td>Radif Ganteng</td>
      <td>bca.jpg</td>
      <td>26/Hari</td>
      <td className="text-success">Active</td>
      <td className="text-success">Approved</td>
      <td className="text-center"><img src={triangle}/> </td>
    </tr>
      <tr>
      <th scope="row">2</th>
      <td>Radif Ganteng</td>
      <td>bca.jpg</td>
      <td>26/Hari</td>
      <td className="text-danger">Not Active</td>
      <td className="text-danger">Cancel</td>
      <td className="text-center"><img src={triangle}/> </td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Radif Ganteng</td>
      <td>bca.jpg</td>
      <td>26/Hari</td>
      <td className="text-danger">Not Active</td>
      <td className="text-warning">Pending</td>
      <td className="text-center"><img src={triangle}/> </td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Radif Ganteng</td>
      <td>bca.jpg</td>
      <td>26/Hari</td>
      <td className="text-danger">Not Active</td>
      <td className="text-warning">Pending</td>
      <td className="text-center"><img src={triangle}/> </td>
    </tr>    <tr>
      <th scope="row">5</th>
      <td>Radif Ganteng</td>
      <td>bca.jpg</td>
      <td>26/Hari</td>
      <td className="text-danger">Not Active</td>
      <td className="text-warning">Pending</td>
      <td className="text-center"><img src={triangle}/> </td>
    </tr>    
    <tr>
      <th scope="row">6</th>
      <td>Radif Ganteng</td>
      <td>bca.jpg</td>
      <td>26/Hari</td>
      <td className="text-danger">Not Active</td>
      <td className="text-warning">Pending</td>
      <td className="text-center"><img src={triangle}/> </td>
    </tr>
  </tbody>
</table>
           </div>
        </div>
        </>
    )   
}
