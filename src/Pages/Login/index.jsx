import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
export default function Login({saveUserData}) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
      email: "",
      password: ""
  });
  function getData(e){
      let data = {...formData};
      data[e.target.name] = e.target.value;
      setFormData(data);
  }
  function validation(){
    const schema = Joi.object({
        email: Joi.string().email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] }
        }).required(),
        password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
    });
    return schema.validate(formData, { abortEarly: false });
  }
  function handleSubmit(e){
      e.preventDefault();
      const { error } = validation();
      if (error) {
          setErrorMessage(error.message);
          return;
      }
      axios
          .post("http://hawas.runasp.net/api/v1/Login", formData)
          .then((res) => {
              localStorage.setItem("Token",res.data.jwt);
              saveUserData();
              navigate("/home");
          })
          .catch((err) => {
              console.log(err);
              setErrorMessage(err.response.data);
          });
  }
  return (
      <div className="w-75 mx-auto my-5">
        <h1 className="text-center">Login Now</h1>
        {errorMessage.length?<p className='alert alert-danger'>{errorMessage}</p>:<></>}
        <form onSubmit={handleSubmit}>
          <label className="form-label">Email</label>
          <input type="email" className="form-control mb-3" name="email" onChange={getData} />
          <label className="form-label">Password</label>
          <input type="password" className="form-control mb-3" name="password" onChange={getData} />
          <button type="submit" className="btn btn-outline-info">Login</button>
        </form>
      </div>
  )
}