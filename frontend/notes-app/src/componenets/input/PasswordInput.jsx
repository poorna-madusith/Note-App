import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa";



const PasswordInput = ({value, onChange,placeholder}) => {

    const [isShowPasword, setIsShowPassword] = useState(false);

    const toggleShowPasssword = ()=>{
        setIsShowPassword(!isShowPasword);
    };

  return (
    <div className="flex items-center bg-transparent border border-1.5 px-5 rounded mb-3">
      <input value = {value} onChange={onChange} 
      type = {isShowPasword ? "text" : "password" } 
      placeholder={placeholder || "Password"} 
      className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />


    {isShowPasword? <FaRegEye size={22} className="text-primary cursor-pointer" 
    onClick={toggleShowPasssword}  />: <FaRegEyeSlash size={22} 
    className="text-slate-400 cursor-pointer"
    onClick = {()=> toggleShowPasssword()}/>
    }

    </div>
  )
}

export default PasswordInput
