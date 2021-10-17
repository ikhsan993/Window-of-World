// React Component
import {Modal} from 'react-bootstrap';
import {React, useState,useContext } from 'react';
import { useHistory,useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useQuery,useMutation } from "react-query";
import { API } from "../config/api";

// Assets
import clip from '../assets/img/clip2.png'

function EditBook() {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showSuccess, setShowSuccess] = useState(false);
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleShowSuccess = () => setShowSuccess(true);

  let history = useHistory();
  let api = API();

  const { id } = useParams();
  const [preview, setPreview] = useState(null); 
  const [book, setBook] = useState({}); 
  const [form, setForm] = useState({
    title: "",
    author: "",
    publicationDate: "",
    pages: "",
    isbn: "",
    cover: "",
    about: "",
  }); 

  let { bookokRefetch } = useQuery("bookokCache", async () => {
    const config = {
      headers: {Authorization: "Basic " + localStorage.token,},
    };  
    const response = await api.get("/book/" + id, config);
    setForm({
      title: response.data.book.title,
      author: response.data.book.author,
      publicationDate: response.data.book.publicationDate,
      pages: response.data.book.pages,
      cover: response.data.book.cover,
      about: response.data.book.about,
      isbn: response.data.book.isbn,
    });
    setBook(response.data.book);
  });

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {setPreview(e.target.files);}
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      // Store data with FormData as object
      const formData = new FormData();
      if (preview) {formData.set("cover", preview[0], preview[0]?.name);}
      formData.set("title", form.title);
      formData.set("author", form.author);
      formData.set("publicationDate", form.publicationDate);
      formData.set("pages", form.pages);
      formData.set("about", form.about);
      formData.set("isbn", form.isbn);

      // Configuration
      const config = {
        method: "PATCH",
        headers: {Authorization: "Basic " + localStorage.token,},
        body: formData,
      };

      const response = await api.patch("/book/" + id, config);
      handleShowSuccess();
    } catch (error) {
      console.log(error);
    }
  });

    return (
      <>
        <div className="col-4"> <button className ="btn btn-warning px-3 py-2" onClick={handleShow}>Edit Book</button></div>
          <Modal show={show} onHide={handleClose}>
            <div className="container mb-3 px-5">
              <form onSubmit={(e) => handleSubmit.mutate(e)}>
                <h1 className="my-4 mx-2 "> Edit Book </h1>
                <input type="text" placeholder="Book Title" name="title" value={form.title} onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
                <input type="text" placeholder="Book Author" name="author" value={form.author}  onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
                <input type="number" placeholder="ISBN" name="isbn" value={form.isbn}  onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
                <input type="number" placeholder="Pages" name="pages" value={form.pages}  onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
                <input type="date" placeholder="Publication Date" name="publicationDate" value={form.publicationDate}  onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
                <textarea placeholder="About Book" name="about" value={form.about}  onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
                <input type="file" id="actual-btn" onChange={handleChange}  name="cover" hidden/>
                <label className="text-333" htmlFor="actual-btn">
                  <span className="row">
                    <span className="col-10 bold"> Attach Profile Picture &nbsp;</span>
                    <span className="right col-2"> <img src={clip} alt="clip"  /></span>
                  </span>
              </label>
             {!preview ? (
                <div>
                <img
                  src={form.cover}
                  style={{
                    maxWidth: "250px",
                    maxHeight: "250px",
                    objectFit: "cover",
                    marginTop : "30px"
                    }}
                  alt="preview"
                />
                </div>
            ) :
            (
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
              <button className="login-btn py-3 mt-4 rounded-3">Update Book</button>
            </form>   
          </div>
      </Modal>
      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <div className="container mb-3 py-3 px-5 text-success">
          Update Book Data Success
        </div>
      </Modal>
    </>
  );
}
export default EditBook;