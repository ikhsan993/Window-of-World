// React Component
import {Modal} from 'react-bootstrap';
import {React, useState,useContext } from 'react';
import { useHistory,useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useQuery,useMutation } from "react-query";
import { API } from "../config/api";

// Assets
import clip from '../assets/img/clip2.png'

function UploadBookFile() {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { id } = useParams();
    let history = useHistory();
    let api = API();

    const [preview, setPreview] = useState(null);
    const [form,setForm] = useState({
        bookFile : '',
    });
    const handleChange = (e)=> {
        setForm({
            ...form,
            [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value, 
        });
    };
    const handleSubmit = useMutation(async (e)=>{
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.set('bookFile', form?.bookFile[0], form?.bookFile[0]?.name);
            const config = {
                method : 'PATCH',
                headers : {Authorization : "Basic " + localStorage.token},
                body : formData,
            };
            const response = await api.patch('/bookFile/' + id, config);
            history.push('/book-admin')
        } catch(error){
            console.log(error)
        }
    });

    return (
        <>
            <div className="col-4"> <button className ="btn btn-secondary px-3 py-2" onClick={handleShow}>Upload File</button></div>
            <Modal show={show} onHide={handleClose}>
                <div className="container mb-3 px-5">
                    <form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <h2 className="my-4 mx-2 "> Upload Book File </h2>
                        <input type="file" id="actual-btn" onChange={handleChange}  name="bookFile" hidden/>
                        <label className="text-333" htmlFor="actual-btn">
                            <span className="row">
                                <span className="col-10 bold"> Attach Book File &nbsp;</span>
                                <span className="right col-2"> <img src={clip} alt="clip"  /></span>
                            </span>
                        </label>
                        <button className="login-btn py-3 mt-4 rounded-3">Upload</button>
                    </form>   
                </div>
            </Modal>
        </>
    );
}
export default UploadBookFile;