import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import "./App.css"
import React, { useContext } from "react";
import Navbar from "./Pages/Navbar";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import Stars from "./Pages/Stars";
import TV from "./Pages/TV";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import MovieDetails from "./Pages/Details/MovieDetails";
import StarDetails from "./Pages/Details/StarDetails";
import TvDetails from "./Pages/Details/TvDetails";
import { MainContext } from "./Pages/Store";
export default function App() {
  let { saveUserData, logOut } = useContext(MainContext);
  function ProtectedRoute(props){
    if(localStorage.getItem("Token")==null){
      return <Navigate to={"/login"} />
    }else{
      return props.children;
    }
  }
  return (
    <div>
      <Navbar logOut={logOut} />
      <div className="container">
        <Routes>
          <Route path="" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="movies" element={<ProtectedRoute><Movies/></ProtectedRoute>} />
          <Route path="stars" element={<ProtectedRoute><Stars/></ProtectedRoute>} />
          <Route path="tvs" element={<ProtectedRoute><TV/></ProtectedRoute>} />
          <Route path="movie/:id" element={<ProtectedRoute><MovieDetails/></ProtectedRoute>} />
          <Route path="star/:id" element={<ProtectedRoute><StarDetails/></ProtectedRoute>} />
          <Route path="tv/:id" element={<ProtectedRoute><TvDetails/></ProtectedRoute>} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login saveUserData={saveUserData}/>} />
          <Route path="*" element={<h1>Not Found!</h1>} />
        </Routes>
      </div>
    </div>
  )
}