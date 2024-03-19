import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

function Editproduct() {
  const [productData, setProductData] = useState([]);
  let token = localStorage.getItem('bcToken')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://courageous-cow-life-jacket.cyclic.app/product', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log('Data type:', typeof data); 
        console.log('get data', data);
        setProductData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{margin:'10px',display:'flex', flexDirection:'column', gap:'10px',  textAlign:'left'}}>
      {productData?.products?.map((product, index) => (
        <Box key={index}>
        <Box sx={{border: '1px solid #95AAAD36',}}>
        <Box sx={{display:'flex', justifyContent:'space-between', width:'100%', textAlign:'left'}}>
        <Box sx={{display:'flex', justifyContent:'space-between', gap:'10x', width:'20%', border:'1px solid #95AAAD36',textAlign:"left"}}>
          <Box sx={{textAlign:"left"}}><img src={`https://courageous-cow-life-jacket.cyclic.app/${product.image[0].imageData}`} alt="Product" /></Box>
          <Box sx={{textAlign:"left"}} ><Typography sx={{textAlign:"left"}}>{product.product}</Typography></Box>
        </Box> 
        <Box sx={{width:'20%', }}><Typography>SKU: {product.sku}</Typography>
        <Typography>Category: {product.category}</Typography>
        <Typography>Tag: {product.tag}</Typography>
        </Box>
        <Box sx={{}}>
        <Typography>Price: ${product.price}</Typography>
        <Typography>Sales Price: ${product.salesPrice}</Typography>
        <Typography>Inventory: {product.inventory}</Typography>
        </Box>
        <Box width= '20%'> <Typography>Branch Number: {product.branchNumber}</Typography>
          <Typography>Country of Origin: {product.countryOfOrigin}</Typography></Box>
        <Box width= '20%'><Typography>Description: {product.description}</Typography>
          <Typography>Brand: {product.brand}</Typography></Box>
        </Box>
        </Box>
        </Box>
      ))}
    </Box>
  );
}

export default Editproduct;
