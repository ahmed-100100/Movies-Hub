import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
export default function Register() {
    const navigate = useNavigate();
    const [clientErrors, setClientErrors] = useState([]);
    const [serverErrors, setServerErrors] = useState("");
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        rePassword: "",
        dateOfBirth: ""
    });
    function getData(e){
        let data = {...formData};
        data[e.target.name] = e.target.value;
        setFormData(data);
    }
    function validateData(){
        const schema = Joi.object({
            userName: Joi.string().alphanum().min(3).max(30).required(),
            email: Joi.string().email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "net"] }
            }).required(),
            password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
            rePassword: Joi.any().valid(Joi.ref('password')).required().messages({
                'any.only': 'Passwords do not match'
            }),
            dateOfBirth: Joi.date().less('now').required().messages({
                'date.less': 'Date of birth must be in the past',
                'date.base': 'Invalid date format'
            })
        });
        return schema.validate(formData, { abortEarly: false });
    }
    function handleSubmit(e){
        e.preventDefault();
        let statusError = validateData();
        if(statusError?.error){
            setServerErrors("");
            setClientErrors(statusError?.error.details);
        }
        else{
            axios
            .post("http://hawas.runasp.net/api/v1/Register", formData)
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch((err) => {
                setClientErrors("");
                setServerErrors(err.response.data);
            });
        }
    }
    return (
        <div className="w-75 mx-auto my-5">
          <h1 className="text-center">Register Now</h1>
          {serverErrors.length?<p className='alert alert-danger'>{serverErrors}</p>:<></>}
          {clientErrors.length>0 &&
            clientErrors.map((err,i)=>(
                <p key={i} className='alert alert-danger'>{err.message}</p>
          ))}
          <form onSubmit={handleSubmit}>
            <label className="form-label">User Name</label>
            <input type="text" className="form-control mb-3" name="userName" onChange={getData} />
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control mb-3" name="dateOfBirth" onChange={getData} />
            <label className="form-label">Email</label>
            <input type="email" className="form-control mb-3" name="email" onChange={getData} />
            <label className="form-label">Password</label>
            <input type="password" className="form-control mb-3" name="password" onChange={getData} />
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-control mb-3" name="rePassword" onChange={getData} />
            <button type="submit" className="btn btn-outline-info">Register</button>
          </form>
        </div>
    )
}