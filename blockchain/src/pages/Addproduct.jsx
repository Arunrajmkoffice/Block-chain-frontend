import { Box, Button, InputLabel, ListItem, ListItemIcon, TextField,Typography,styled } from '@mui/material'
import React, {useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
const CustomInput = styled(TextField)(({ theme }) => ({
  border:"1px solid #232321", borderRadius:"10px",width:'100%',
  [theme.breakpoints.down("xl")]: {},
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.down("xs")]: {},
}));


function Addproduct() {
  const [productname, setProductname]=useState('');
  const [sku, setSku]=useState('')
  const [batchnumber, setBatchnumber]=useState('');
  const [images, setImages]=useState([]);
  const [countryorigin, setCountryorign]=useState('');
  const [inventory, setInventory]=useState('');
  const [description, setDescription]=useState('');
  const [tag,setTag]=useState('');
  const [price,setPrice]=useState('');
  const [saleprice,setSaleprice]=useState('');
  const [brand,setBrand]=useState('');
  const [categories,setCategories]=useState('');

  const handleProductname=(e)=>{
    setProductname=e.target.value;
  };
  const handleSku=(e)=>{
    setSku(e.target.value)
  }
  const handleBatchnumber=(e)=>{
    setBatchnumber(e.target.value)
  }
  const handleCountryorigin=(e)=>{
    setCountryorign(e.target.value)
  }
  const handleInventory=(e)=>{
    setInventory(e.target.value)
  }
  const handleDescription=(e)=>{
    setDescription(e.target.value)
  }
  const handleTag=(e)=>{
    setTag(e.target.value)
  }
  const handlePrice=(e)=>{
    setPrice(e.target.value)
  }
  const handleSaleprice=(e)=>{
    setSaleprice(e.target.value)
  }
  const handleBrandname=(e)=>{
    setBrand(e.target.value)
  }
  const handleCategories=(e)=>{
    setCategories(e.target.value)
  }
  const handleImages = (e) => {
    const files = e.target.files;
    const fileArray = Array.from(files).map((file) => ({
      imageData: URL.createObjectURL(file),
      imageId: 'type', // You can assign a specific image ID or use file name, etc.
    }));
    setImages((prevImages) => prevImages.concat(fileArray));
  };
  
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('bcToken');
    const productData = {
      product: productname.trim(),
      branchNumber: batchnumber.trim(),
      sku: sku.trim(),
      countryOfOrigin: countryorigin.trim(),
      inventory: inventory.trim(),
      description: description.trim(),
      tag: tag.trim(),
      price: price.trim(),
      brand: brand.trim(),
      category: categories.trim(),
      salesPrice: saleprice.trim(),
      image: images,
    };
  
    try {
      const response = await fetch('http://3.6.93.117:9090/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(productData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error.message);
    }
  };
  

  return (
    <Box sx={{display:'flex',flexDirection:'column', margin:'0px 10%'}}  >
      <Box display="flex" gap="10px" justifyContent="space-between">
        <Box ><Typography sx={{color:'#124BF2',fontWeight:'bold',fontSize:'20px'}}>ADD NEW PRODUCT </Typography></Box>
        <Box display="flex" gap="20px">
          <Link to="/addproduct" style={{backgroundColor:"#0D2768" ,color:"#ffffff", borderRadius:"10px", textDecoration:"none" }}><ListItem><ListItemIcon><AddCircleOutlineIcon sx={{color:'#ffffff'}}/></ListItemIcon>SINGLE PRODUCT UPLOAD</ListItem></Link>
          <Link to="/bulkproduct" style={{color:'#0C2262', border:'1px solid #0C2262',padding:'0px 10px', borderRadius:'10px', textDecoration:'none'}}><ListItem><ListItemIcon><AddCircleOutlineIcon sx={{color:'#0C2262'}} /></ListItemIcon >BULK UPLOAD</ListItem></Link>
        </Box>
      </Box>
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Product Name</InputLabel>
    <CustomInput placeholder="Productname" value={productname} id="outlined-basic"  variant="outlined" onChange={handleProductname}  required />
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Batch Number</InputLabel>
    <CustomInput placeholder="Batchnumber" value={batchnumber}  id="standard-basic"  variant="outlined" onChange={handleBatchnumber} required />
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Country Origin</InputLabel>
    <CustomInput placeholder="Country origin" value={countryorigin} id="standard-basic"  variant="outlined" onChange={handleCountryorigin} required />
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Description</InputLabel>
    <CustomInput placeholder="Description" value={description} id="standard-basic"  variant="outlined" onChange={handleDescription}required  />
    <Box display="flex" gap='10px'>
      <Box width='100%'><InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Sku</InputLabel>
    <CustomInput placeholder="Sku" value={sku} id="filled-basic" variant="outlined" onChange={handleSku} required  /></Box>
      <Box width='100%'>
      <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Inventory</InputLabel>
    <CustomInput placeholder="Inventory" value={inventory} type="text" id="standard-basic"  variant="outlined"  onChange={handleInventory} required />
      </Box>
    </Box>
    <Box display="flex" gap="10px">
      <Box width='100%'>
        <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Price</InputLabel>
        <CustomInput placeholder="Price" value={price} type="text" id="standard-basic"  variant="outlined" onChange={handlePrice} required  /></Box>
      <Box width='100%'>
        <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Sale Price</InputLabel>
        <CustomInput placeholder="Saleprice" value={saleprice} type="text" id="standard-basic"  variant="outlined" onChange={handleSaleprice} required  /></Box>
    </Box>
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Tag</InputLabel>
    <CustomInput placeholder="Tag" value={tag} id="standard-basic"  variant="outlined" onChange={handleTag} required  />
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Brand Name</InputLabel>
    <CustomInput placeholder="Brand name" value={brand} id="standard-basic"  variant="outlined" onChange={handleBrandname} required  />
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Categories</InputLabel>
    <CustomInput placeholder="Categories"  value={categories} id="standard-basic"  variant="outlined" onChange={handleCategories} required  />
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Image</InputLabel>
    <CustomInput type="file" multiple id="standard-basic" variant="outlined" onChange={handleImages} required  /><br />
    
    <Button variant="text" onClick={handlesubmit} sx={{color:'#fff', backgroundColor:'#124BF2', '&:hover':{
      color:'#fff', backgroundColor:'#124BF2',
    }}}>Update</Button>
    <br/><br/>
    </Box>
  )
}

export default Addproduct