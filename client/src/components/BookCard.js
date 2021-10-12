import {React,useState} from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from "react-query";
import { API } from "../config/api";
import {Modal} from 'react-bootstrap';

export default function BookCard({ item }) {
    let api = API();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
    let isActive = false;
if (user?.userStatus =="Active") {isActive=true}
    return (
        <>
         {isActive ?
         <div className="card book  bg-grey" >
          <Link to={'/book-detail/'+item.id}>  
                <img className="card-img-top" src={item.cover} alt="Card image cap" height="300px"/>
                <div className="card-body">
                    <p className="card-text"><b>{item.title}</b></p>
                    <p className="card-text text-grey">{item.author}</p>
                </div>
            </Link>
        </div> : 
        <div className="card book bg-grey cursor-pointer" onClick={handleShow} >
                <Modal show={show} onHide={handleClose} >
                    <div className="mb-3 py-3 px-5 text-red">
                    please make a payment to read the latest books
                    </div>
                    </Modal>
                <img className="card-img-top" src={item.cover} alt="Card image cap" height="300px"/>
                <div className="card-body">
                    <p className="card-text"><b>{item.title}</b></p>
                    <p className="card-text text-grey">{item.author}</p>
                </div>
        </div>


    } 
        </>
    )
}
