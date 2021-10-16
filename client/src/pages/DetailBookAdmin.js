// React components
import {React,useState,useContext }from 'react';
import { useParams, useHistory } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import { API } from "../config/api";
import { useQuery,useMutation } from "react-query";
import {Modal} from 'react-bootstrap';
import EditBook from '../components/EditBook';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserContext } from "../context/userContext";

// Assets
import book1 from '../assets/img/book1.png'
import ribbon from '../assets/img/ribbon.png'
import v1 from '../assets/img/V.png'
import Icon from '../assets/img/Icon.png';
import UserImage from '../assets/img/user.jpg'

const DetailBook = () => {
let history = useHistory();
let { id } = useParams();
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
let api = API();
let bookAdmin = ()=>{
    history.push("/book-admin")
}
    const [state, dispatch] = useContext(UserContext)
    const logout = (e) => {
    e.preventDefault();
    dispatch({
        type: "LOGOUT"
        })
        history.push("/")
    }

  // Fetching book data from database
  let { data: book } = useQuery("bookCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/book/" + id, config);
    return response.data.book;
  });
  
  return (
    <>
    <div className="container-fluid main-bg home-container">
        <div className="row px-2 py-5">
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
                        <Dropdown.Item className="link" onClick={bookAdmin}> Book </Dropdown.Item>
                        <Dropdown.Item className="link" onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
          </div>
  <div className="col-9 pe-5 mx-auto">
      <div className="row  mt-5">
          <div className="row mt-3 ms-1">
          <div className="col-5">
          <img src={book?.cover} alt="book1" width="100%" />
          </div>
          <div className="col-7 px-5">
              <h1><b>{book?.title}</b></h1>
              <p className="text-grey mb-5">{book?.author}</p>
              <b>Publication date</b>
              <p className="text-grey py-1">{book?.publicationDate}</p>
              <b>Pages</b>
              <p className="text-grey py-1">{book?.pages}</p>
              <b className="text-red">ISBN</b>
              <p className="text-grey py-1">{book?.isbn}</p>
              <div className="row">
            <div className="col-4"><button className ="btn btn-secondary px-3 py-2">Upload File</button></div>
              <EditBook/>
              <div className="col-4"><button className ="btn btn-danger px-3 py-2">Delete Book</button></div>
              </div>
          </div>
          </div>
              <Modal show={show} onHide={handleClose}>
                <div className="container mb-3 py-3 px-5 text-success">
                Book added to list successfully
                </div>
                </Modal>
          <div className='row mt-5'>
          <h4><b>About This Book</b></h4>
          <p className="justify text-grey">
            {book?.about}
          </p>
          </div>
          <div className='row mt-5'>
          <div className= 'col-5 ms-auto'></div>
          <div className="col-7 float-right">
          
              </div>
</div>
      </div>
  </div>  
        </div>
  </div>  
  </>
)

}
export default DetailBook;