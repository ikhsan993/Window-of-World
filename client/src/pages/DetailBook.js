import {React, useEffect, useState, use} from 'react';
import book1 from '../assets/img/book1.png'
import ribbon from '../assets/img/ribbon.png'
import v1 from '../assets/img/V.png'
import Sidebar from '../components/Sidebar';

// import { useParams } from 'react-router-dom';
const DetailBook = () => {
// Fetch Data From API

  // const [data, setData] = useState(null);

  // // call that hooks here and store to variable
  // let { id } = useParams();

  // useEffect(() => {
  //   fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  //     .then((response) => response.json())
  //     .then((json) => setData(json));
  //   return () => {
  //     setData(null);
  //   };
  // }, []);

  // console.log(data);
  //   return (
  //       <>
  //         <div class="container-fluid main-bg home-container">
  //             <div class="row px-2 py-5">
  //       <Sidebar/>
  //       <div class="col-9 pe-5">
  //               <div class="row mt-3 ms-1">
  //           <h1>Data with parameter {id} is</h1>
  //           <p className="h2">{data?.name}</p>
  //           <div>{data?.username}</div>
  //           <div>{data?.email}</div>
  //           <div>{data?.phone}</div>
  //           <div>{data?.website}</div>
  //               </div>
  //       </div>  
  //             </div>
  //       </div>
  //           </>
  //   );
  return (
    <>
    <div class="container-fluid main-bg home-container">
        <div class="row px-2 py-5">
  <Sidebar/>
  <div class="col-9 pe-5">
      <div class="row  mt-5">
          <div class="row mt-3 ms-1">
          <div class="col-5">
          <img src={book1} alt="book1" width="100%" />
          </div>
          <div class="col-7 px-5">
              <h1><b>Tess of the Road</b></h1>
              <p class="text-grey mb-5">Rachel Hartman</p>
              <b>Publication date</b>
              <p class="text-grey py-1">April 2020</p>
              <b>Pages</b>
              <p class="text-grey py-1">436</p>
              <b class="text-red">ISBN</b>
              <p class="text-grey py-1">9781789807554</p>
          </div>
          </div>
          <div class='row mt-5'>
          <h4><b>About This Book</b></h4>
          <p class="justify text-grey">In the medieval kingdom of Goredd, women are expected to be ladies, men are their protectors, and dragons get to be whomever they want. Tess, stubbornly, is a troublemaker. You can’t make a scene at your sister’s wedding and break a relative’s nose with one punch (no matter how pompous he is) and not suffer the consequences. As her family plans to send her to a nunnery, Tess yanks on her boots and sets out on a journey across the Southlands, alone and pretending to be a boy.</p>
          <p class="justify text-grey">Where Tess is headed is a mystery, even to her. So when she runs into an old friend, it’s a stroke of luck. This friend is a quigutl—a subspecies of dragon—who gives her both a purpose and protection on the road. But Tess is guarding a troubling secret. Her tumultuous past is a heavy burden to carry, and the memories she’s tried to forget threaten to expose her to the world in more ways than one.</p>
          <p class="justify text-grey">Returning to the fascinating world she created in the award-winning and New York Times bestselling Seraphina, Rachel Hartman introduces readers to a new character and a new quest, pushing the boundaries of genre once again in this wholly original fantasy.</p>
          </div>
          <div class='row mt-5'>
            <div class="col-6">

            </div>
            <div className="col-6 float-right">
              <div class="row px-5"> 
              <div class="col-6"> <button class ="signUp">Add to My List &nbsp; <img src={ribbon} alt="ribbon" /></button></div>
              <div class="col-6"><button class ="signIn ms-3">Read Book &nbsp; <img src={v1} alt="V" /></button></div>
               
               </div>

          </div>
</div>
      </div>
  </div>  
        </div>
  </div>  
  </>
)

}
export default DetailBook;