import React, { useContext } from 'react';
import './style.css'
import { MainContext } from '../Store';
import MovieCard from '../../Components/MovieCard';
import StarCard from '../../Components/StarCard';
import TvCard from '../../Components/TvCard';
export default function Home() {
  let { movies , stars , tvs } = useContext(MainContext);
  return (
    <div className="home my-3">
      <div className="row justify-content-center">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25"></div>
            <h2>Trending<br />
            Movies<br />
            To watch right now</h2>
            <p>Top Trending Movies Day By Day</p>
            <div className="brdr"></div>
          </div>
        </div>
        {movies.map((movie)=>(
          <MovieCard key={movie.id} movie={movie}></MovieCard>
        ))}
      </div>

      <div className="row mt-5 justify-content-center">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25"></div>
            <h2>Trending<br />
            TV Series<br />
            To watch right now</h2>
            <p>Top Trending Tv Series Day By Day</p>
            <div className="brdr"></div>
          </div>
        </div>
        {tvs.map((tv)=>(
          <TvCard key={tv.id} tv={tv}></TvCard>
        ))}
      </div>


      <div className="row mt-5 justify-content-center">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25"></div>
            <h2>Trending<br />
            Super Stars</h2>
            <p>Follow Super Stars News Day by Day</p>
            <div className="brdr"></div>
          </div>
        </div>
        {stars.map((star)=>(
          <StarCard key={star.id} star={star}></StarCard>
        ))}
      </div>
    </div>
  )
}