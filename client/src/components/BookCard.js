import React from 'react'
import { Link } from 'react-router-dom'

export default function BookCard({ item }) {
    return (
        <>
         <div className="card book" >
            <Link to={'/book-detail/'+item.id}>
                <img className="card-img-top" src={item.cover} alt="Card image cap"/>
                <div className="card-body bg-grey">
                    <p className="card-text"><b>{item.title}</b></p>
                    <p className="card-text text-grey">{item.author}</p>
                </div>
            </Link>
        </div>   
        </>
    )
}
