import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function Productpage() {
    const { id } = useParams();
    const [products, setProducts]=useState([]);
    let token = localStorage.getItem('bcToken');

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await fetch(`http://3.6.93.117:9090/product/${id}`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
                const data =await response.json();
                setProducts(data);
                console.log('data', data)
            }catch (error){
                console.error('error:',error)
            }
        };
        fetchData();
    },[])

  return (
<>
  <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
        <Grid sx={{border:'1px solid red'}} item xs={4}>
        <h3>{products?.product?.product}</h3>
        <Typography>product image</Typography>
        </Grid>
        <Grid sx={{border:'1px solid red'}} item xs={4}>
        <Typography sx={{ padding: '10px 0px' }}>Batch Number: {products?.product?.branchNumber}</Typography>
        <Typography sx={{ padding: '10px 0px' }}>Brand Name: {products?.product?.brand}</Typography>
        <Typography sx={{ padding: '10px 0px' }}>Categories: {products?.product?.category}</Typography>
        <Typography sx={{ padding: '10px 0px' }}>Country origin: {products?.product?.countryOfOrigin}</Typography>
        <Typography sx={{ padding: '10px 0px' }}>Description:{products?.product?.description}</Typography>
        </Grid>
        <Grid sx={{border:'1px solid red'}} item xs={4}>
        <Typography sx={{ padding: '0px 10px', textAlign: 'left' }}>
          <Typography sx={{ padding: '10px 0px' }}>sku: {products?.product?.sku}</Typography>
          <Typography sx={{ padding: '10px 0px' }}>Inventory: {products?.product?.inventory}</Typography>
          <Typography sx={{ padding: '10px 0px' }}>Regular Price: {products?.product?.price}</Typography>
          <Typography sx={{ padding: '10px 0px' }}>Sale Price: {products?.product?.salesPrice}</Typography>
          <Typography sx={{ padding: '10px 0px' }}>Tag: {products?.product?.tag}</Typography>
        </Typography>
        </Grid>
      </Grid>
    </Box>

</>


  )
}

export default Productpage
