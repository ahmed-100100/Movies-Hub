import React from 'react'
import { Link } from 'react-router-dom';
import { imgPath } from '../Constants/imgPath';
import starPlaceHolder from '../assets/Avatar/star.jpg';
export default function StarCard({star}) {
  return (
    <div key={star.id} className="col-md-2">
        <Link to={`/star/${star.id}`} onClick={()=>localStorage.setItem("type","person")}>
            <div className="starCard w-100">
              <img className="w-100" src={star.profile_path?imgPath(star.profile_path):starPlaceHolder} alt={star.name} />
              <h3 className="h5 my-2 text-center">
                {star.name.length>25?star.name.slice(0,24)+"....":star.name?star.name:"Unknown"}
              </h3>
            </div>
        </Link>
    </div>
  )
}