import React from 'react'
import ImgNotFound from '../assets/img/404.png'

export default function NotFound() {
    return (
        <div className="container text-center">
            <img src={ImgNotFound} alt="Not Found" width="40%" />
        </div>
    )
}
