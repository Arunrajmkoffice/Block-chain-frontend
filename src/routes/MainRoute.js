import React from 'react'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

function MainRoute() {
  const token = localStorage.getItem('bcToken');
  return (
    <>
      { token ? <PrivateRoutes/>:
      <PublicRoutes/> 
      }    
    </>
  )
}

export default MainRoute