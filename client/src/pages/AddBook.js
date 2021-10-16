// React Components
import {React,useState,useContext,useEffect }from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import {Link,useHistory} from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import {API} from '../config/api';
// Assets
import Icon from '../assets/img/Icon.png';
import UserImage from '../assets/img/user.jpg'
import bill from '../assets/img/add.png';
import clip from '../assets/img/clip2.png'

export default function AddBook() {
    const [state, dispatch] = useContext(UserContext);

    let history = useHistory();
    let api = API();
    const [preview, setPreview] = useState(null);
    const [form,setForm] = useState({
        title : '',
        author :'',
        publicationDate : '',
        pages : '',
        cover : '',
        about : '',

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
            // console.log(form.cover.name)
            const formData = new FormData();
            formData.set('cover', form?.cover[0], form?.cover[0]?.name);
            formData.set('title', form.title);
            formData.set('author', form.author);
            formData.set('isbn', form.isbn);
            formData.set('publicationDate', form.publicationDate);
            formData.set('pages', form.pages);
            formData.set('about', form.about);

            const config = {
                method : 'POST',
                headers : {
                    Authorization : "Basic " + localStorage.token
                },
                body : formData,
            };
            const response = await api.post('/book', config);
            // console.log (response);
            history.push('/transaction');

        } catch(error){
            console.log(error)
        }
    });

    const logout = (e) => {
    e.preventDefault();
    dispatch({
        type: "LOGOUT"
        })
        // history.push("/")
    }
    let transaction = ()=>{
    history.push("/transaction")
}
let bookAdmin = ()=>{
    history.push("/book-admin")
}
    return (
        <>
         <div className="container-fluid main-bg home-container">
            <div className="row">
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
                        <Dropdown.Item className="link" onClick={bookAdmin}> Books </Dropdown.Item>
                        <Dropdown.Item className="link" onClick={transaction}>Transaction</Dropdown.Item>
                        <Dropdown.Item className="link" onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                </div>
            </div>
            <div className="row">
                <div className="col-8 px-5 py-5 mx-auto mt-5">
                    <h4><b>Add Book</b></h4>
                    <div className="row mt-5">
                     <form onSubmit={(e) => handleSubmit.mutate(e)}>
                        <input type="text" placeholder="Title" name="title" onChange={handleChange} className="mb-4 fs-6 form-control bg-grey" />
                        <input type="date" placeholder="Publication Date" name="publicationDate" onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
                        <input type="number" placeholder="Pages" name="pages" onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
                        <input type="text" placeholder="Author" name="author" onChange={handleChange}  className="mb-4 fs-6 form-control bg-grey" />
                        <input type="text" placeholder="ISBN"  name="isbn" onChange={handleChange} className="mb-4 fs-6 form-control bg-grey" />
                        <textarea name="about" onChange={handleChange} className="form-control bg-grey" placeholder ="About This Book" cols="30" rows="10"></textarea>  
                        <div className="col-5 mt-2">
                            <input type="file" id="actual-btn" onChange={handleChange} name="cover" hidden/>
                            <label className="text-333" htmlFor="actual-btn">
                            <span className="row">
                                <span className="col-10 bold"> Attach Book File &nbsp;</span>
                                <span className="right col-2"> <img src={clip} alt="clip"  /></span>
                            </span>
                            </label>
                        </div>
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
                        <div className="row ms-5">
                            <div className="col-4  mt-3 ms-auto"><button type="submit" className ="bg-red text-light ms-5 me-0 px-3 py-2 rounded-3">Add Book &nbsp; <img src={bill} alt="bill" /></button>
                            </div>                          
                        </div>
                         </form>                           
                    </div>
                    </div>     
                </div>
            </div>   
        </>
    )
}
