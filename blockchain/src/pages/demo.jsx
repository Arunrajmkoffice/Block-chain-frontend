import React, { useEffect } from 'react'

function demo() {
  const [productData, setProductData] = ([]);
  let token = localStorage.getItem('bcToken')
  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const response = await fetch ('f',{
          headers:{
            'Authorization':`Bearer ${token}`
          }
        });
        const data=await response.json();
        setProductData(data);
      }
      catch (error){

      }
    };
    fetchData();
  },[])
  return (
    <div>
      {
        productData?.products?.map((product,index)=>(
          <div key={index}>
            <h2>{product.product}</h2>
            <p>price</p>
          </div>
        ))
      }
    </div>
  )
}

export default demo
