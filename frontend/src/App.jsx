import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/home'
import Footer from './components/footer/footer'
import About from './components/about/About'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from './components/signup/Signup'
import Signin from './components/signup/Signin'
import Todo from './components/Todo/Todo'
import {useDispatch} from "react-redux";
import { authActions } from './store'

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const id=sessionStorage.getItem("id");
    if(id){
      dispatch(authActions.login());
    }
    
  })

  return (
    <>
     <Router>
      <Navbar />
       <Routes>
         <Route exact path="/" element={<Home />}/>
         <Route path="/about" element={<About />}/>
         <Route path="/todo" element={<Todo />}/>
         <Route path="/signup" element={<Signup />}/>
         <Route path="/signin" element={<Signin />}/>
       </Routes>
     </Router>
      
      
      
      <Footer />
    </>
  )
}

export default App
