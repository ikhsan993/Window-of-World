// React components
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Sidebar from '../components/Sidebar';
import { API } from "../config/api";
import { useQuery,useMutation } from "react-query";
// Assets
import book1 from '../assets/img/book1.png'
import ribbon from '../assets/img/ribbon.png'
import v1 from '../assets/img/V.png'

const DetailBook = () => {
  let history = useHistory();
  let { id } = useParams();
  let api = API();

  // Fetching book data from database
  let { data: book, refetch } = useQuery("bookCache", async () => {
    const config = {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/book/" + id, config);
    return response.data.book;
  });
const [form,setForm] = useState({
        bookId : id,
    });
    const handleChange = (e)=> {
        setForm({
            ...form,
            [e.target.name]: e.target.value, 
        });
    };
    const handleSubmit = useMutation(async (e)=>{
        try {

            e.preventDefault();
            // console.log(form.cover.name)
            const formData = new FormData();
            formData.set('bookId', form.bookId);
            const config = {
                method : 'POST',
                headers : {
                    Authorization : "Basic " + localStorage.token
                },
                body : formData,
            };
            const response = await api.post('/book-list', config);
            console.log(response);
        } catch(error){
            console.log(error)
        }
    });
  return (
    <>
    <div className="container-fluid main-bg home-container">
        <div className="row px-2 py-5">
  <Sidebar/>
  <div className="col-9 pe-5">
      <div className="row  mt-5">
          <div className="row mt-3 ms-1">
          <div className="col-5">
          <img src={book?.cover} alt="book1" width="100%" />
          </div>
          <div className="col-7 px-5">
              <h1><b>{book?.title}</b></h1>
              <p className="text-grey mb-5">{book?.author}</p>
              <b>Publication date</b>
              <p className="text-grey py-1">{book?.publicationDate}</p>
              <b>Pages</b>
              <p className="text-grey py-1">{book?.pages}</p>
              <b className="text-red">ISBN</b>
              <p className="text-grey py-1">{book?.isbn}</p>
          </div>
          </div>
          <div className='row mt-5'>
          <h4><b>About This Book</b></h4>
          <p className="justify text-grey">
            {book?.about}
          </p>
          </div>
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <input type="text" placeholder="bookId" className="none" value={id} name="bookId" onChange={handleChange}/>
          <div className='row mt-5'>
            <div className="col-6">
            </div>
            <div className="col-6 float-right">
              <div className="row px-5"> 

              <div className="col-6"> <button className ="signUp">Add to My List &nbsp; <img src={ribbon} alt="ribbon" /></button></div>
              <div className="col-6"><button className ="signIn ms-3">Read Book &nbsp; <img src={v1} alt="V" /></button></div>
               </div>
             
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
export default DetailBook;