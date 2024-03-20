import React from 'react'
import Signin from '../pages/Signin'
import { Route, Routes } from 'react-router-dom'


function PublicRoutes() {
  return (
   <Routes>
    <Route   path="/" element={<Signin/>} />
   </Routes>
  )
}

export default PublicRoutes