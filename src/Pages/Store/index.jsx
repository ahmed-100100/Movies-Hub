import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
export let MainContext = createContext("");
export function MainContextProvider(props) {
  let [movies, setMovies] = useState([]);
  let [stars, setStars] = useState([]);
  let [tvs, setTvs] = useState([]);
  let [moviePage, setMoviePage] = useState(1);
  let [personPage, setPersonPage] = useState(1);
  let [tvPage, setTvPage] = useState(1);
  let [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  function saveUserData(){
    let encode = localStorage.getItem("Token");
    let decode = jwtDecode(encode);
    setUserData(decode);
  }
  function logOut(){
    setUserData(null);
    localStorage.removeItem("Token");
    navigate("/login");
  }
  function getComponent(type,callback){
    axios
    .get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=c9fac173689f5f01ba1b0420f66d7093&page=${type==="movie"?moviePage:type==="person"?personPage:tvPage}`)
    .then((res)=>{callback(res.data.results);})
    .catch((err)=>{console.log(err);})
  }
  useEffect(()=>
    {
      getComponent("movie",setMovies);
      getComponent("person",setStars);
      getComponent("tv",setTvs);
    },[moviePage, personPage, tvPage]);
  return (
    <MainContext.Provider value={{ movies, stars, tvs, moviePage, setMoviePage, personPage, setPersonPage, tvPage, setTvPage, userData, saveUserData, logOut }}>
        {props.children}
    </MainContext.Provider>
  );
}