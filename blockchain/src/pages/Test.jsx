import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Test() {
  const [data, setData] = useState('')
  useEffect(() => {
    axios({
      method: 'POST',
      url: `http://localhost:9096/product/edit`,
      header: {
        Authorization: `Bearer ${token}`
        
      }
    })
      .then((res) => {
        setData(res)
      })
      .catch((err) = {

      })
  }, [])
  axios({
    medthod:"Path",
    url:"http://localhost:9098/product",
    header:{
      Authorization:`Bearer ${token}`
    }
    .then((res)=>{
      setData(res)
    })
    .catch((err)=>{
      
    })
    
  })
  return (
    <div>
      <p>{data}</p>
    </div>
  )
}

export default Test
