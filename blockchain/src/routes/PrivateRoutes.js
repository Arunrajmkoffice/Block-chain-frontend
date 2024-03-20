import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ProductForm from '../pages/Addproduct'
import Productdata from '../pages/Productdata'
import Sidebar2 from '../pages/Sidebar2'
import Bulkproduct from '../pages/Bulkproduct'
import Editproduct from '../pages/Editproduct'
import Demo from '../pages/demo'




function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/addproduct" element={<ProductForm/>}/>
      <Route path='/productdata' element={<Productdata/>}/>
      <Route path='/sidebar' element={<Sidebar2/>}/>
      <Route path='/bulkproduct' element={<Bulkproduct/>}/>
      <Route path='/edit' element={<Editproduct/>}/>
      <Route path='/demo' element={<Demo/>}/>
    </Routes>
  )
}

export default PrivateRoutes