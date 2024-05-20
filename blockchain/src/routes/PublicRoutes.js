import React from 'react'
import Signin from '../pages/Signin'
import { Navigate, Route, Routes } from 'react-router-dom'
import Productcustomer from '../pages/Productcustomer'
import Signup from '../pages/Signup'
import SigninVerify from '../pages/SigninVerify'
import Forgot from '../pages/Forgot'



function PublicRoutes() {
  return (
   <Routes>
    <Route path="/" element={<Signin/>} />
    <Route path='productpage/:id' element={<Productcustomer />} />
    <Route path='/signup' element={<Signup/>}/>
    <Route path='signin/:id' element={<SigninVerify/>}/>
    <Route path='/forgot' element={<Forgot />}/>
    </Routes>
  )
}

export default PublicRoutes