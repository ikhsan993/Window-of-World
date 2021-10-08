// react components
import {React} from 'react';
import BookCard from '../components/BookCard';
import Sidebar from '../components/Sidebar';
import { useQuery } from "react-query";
import { API } from "../config/api";

// assets
import banner from '../assets/img/banner.png'
import { Link } from 'react-router-dom';

export default function Home() {

  let api = API();
  let { data: books, refetch } = useQuery("booksCache", async () => {
  const config = {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.token,
    },
  };
  const response = await api.get("/books", config);
  console.log(response.data.books);
  return response.data.books;
});

    return (
        <>
          <div className="container-fluid main-bg home-container">
              <div className="row">
                 <Sidebar/>
                 <div className="col-9">
                      <div className="row  mt-5">
                          <div className ="banner">
                                 <img src={banner} width="100%" alt="" />
                          </div>
                      <div className="row mt-3 ms-1">
                          <h2 className="mb-5"><b>List Book</b></h2>
                          <div className="books">
                          {books?.map((item, index) => (
                          <BookCard item={item} key={index} />
                          ))}
                          </div>
                       </div>  
                    </div>
                </div>
              </div>
          </div>  
        </>
    )
}
