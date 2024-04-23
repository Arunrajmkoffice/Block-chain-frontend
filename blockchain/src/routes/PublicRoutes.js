import React from 'react'
import Signin from '../pages/Signin'
import { Route, Routes } from 'react-router-dom'
import Productcustomer from '../pages/Productcustomer'



function PublicRoutes() {
  return (
   <Routes>
    <Route   path="/" element={<Signin/>} />
    <Route path='productpage/:id' element={<Productcustomer />} />
   </Routes>
  )
}

export default PublicRoutes