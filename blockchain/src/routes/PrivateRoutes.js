import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ProductForm from '../pages/Addproduct'
import Productdata from '../pages/Productdata'
import Sidebar2 from '../pages/Sidebar2'
import Bulkproduct from '../pages/Bulkproduct'
import Editproduct from '../pages/Editproduct'
import Demo from '../pages/demo'
import Updateproductpage from '../pages/Updateproductpage'
import Productpage from '../pages/Productpage'
import QRScanner from '../pages/QRScanner'




function PrivateRoutes() {
  let role = JSON.parse(localStorage.getItem('bcUserData'))
  return (
    <Routes>
      {role && (
        <>
          {role.role !== 'Medorna Office' && role.role !== 'IGO Office' && role.role !== 'Amazone Office' && (
            <>
      <Route path="/" element={<Dashboard/>}/>
      <Route path="/addproduct" element={<ProductForm/>}/>
      <Route path='/productdata' element={<Productdata/>}/>
      <Route path='/bulkproduct' element={<Bulkproduct/>}/>
      <Route path='edit/:id' element={<Updateproductpage/>}/>
      <Route path='/demo' element={<Demo/>}/>
      </>
      )}
    </>
  )}
      <Route path='productpage/:id' element={<Productpage/>}/>
      <Route path ='/qrcode' element={<QRScanner/>}/>
      <Route path='/edit' element={<Editproduct/>}/>
      <Route path='/sidebar' element={<Sidebar2/>}/>
    </Routes>
  )
}

export default PrivateRoutes