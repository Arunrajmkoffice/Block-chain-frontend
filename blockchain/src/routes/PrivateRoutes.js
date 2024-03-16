import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ProductForm from '../pages/Addproduct'
import Productdata from '../pages/Productdata'

function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/addproduct" element={<ProductForm/>}/>
      <Route path='/productdata' element={<Productdata/>}/>
    </Routes>
  )
}

export default PrivateRoutes