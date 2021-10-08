import React from 'react'
import { Link } from 'react-router-dom'
import serangkai from '../assets/img/serangkai.png'

export default function BookCard() {
    return (
        <>
         <div className="card book" >
            <Link to="/book-detail/4">
                <img className="card-img-top" src={serangkai} alt="Card image cap"/>
                <div className="card-body bg-grey">
                    <p className="card-text"><b>Serangkai</b></p>
                    <p className="card-text text-grey">Valerie Parker</p>
                </div>
            </Link>
        </div>   
        </>
    )
}
