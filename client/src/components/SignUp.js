import { Modal} from 'react-bootstrap';
import {React, useContext, useState} from 'react';
import { UserContext } from "../context/userContext";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { Alert } from "react-bootstrap";

function SignUp() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  
  
  let history = useHistory();
  let api = API();
  
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password, role } = form;
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const body = JSON.stringify(form);
      const config = {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: body,
      };

      const response = await api.post("/register", config);
      
      // Notification
        if (response.status === "success") {
          const alert = (
            <Alert variant="success" className="py-">
              Register user success, please login
            </Alert>
          );
          setMessage(alert);
          setForm({
            name: "",
            email: "",
            password: "",
          });
        } else {
          const alert = (
            <Alert variant="danger" className="py-3">
              {response.message}
            </Alert>
          );
          setMessage(alert);
        }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-3">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <>
      <button className="signUp" onClick={handleShow}>Sign Up</button>
      <Modal show={show} onHide={handleClose}>
        <div className="container mb-3">
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <h1 className="my-4 mx-2"> Sign Up </h1>
            {message && message}
            <input type="email" placeholder="Email" name="email" value={email} className="mb-3" onChange={handleChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleChange} value={password} className="mb-3"/>   
            <input type="text" onChange={handleChange} value={name} placeholder="Full Name" name="name" /> 
            <button className="login-btn py-3 mt-4">Sign Up</button>
          </form>
          Already have an account ? Click Here
        </div>
      </Modal>
    </>
  );
}
export default SignUp;