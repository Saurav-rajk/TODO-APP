import React, { useState } from 'react';
import './signup.css'; // reuse the same CSS for theme consistency
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { authActions } from '../../store';


const Signin = () => {
  const dispatch = useDispatch();

  const history = useNavigate();
   const [inputs, setInputs] = useState({
      email: "",
      password: "",
  
    });
     const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  }
 const submit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`http://localhost:1000/api/v1/signin`, inputs);
    console.log("Full Response:", response);            // log entire response
    console.log("Response Data:", response.data);       // log data only

    // Check structure
    const userId = response.data?.others?._id;
    if (!userId) {
      console.error("Missing user ID in response");
      return;
    }

    sessionStorage.setItem("id", userId);
    dispatch(authActions.login());
    history("/todo");
  } catch (error) {
    console.error("Signin Error:", error);
  }
};

  return (
    <div className="signup-page">
      <div className="signup-container container-fluid">
        <div className="row w-100 h-100">
          {/* Left Section */}
          <div className="col-lg-4 col-md-5 col-left d-flex flex-column justify-content-center align-items-center text-white">
            <h1 className="sign-up-heading text-center">
              Hello <br /> Again
            </h1>
            <p className="text-center mt-3">Login to manage your daily tasks effortlessly.</p>
          </div>

          {/* Right Section */}
          <div className="col-lg-8 col-md-7 d-flex justify-content-center align-items-center form-column">
            <div className="signup-form p-5 shadow rounded bg-white">
              <h2 className="mb-4 text-center text-theme">Sign In</h2>
              <input
                type="email"
                name="email"
                className="form-control mb-3 input-signup"
                placeholder="Enter your email"
                value={inputs.email}
                onChange={change}
              />
              <input
                type="password"
                name="password"
                className="form-control mb-4 input-signup"
                placeholder="Enter your password"
                value={inputs.password}
                onChange={change}
              />
              <button className="btn btn-theme w-100 p-2 btn-signup " onClick={submit}>Sign In</button>
              <p className="text-center mt-3">
                Don’t have an account? <a href="/signup" className="text-theme">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
