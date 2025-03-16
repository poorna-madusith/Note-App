import React from 'react'
import Navbar from '../../componenets/Navbar/Navbar'
import {Link} from 'react-router-dom'
import PasswordInput from '../../componenets/input/PasswordInput'


const Login = () => {
  return <>
    <Navbar />

    <div className = "flex items-center justify-center mt-28">
        <div className="w-96 border rounded bg-white px-7 py-10">
            <form onSubmit={()=>{}}>
                <h4 className = "text-2xl mb-7">Login</h4>
                <input type="text" placeholder='Email' className="input-box"/>
                
                <PasswordInput />
                <button type = "submit" className='btn-primary'> Log in</button>
                <p className="text-sm text-center mt-4"> Not registered yet?{""} <Link to="/signup" className="font-medium text-primary underline ">Ceate and account</Link></p>
            </form>
        </div>
    </div>
  </>
}

export default Login
