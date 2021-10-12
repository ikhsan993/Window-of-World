// React Component
import {Modal} from 'react-bootstrap';
import {React, useState,useContext } from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import { API } from "../config/api";

// Assets
import clip from '../assets/img/clip2.png'

function EditProfile() {
  // eslint-disable-next-line no-undef
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let history = useHistory();
  let api = API();
    const [state, dispatch] = useContext(UserContext);
    const [preview, setPreview] = useState(null);
    const [form,setForm] = useState({
        gender : '',
        address :'',
        phone : '',
        photo : '',

    });
    const handleChange = (e)=> {
        setForm({
            ...form,
            [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value, 
        });
        if (e.target.type === 'file'){
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };
    const handleSubmit = useMutation(async (e)=>{
        try {

            e.preventDefault();
            const formData = new FormData();
            formData.set('gender', form.gender);
            formData.set('address', form.address);
            formData.set('phone', form.phone);
            formData.set('photo', form?.photo[0], form?.photo[0]?.name);

            const config = {
                method : 'POST',
                headers : {
                    Authorization : "Basic " + localStorage.token
                },
                body : formData,
            };
            const response = await api.post('/profile', config);
            history.push('/home')
        } catch(error){
            console.log(error)
        }
    });

    return (
      <>
      <button className="mt-3 btn bg-red text-light btn-lg px-4 fs-6" onClick={handleShow}>Edit Profile</button>
      <Modal show={show} onHide={handleClose}>
          <div className="container mb-3 px-5">
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
             <h1 className="my-4 mx-2"> Sign In </h1>
              <input type="number" placeholder="Phone Number" name="phone" onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
              <input type="text" placeholder="Gender" name="gender" onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
              <input type="text" placeholder="Address" name="address" onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
              <input type="file" id="actual-btn" onChange={handleChange} name="photo" hidden/>
              <label className="text-333" htmlFor="actual-btn">
              <span className="row">
                    <span className="col-10 bold"> Attach Profile Picture &nbsp;</span>
                    <span className="right col-2"> <img src={clip} alt="clip"  /></span>
              </span>
              </label>
              {preview && (
                  <div className="mt-3">
                  <img
                  src={preview}
                  style={{
                  maxWidth: "250px",
                  maxHeight: "250px",
                  objectFit: "cover",
                  }}
                  alt="preview"
                  />
                  </div>
              )}
              <button className="login-btn py-3 mt-4 rounded-3">Edit Profile</button>
           </form>   
          </div>
      </Modal>
      </>
    );
  }
export default EditProfile;