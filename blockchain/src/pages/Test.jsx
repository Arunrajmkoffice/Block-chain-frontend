import axios from 'axios'
import React, { useEffect } from 'react'

function Test() {

    let token = localStorage.getItem('bcToken')

    const userData = JSON.parse(localStorage.getItem('bcUserData'));
    const getData = (data)=>{
        console.log("data",userData.vendorId)
        axios({
            method:"GET",
            url:`http://localhost:9096/product`,
            headers:{
                Authorization:`Bearer ${token}`
            },
            data

        }).then((res)=>{
            console.log(res.data)
        }).catch((error)=>{
            console.log(error)
        })
    }


useEffect(()=>{
    
let data = {
    vendorId: userData.vendorId

}
    getData(data)
},[])


  return (
    <div>
      
    </div>
  )
}

export default Test
