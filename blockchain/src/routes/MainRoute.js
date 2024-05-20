import React from 'react'
import PublicRoutes from './PublicRoutes'
import Sidebar from '../pages/Sidebar2';

function MainRoute() {
  const token = localStorage.getItem('bcToken');
 
  return (
    <>
      { token ? <Sidebar/>:
      <PublicRoutes/> 
      }    
    </>
  )
}

export default MainRoute