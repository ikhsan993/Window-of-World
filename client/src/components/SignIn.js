// React Component
import {Modal} from 'react-bootstrap';
import {React, useState,useContext } from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API } from "../config/api";

function SignIn() {
  // eslint-disable-next-line no-undef
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useHistory();
  let api = API();

  const [state, dispatch] = useContext (UserContext);
  const [form, setForm] = useState({
    email : "",
    password :"",
  });
  const { email, password} = form;
  const handleChange = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async(e)=>{
 
      try {
        e.preventDefault();
        const body = JSON.stringify(form);

        const config = {
          method : 'POST',
          headers : {
            "Content-type" : 'application/json',
          },
          body,
        };
        const response = await api.post("/login", config);
        if(response.status == 'success'){

          dispatch({
            type : 'LOGIN_SUCCESS',
            payload : response.data,
          });

          if(response.data.role =='admin'){
            history.push('/transaction');
          }else{
            history.push('/home');
          }
        }
      }catch (error){
       console.log(error);
      };
    
    });

    return (
      <>
      <button className="signIn" onClick={handleShow}>Sign In</button>
      <Modal show={show} onHide={handleClose}>
          <div className="container mb-3 px-5">
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
             <h1 className="my-4 mx-2"> Sign In </h1>
              <input type="email" value={email} onChange={handleChange} id="email" placeholder="Email" name="email" className="mb-3"/>
              <input type="password" value={password} onChange={handleChange}  id ="password" placeholder="Password"  name="password"/>    
              <button className="login-btn py-3 mt-4 rounded-3">Login</button>
              Don't have an account ? Click <b>Here</b>
           </form>   
          </div>
      </Modal>
      </>
    );
  }
export default SignIn;