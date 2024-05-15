import React from 'react'
import Signin from '../pages/Signin'
import { Route, Routes } from 'react-router-dom'
import Productcustomer from '../pages/Productcustomer'
import Signup from '../pages/Signup'
import SigninVerify from '../pages/SigninVerify'



function PublicRoutes() {
  return (
   <Routes>
    <Route   path="/" element={<Signin/>} />
    <Route path='productpage/:id' element={<Productcustomer />} />
    <Route path='/signup' element={<Signup/>}/>
    <Route path='signin/:id' element={<SigninVerify/>}/>
   </Routes>
  )
}

export default PublicRoutes