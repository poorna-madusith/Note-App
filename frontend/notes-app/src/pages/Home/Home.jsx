import React from 'react'
import Navbar from '../../componenets/Navbar/Navbar'
import {Link} from 'react-router-dom'
import PasswordInput from '../../componenets/input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import { useState } from 'react'
import Profileinfo from '../../componenets/Cards/Profileinfo'
import NoteCard from '../../componenets/Cards/NoteCard'


const Home = ({title,date,conte}) => {
  return (
    <>
      <Navbar /> 


      <div className = "container mx-auto">

        <NoteCard />
      </div>
    </>
  )
}

export default Home
