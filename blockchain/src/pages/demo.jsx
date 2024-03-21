import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getproductdata } from '../redux/data/action'
import { Input } from '@mui/material'

function Productdata() {
  const dispatch = useDispatch()
  let token = localStorage.getItem('bcToken')
  const data = useSelector((store)=>store.data.getproduct)
  const [search, setSearch] = useState()
  console.log("data",data)
useEffect(()=>{
let data = {
  search:search
}
    dispatch(getproductdata(data,token)) 

},[search])
   
    
  return (
    <>
      <div>Productdata</div>
      <Input onChange={(e)=>setSearch(e.target.value)} />
      {data?.products?.map(product => (
        <div key={product._id}>
          <h3>{product.product}</h3>
          <p>Brand: {product.brand}</p>
          <p>Description: {product.description}</p>
          <p>Price: {product.price}</p>
        </div>
      ))}
    
    </>
    
  )
}

export default Productdata