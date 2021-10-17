import {React,useState} from 'react'
import { ReactReader } from "react-reader"
import { useParams, useHistory } from "react-router-dom";
import { useQuery,useMutation } from "react-query";
import { API } from "../config/api";

// Assets

import Icon from '../assets/img/Icon.png';

export default function ReadBook() {
  let { id } = useParams();
  let history = useHistory()
  let api = API();
  const [location, setLocation] = useState(null)
  const locationChanged = (epubcifi) => {
    setLocation(epubcifi)
  }

  let { data: book, refetch } = useQuery("bookCache", async () => {
    const config = {
      method: "GET",
      headers: {Authorization: "Basic " + localStorage.token,},
    };
    const response = await api.get("/book/" + id, config);
    return response.data.book;
  });
 
  const home = ()=>{history.push('/home')}

  return (
    <>
      <div className="container-fluid main-bg home-container ">
        <div className="row px-5 d-flex">
          <div className="col-1 px-5 mt-5">
            <img src={Icon} alt="" width="80px" className="rotate cursor-pointer" onClick={home} />
          </div>
          <div className="col-9"></div>
        </div>
        <div className="row mt-5">
          <div style={{ height: "100vh", position : "relative" }}>
            <ReactReader
              title={book?.title}
              location={location}
              locationChanged={locationChanged}
              url={book?.bookFile}
            />
          </div>
        </div>
      </div>
    </>
  )
}