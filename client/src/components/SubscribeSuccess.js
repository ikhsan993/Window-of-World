// React Component
import {Modal} from 'react-bootstrap';
import {React, useState,} from 'react';

function SignIn() {
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

    return (
      <>
      <Modal show={show} onHide={handleClose}>
          <div className="container mb-3 px-5 text-success">
         Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you
          </div>
      </Modal>
      </>
    );
  }
export default SignIn;