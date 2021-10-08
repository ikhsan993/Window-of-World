import { Modal} from 'react-bootstrap';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
function SignUp() {
    // eslint-disable-next-line no-undef
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
        let history = useHistory();
    const handlePushHome = () => {
      history.push('/home');
    }
    const [state,setState] = useState({
      email : '',
      password :'',
      fullname :'',
    });

    const handleChange = (e)=>{
      setState({
        ...state,
        [e.target.name] : e.target.value,
      });
    };

    const handleSubmit = (e)=>{
      e.preventDefault();
      console.log(state);
    };

    return (
      <>
        <button className="signUp" onClick={handleShow}>
          Sign Up
        </button>
        <Modal show={show} onHide={handleClose}>
        <div className="container mb-3">
        <h1 className="my-4 mx-2"> Sign Up </h1>
        <input type="email" placeholder="Email" name="email" value={state.email} className="mb-3" onChange={handleChange} />
        <input type="password" placeholder="Password" name="password" onChange={handleChange} value={state.password} className="mb-3"/>   
        <input type="text" onChange={handleChange} value={state.fullname} placeholder="Full Name" name="fullname" /> 
        <button className="login-btn py-3 mt-4" onClick={handleSubmit}>Sign Up</button>
          Already have an account ? Click Here
        </div>
        </Modal>
      </>
    );
  }
export default SignUp;