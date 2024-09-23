import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { imgPath } from '../../Constants/imgPath';
import moviePlaceHolder from '../../assets/Avatar/poster.png';
export default function MovieDetails() {
    const [details, setDetails] = useState(null);
    let [loading, setLoading] = useState(true);
    let type = window.location.pathname.includes("movie")&&"movie";
    let {id}=useParams();
    function getDetails(){
        axios
        .get(`https://api.themoviedb.org/3/${type}/${id}?api_key=c9fac173689f5f01ba1b0420f66d7093&language=eg-US`)
        .then((res)=>{
            setDetails(res.data);
            setLoading(false);
        })
        .catch((err)=>{
            console.log(err);
            setLoading(false);
        })
    }
    useEffect(()=>{getDetails();});
  return (
    <div>
        <div className="row mt-3">
            <div className="col-md-4">
                {loading?
                    (<div className="spinner-border" role="status"></div>) :
                    (<img className="w-100" src={details.poster_path?imgPath(details.poster_path):moviePlaceHolder} alt="" />)
                }
            </div>
            <div className="col-md-7 offset-1 d-flex align-items-center">
                <div>
                    <h2><span>Name: </span>{details?.title}</h2>
                    <h5><span>Overview: </span>{details?.overview}</h5>
                </div>
            </div>
        </div>
    </div>
  )
}