// React component
import {React,useState,useContext} from 'react';
import Sidebar from '../components/Sidebar';
import {API} from '../config/api';
import { useMutation } from "react-query";
import {Modal} from 'react-bootstrap';

// Assets
import wow from '../assets/img/Icon.png'
import clip from '../assets/img/clip.png'

export default function Subscribe() {
    let api = API();
    const [preview, setPreview] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [form,setForm] = useState({
        transferProof : '',
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
            formData.set('transferProof', form?.transferProof[0], form?.transferProof[0]?.name);
            const config = {
                method : 'POST',
                headers : {
                    Authorization : "Basic " + localStorage.token
                },
                body : formData,
            };
            const response = await api.post('/subscribe', config);
            handleShow();
        } catch(error){
            console.log(error)
        }
    });
    return (
        <>
            <div className="container-fluid main-bg home-container">
                <div className="row">
                    <Sidebar/>
                    <div className="col-9 mt-5">
                        <div className="row  mt-5 mx-auto">
                            <div className="col-6 mx-auto mt-5">
                                <Modal show={show} onHide={handleClose}>
                                    <div className="container mb-3 py-3 px-5 text-success">
                                        Thank you for subscribing to premium, your premium package will be active after our admin approves your transaction, thank you
                                    </div>
                                </Modal>
                                <h3 className="bold text-center">Premium</h3>
                                <p className="mt-3 text-center">Pay now and access all the latest books from <img src={wow} alt="wow" width="35px" /></p>
                                <p className="mt-3 text-center"> <img src={wow} alt="wow" width="35px" /> <b>: 0981312323</b></p>
                                <div className="px-5">
                                <form onSubmit={(e) => handleSubmit.mutate(e)}>
                                    <input className="form-control bg-grey fs-6" placeholder="Input your account number" type="text" />
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
                                    <input type="file" name="transferProof" onChange={handleChange} id="actual-btn" hidden/>
                                    <label className="text-red" htmlFor="actual-btn">
                                        <span className="row">
                                            <span className="col-10 bold"> Attach proof of transfer &nbsp;</span>
                                            <span className="right col-2"> <img src={clip} alt="clip"  /></span>
                                            </span>
                                    </label>
                                    <button type="submit" className="send mt-4 py-2 bg-red text-light">Send</button>
                                 </form>      
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>  
        </>
    )
}
