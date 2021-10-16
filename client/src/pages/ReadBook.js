import {React,useState} from 'react'
import { ReactReader } from "react-reader"
import Icon from '../assets/img/Icon.png';
import ss from '../assets/img/ss.png';
import { useParams, useHistory } from "react-router-dom";
import { useQuery,useMutation } from "react-query";
import { API } from "../config/api";

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
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await api.get("/book/" + id, config);
    return response.data.book;
  });
 
const home = ()=>{
  history.push('/home')
}

    return (
        <>
         <div class="container-fluid main-bg home-container ">
              <div class="row px-5 d-flex">
                  <div class="col-1 px-5 mt-5">
                <img src={Icon} alt="" width="80px" className="rotate cursor-pointer" onClick={home} />
                  </div>
                  <div class="col-9"></div>
                  </div>

                  <div class="row mt-5">
                  {/*<div class="col-8 mt-5 ms-auto ">*/}
                  <div style={{ height: "100vh", position : "relative" }}>
                      <ReactReader
                      title={book?.title}
                  location={location}
                  locationChanged={locationChanged}
                   url={book?.bookFile}
                  />
                  </div>
                  </div>
                  {/*</div>*/}
              </div>
            </>
            )
        }