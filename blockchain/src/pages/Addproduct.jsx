import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'



function Addproduct() {
  const [productname, setProductname]=useState('');
  const [sku, setSku]=useState('')
  const [batchnumber, setBatchnumber]=useState('');
  const [image, setImage]=useState('');
  const [Countryorigin, setCountryorign]=useState('');
  const [inventory, setInventory]=useState('');
  const [description, setDescription]=useState('');
  const [tag,setTag]=useState('');
  const [price,setPrice]=useState('');
  const [saleprice,setSaleprice]=useState('');
  const [brand,setBrand]=useState('');
  const [categories,setCategories]=useState('');
  const [productnameError,setProductnameError]=useState('');

  const handleProductname=(e)=>{
    setProductname(e.target.value)
  }
  const handleSku=(e)=>{
    setSku(e.target.value)
  }
  const handleBatchnumber=(e)=>{
    setBatchnumber(e.target.value)
  }
  const handleImage=(e)=>{
    setImage(e.target.value)
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
  const handlesubmit=()=>{
    let data={
      productname, sku, batchnumber, image, Countryorigin, inventory, description, tag, price, brand, categories,saleprice
    }
    console.log(data)
  }
  return (
    <Box display="flex" flexDirection="column">Addproduct
    <TextField placeholder="Productname" value={productname} id="outlined-basic" label="Outlined" variant="outlined" onChange={handleProductname} error={!!productnameError}
        helperText={productnameError} required />
    <TextField placeholder="Sku" value={sku} id="filled-basic" label="Filled" variant="filled" onChange={handleSku} />
    <TextField placeholder="Batchnumber" value={batchnumber} type="number" id="standard-basic" label="Standard" variant="standard" onChange={handleBatchnumber} />
    <TextField placeholder="Image" value={image} type="file" id="standard-basic" label="Standard" variant="standard" onChange={handleImage} />
    <TextField placeholder="Country origin" value={Countryorigin} id="standard-basic" label="Standard" variant="standard" onChange={handleCountryorigin} />
    <TextField placeholder="Inventory" value={inventory} type="number" id="standard-basic" label="Standard" variant="standard"  onChange={handleInventory}/>
    <TextField placeholder="Description" value={description} id="standard-basic" label="Standard" variant="standard" onChange={handleDescription} />
    <TextField placeholder="Tag" value={tag} id="standard-basic" label="Standard" variant="standard" onChange={handleTag} />
    <TextField placeholder="Price" value={price} type="number" id="standard-basic" label="Standard" variant="standard" onChange={handlePrice} />
    <TextField placeholder="Saleprice" value={saleprice} type="number" id="standard-basic" label="Standard" variant="standard" onChange={handleSaleprice} />
    <TextField placeholder="Brand name" value={brand} id="standard-basic" label="Standard" variant="standard" onChange={handleBrandname} />
    <TextField placeholder="Categories"  value={categories} id="standard-basic" label="Standard" variant="standard" onChange={handleCategories} />
    <Button variant="text" onClick={handlesubmit}>Submit</Button>
    </Box>
  )
}

export default Addproduct