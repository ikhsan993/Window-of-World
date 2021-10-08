import React from 'react';
import Sidebar from '../components/Sidebar';
import wow from '../assets/img/Icon.png'
import clip from '../assets/img/clip.png'

export default function Subscribe() {
    return (
        <>
         <div class="container-fluid main-bg home-container">
              <div class="row">
        <Sidebar/>
        <div class="col-9 mt-5">
            <div class="row  mt-5 mx-auto">
                <div class="col-6 mx-auto mt-5">
            <h3 className="bold text-center">Premium</h3>
            <p class="mt-3 text-center">Pay now and access all the latest books from <img src={wow} alt="wow" width="35px" /></p>
            <p class="mt-3 text-center"> <img src={wow} alt="wow" width="35px" /> <b>: 0981312323</b></p>
              <div class="px-5">
               <input class="form-control bg-grey fs-6" placeholder="Input your account number" type="text" />
             <input type="file" id="actual-btn" hidden/>
            <label className="text-red" for="actual-btn">
                <span className="row">
                    <span className="col-10 bold"> Attach proof of transfer &nbsp;</span>
                    <span className="right col-2"> <img src={clip} alt="clip"  /></span>
                </span>
            </label>
               <button className="send mt-4 py-2 bg-red text-light">Send</button>
               </div>
                </div>
            </div> 
            </div>
            </div>
            </div>  
        </>
    )
}
