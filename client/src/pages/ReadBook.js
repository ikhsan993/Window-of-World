import React from 'react'
import Icon from '../assets/img/Icon.png';
import ss from '../assets/img/ss.png';
export default function ReadBook() {
    return (
        <>
         <div class="container-fluid main-bg home-container">
              <div class="row px-5">
                  <div class="col-1 px-5 mt-5">
                <img src={Icon} alt="" width="80px" class="rotate" />
                  </div>
                  <div class="col-9"></div>
                  </div>
                  <div class="row">
                  <div class="col-8 mt-5 mx -auto">
                      <img src={ss} alt="ss" width="100%" />
                  </div>
                  </div>
              </div>
            </>
            )
        }