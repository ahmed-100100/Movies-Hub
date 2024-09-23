import React from 'react'
import { Link } from 'react-router-dom';
import { imgPath } from '../Constants/imgPath';
import tvPlaceHolder from '../assets/Avatar/poster.png';
export default function TvCard({tv}) {
  return (
    <div key={tv.id} className="col-md-2">
        <Link to={`/tv/${tv.id}`} onClick={()=>localStorage.setItem("type","tv")}>
            <div className="tvCard w-100">
              <img className="w-100" src={tv.poster_path?imgPath(tv.poster_path):tvPlaceHolder} alt={tv.title} />
              <h3 className="h5 my-2 text-center">
                {tv.name.length>25?tv.name.slice(0,20)+"....":tv.name?tv.name:"Unknown"}
              </h3>
            </div>
        </Link>
    </div>
  )
}
