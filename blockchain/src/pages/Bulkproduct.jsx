import { Box, ListItem, ListItemIcon, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CSVReader from 'react-csv-reader';


function Bulkproduct() {
    const [importedProducts, setImportedProducts] = useState([]);

    const handleCSVUpload = (data) => {
        const headers = data[0];
        const productData = data.slice(1);
        const products = productData.map(row => {
          let product = {};
          headers.forEach((header, index) => {
            product[header] = row[index];
          });
          return product;
        });
        setImportedProducts(products);
    };
  return (
    <Box sx={{display:'flex',flexDirection:'column', margin:'10px 10%'}}  >
    <Box display="flex" gap="10px" justifyContent="space-between">
      <Box ><Typography sx={{color:'#124BF2',fontWeight:'bold',fontSize:'20px'}}>BULK PRODUCT </Typography></Box>
      <Box display="flex" gap="20px">
        <Link to="/addproduct" style={{color:'#0C2262', border:'1px solid #0C2262',padding:'0px 10px', borderRadius:'10px', textDecoration:'none'}}><ListItem><ListItemIcon><AddCircleOutlineIcon sx={{color:'#0C2262'}} /></ListItemIcon>SINGLE PRODUCT UPLOAD</ListItem></Link>
        <Link to="/bulkproduct" style={{backgroundColor:"#0D2768" ,color:"#ffffff", borderRadius:"10px", textDecoration:"none" }} ><ListItem><ListItemIcon><AddCircleOutlineIcon sx={{color:'#ffffff'}}  /></ListItemIcon >BULK UPLOAD</ListItem></Link>
      </Box>
    </Box>
    <Box sx={{boxShadow: '0px 0px 15.600000381469727px 0px #00000040', width:'80%', height:'300px'}}>
    <h1>Import product from a CSS file</h1>
    <Typography>Choice a CSV file from computer</Typography>
      <CSVReader
        onFileLoaded={handleCSVUpload}
        parserOptions={{ header: true }}
      />
      <ul>
        {importedProducts.map((product, index) => (
          <li key={index}>{JSON.stringify(product)}</li>
        ))}
      </ul>
    </Box>
    
  </Box>
  )
}

export default Bulkproduct
