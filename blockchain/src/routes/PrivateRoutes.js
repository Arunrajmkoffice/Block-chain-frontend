import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ProductForm from '../pages/Addproduct'
import Productdata from '../pages/Productdata'
import Sidebar2 from '../pages/Sidebar2'
import Bulkproduct from '../pages/Bulkproduct'
import Editproduct from '../pages/Editproduct'




function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/addproduct" element={<ProductForm/>}/>
      <Route path='/productdata' element={<Productdata/>}/>
      <Route path='/sidebar' element={<Sidebar2/>}/>
      <Route path='/bulkproduct' element={<Bulkproduct/>}/>
      <Route path='/edit' element={<Editproduct/>}/>
    </Routes>
  )
}

export default PrivateRoutes