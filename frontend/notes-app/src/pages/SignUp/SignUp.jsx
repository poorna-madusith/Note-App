import React from 'react'
import Navbar from '../../componenets/Navbar/Navbar'
import {Link, useNavigate} from 'react-router-dom'
import PasswordInput from '../../componenets/input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import AnimatedBackground from '../../componenets/AnimatedBackground/AnimatedBackground'



const SignUp = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const navigate = useNavigate();
  


  const handleSignUp = async (e) =>{
    e.preventDefault();

    
    if(!name){
      setError("Please enter your name");
      return;
    }
  
    if(!validateEmail(email)){
      setError("Please enter a valid email");
      return;
    }
  
    if(!password){
      setError("Please enter a password");
      return;
    }
  
    setError("");

    //singup api call
    try {
      const response = await axiosInstance.post("/create-account",{
          fullname:name,
          email:email,
          password: password,
      })

      if(response.data && response.data.error){
          setError(response.data.error);
          return;
      }


      if(response.data && response.data.accessToken){
        localStorage.setItem("token",response.data.accessToken)
        navigate("/dashboard");
      }
      
  } catch (error) {
      if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message)
      }else{
          setError("Something went wrong. Please try again.")
      }
      
  }
  }

  return (
    <>
    <AnimatedBackground>
      <Navbar hideControls={true} />

      <div className = "flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
            <form onSubmit={handleSignUp}>
                <h4 className = "text-2xl mb-7">SignUp</h4>


                <input type="text" placeholder='Name' className="input-box"
                value={name}
                onChange={(e) => setName(e.target.value)}/>

                <input type="text" placeholder='Email' className="input-box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>


                <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

                {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
                <button type = "submit" className='btn-primary'>Create Account</button>
                <p className="text-sm text-center mt-4"> Already have an account?{""} <Link to="/login" 
                className="font-medium text-primary underline ">Login</Link>
                </p>

            </form>
        </div>
      </div>
    </AnimatedBackground>
    </>
  )
}

export default SignUp
