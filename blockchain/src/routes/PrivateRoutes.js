import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ProductForm from '../pages/Addproduct'
import Productdata from '../pages/Productdata'
import Sidebar2 from '../pages/Sidebar2'
import Bulkproduct from '../pages/Bulkproduct'
import Updateproductpage from '../pages/Updateproductpage'
import Productpage from '../pages/Productpage'
import QRScanner from '../pages/QRScanner'
import * as React from 'react';
import Box from '@mui/material/Box';
import Editproduct from '../pages/Editproduct'
import Ai from '../pages/Ai'
import AllUserList from '../pages/AllUserList'
import Send from '../pages/Send'
import Viewproduct from '../pages/Viewproduct'
import Loader from '../pages/Loader'
import Test from '../pages/Test'
import RefreshToken from '../pages/RefreshToken'
const drawerWidth = 240;
function PrivateRoutes() {
  let role = JSON.parse(localStorage.getItem('bcUserData'));
  const login= window.localStorage.getItem('islogin')
  return (
    <Box>
        <Routes>
          {role && (
            <>
              {role.role !== 'IGO Office' && role.role !== 'Amazon Office' && (
                <>
                  <Route path="/qrcode1" element={<Dashboard />} />
                  <Route path="/addproduct" element={<ProductForm />} />
                  <Route path='/productdata' element={<Productdata />} />
                  <Route path='/bulkproduct' element={<Bulkproduct />} />
                  <Route path='edit/:id' element={<Updateproductpage />} />
                  <Route path='/alluserlist' element={<AllUserList />} />
                  <Route path='/' element={<QRScanner />} />
                  <Route path='/ai' element={<Ai />} />
                </>
              )}
            </>
          )}
          <Route path='/productpage/:id' element={<Productpage />} />
          <Route path='/' element={<QRScanner />} />
          <Route path='/edit' element={<Editproduct />} />
          <Route path='/sidebar' element={<Sidebar2 />} />
          <Route path='/send' element={<Send/>}/>
          <Route path='/viewproduct/:id' element={<Viewproduct />}/>
          <Route path='/loader' element={<Loader />}/>
          <Route path='/test' element={<Test/>}/>
          <Route path='/refresh' element={<RefreshToken/>}/>
        </Routes>
    </Box>
  )
}



export default PrivateRoutes