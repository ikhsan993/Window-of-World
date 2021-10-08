// react components
import {React} from 'react';
import BookCard from '../components/BookCard';
import Sidebar from '../components/Sidebar';
// assets
import banner from '../assets/img/banner.png'
import { Link } from 'react-router-dom';

export default function Home() {
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
                          <BookCard/>
                          </div>
                       </div>  
                    </div>
                </div>
              </div>
          </div>  
        </>
    )
}
