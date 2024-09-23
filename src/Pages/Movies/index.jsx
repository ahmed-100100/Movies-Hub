import React, { useContext } from 'react';
import MovieCard from '../../Components/MovieCard';
import { MainContext } from '../Store';
import { Link } from 'react-router-dom';
export default function Movies() {
  let { movies, moviePage, setMoviePage } = useContext(MainContext);
  function next(){setMoviePage((prevPage) => prevPage + 5);}
  function previous() {setMoviePage((prevPage) => (prevPage > 5 ? prevPage - 5 : 1));}
  let startPage = Math.floor((moviePage - 1) / 5) * 5 + 1;
  let numbers = new Array(5).fill(1).map((_, i) => startPage + i);
  return (
    <div className="row my-3 justify-content-center">
      {movies.length ? (
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <></>
      )}
      <nav aria-label="Page navigation example">
        <ul className="pagination pagination-lg my-3 justify-content-center">
          <li className={"page-item"}>
            <Link className="page-link bg-dark" to="#" aria-label="Previous" onClick={previous}>
              <span className="bg-transparent" aria-hidden="true">&laquo;</span>
            </Link>
          </li>
          {numbers.map((number) => (
            <li className="page-item" key={number}>
              <Link
                onClick={() => setMoviePage(number)}
                className={`page-link ${number === moviePage ? 'bg-white' : 'bg-transparent'}`}
                to="#"
              >
                {number}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <Link className="page-link bg-dark" to="#" aria-label="Next" onClick={next}>
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
