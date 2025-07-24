import React, { useState } from 'react';
import './signup.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",

  });
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }
  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:1000/api/v1/register`, inputs).then((response) => {
      if(response.data.message === "User Already Exists"){
        alert(response.data.message);
      }else{
         alert(response.data.message);
        setInputs({
        email: "",
        username: "",
        password: "",
      });
      history("/signin")
      }
      
    });

  };
  return (
    <div className="signup-page">
      <div className="signup-container container-fluid">
        <div className="row w-100 h-100">
          {/* Left Section */}
          <div className="col-lg-4 col-md-5 col-left d-flex flex-column justify-content-center align-items-center text-white">
            <h1 className="sign-up-heading text-center">
              Welcome <br /> Back
            </h1>
            <p className="text-center mt-3">Join us and manage your tasks with ease.</p>
          </div>

          {/* Right Section */}
          <div className="col-lg-8 col-md-7 d-flex justify-content-center align-items-center form-column">
            <div className="signup-form p-5 shadow rounded bg-white">
              <h2 className="mb-4 text-center text-theme">Create Account</h2>
              <input
                type="email"
                name="email"
                className="form-control mb-3 input-signup"
                placeholder="Enter your email"
                onChange={change}
                value={inputs.email}
              />
              <input
                type="text"
                name="username"
                className="form-control mb-3 input-signup"
                placeholder="Enter your username"
                onChange={change}
                value={inputs.username}
              />
              <input
                type="password"
                name="password"
                className="form-control mb-4 input-signup"
                placeholder="Enter your password"
                value={inputs.password}
                onChange={change}
              />
              <button className="btn btn-theme w-100 p-2 btn-signup " onClick={submit}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
