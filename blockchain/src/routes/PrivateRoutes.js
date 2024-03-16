import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ProductForm from '../pages/Addproduct'
import Productdata from '../pages/Productdata'
import ResponsiveDrawer from '../pages/sidebar'

function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/addproduct" element={<ProductForm/>}/>
      <Route path='/productdata' element={<Productdata/>}/>
      <Route path='/sidebar' element={<ResponsiveDrawer/>}/>
    </Routes>
  )
}

export default PrivateRoutes