import React from 'react'
import { Link } from 'react-router-dom';
import { imgPath } from '../Constants/imgPath';
import moviePlaceHolder from '../assets/Avatar/poster.png';
export default function MovieCard({movie}) {
  return (
    <div key={movie.id} className="col-md-2">
        <Link to={`/movie/${movie.id}`} onClick={()=>localStorage.setItem("type","movie")}>
            <div className="movieCard w-100">
              <img className="w-100" src={movie.poster_path?imgPath(movie.poster_path):moviePlaceHolder} alt={movie.title} />
              <h3 className="h5 my-2 text-center">
                {movie.title.length>25?movie.title.slice(0,24)+"....":movie.title?movie.title:"Unknown"}
              </h3>
            </div>
        </Link>
    </div>
  )
}
