// React Component
import {Modal} from 'react-bootstrap';
import {React, useState,useContext } from 'react';
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useQuery,useMutation } from "react-query";
import { API } from "../config/api";

// Assets
import clip from '../assets/img/clip2.png'

function EditProfile() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [preview, setPreview] = useState(null); 
  const [profile, setProfile] = useState({});
  let history = useHistory();
  let api = API();

  const [form, setForm] = useState({
    photo: "",
    phone: "",
    gender: "",
    address: "",
  }); 


  let { profileRefetch } = useQuery("profileCache", async () => {
    const config = {
      headers: {Authorization: "Basic " + localStorage.token,},
    };
    const response = await api.get("/profile", config);
    setForm({
      photo: response.data.photo,
      phone: response.data.phone,
      gender: response.data.gender,
      address: response.data.address,
    });
    setProfile(response.data);
  });

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      setPreview(e.target.files);
    }
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const formData = new FormData();
      if (preview) {formData.set("photo", preview[0], preview[0]?.name);}
      formData.set("phone", form.phone);
      formData.set("gender", form.gender);
      formData.set("address", form.address);

      // Configuration
      const config = {
        method: "PATCH",
        headers: {Authorization: "Basic " + localStorage.token,},
        body: formData,
      };

      // Insert product data
      const response = await api.patch("/profile", config);
      history.push("/home");
    } catch (error) {
      console.log(error);
      }
  });

    return (
      <>
        <button className="mt-3 btn bg-red text-light btn-lg px-4 fs-6" onClick={handleShow}>Edit Profile</button>
        <Modal show={show} onHide={handleClose}>
          <div className="container mb-3 px-5">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <h1 className="my-4 mx-2 "> Edit Profile </h1>
              <input type="number" placeholder="Phone Number" name="phone" value={form.phone} onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
              <input type="text" placeholder="Gender" name="gender" value={form.gender}  onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
              <input type="text" placeholder="Address" name="address" value={form.address}  onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
              <input type="file" id="actual-btn" onChange={handleChange}  name="photo" hidden/>
              <label className="text-333" htmlFor="actual-btn">
                <span className="row">
                    <span className="col-10 bold"> Attach Profile Picture &nbsp;</span>
                    <span className="right col-2"> <img src={clip} alt="clip"  /></span>
                </span>
              </label>
             {!preview ? (
                <div>
                  <img
                    src={form.photo}
                    style={{
                      maxWidth: "250px",
                      maxHeight: "250px",
                      objectFit: "cover",
                      marginTop : "30px"
                    }}
                    alt="preview"
                  />
                </div>
              ) : (
                <div>
                  <img
                    src={URL.createObjectURL(preview[0])}
                    style={{
                      maxWidth: "250px",
                      maxHeight: "250px",
                      objectFit: "cover",
                      marginTop : "30px"
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