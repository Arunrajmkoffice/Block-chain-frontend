import { Alert, Box, Button, InputLabel, ListItem, ListItemIcon, Snackbar, TextField, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
const CustomInput = styled(TextField)(({ theme }) => ({
  border: "1px solid #232321", borderRadius: "10px", width: '100%',
  [theme.breakpoints.down("xl")]: {},
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.down("xs")]: {},
}));

function Addproduct() {
  const [productname, setProductname] = useState('');
  const [sku, setSku] = useState('')
  const [batchnumber, setBatchnumber] = useState('');
  const [images, setImages] = useState([]);
  const [countryorigin, setCountryorign] = useState('');
  const [inventory, setInventory] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [price, setPrice] = useState('');
  const [saleprice, setSaleprice] = useState('');
  const [brand, setBrand] = useState('');
  const [categories, setCategories] = useState('');
  const [productnameError, setProductnameError] = useState(false);
  const [skuError, setSkuError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [countryOriginError, setCountryOriginError] = useState(false);
  const [inventoryError, setInventoryError] = useState(false);
  const [brandError, setBrandError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  


  const handleProductname = (e) => {
    setProductname(e.target.value);
    setProductnameError(false);
  };
  const handleBatchnumber = (e) => {
    setBatchnumber(e.target.value);
  }
  const handleSku = (e) => {
    setSku(e.target.value);
    setSkuError(false);
  }
  const handleCountryorigin = (e) => {
    setCountryorign(e.target.value);
    setCountryOriginError(false);
  }
  const handleInventory = (e) => {
    setInventory(e.target.value);
    setInventoryError(false);
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
    setDescriptionError(false)
  }
  const handleTag = (e) => {
    setTag(e.target.value);
  }
  const handlePrice = (e) => {
    setPrice(e.target.value);
  }
  const handleSaleprice = (e) => {
    setSaleprice(e.target.value);
  }
  const handleBrandname = (e) => {
    setBrand(e.target.value);
    setBrandError(false);
  }
  const handleCategories = (e) => {
    setCategories(e.target.value);

  }
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImages(prevImages => [...prevImages, {
        id: 'image' + (prevImages.length + 1),
        imageData: reader.result
      }]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };



  const handlesubmit = async (e) => {
    e.preventDefault();
    
    console.log("image", images);
    const token = localStorage.getItem('bcToken');
    const userDataString = localStorage.getItem('bcUserData');
    const userData = JSON.parse(userDataString);
    const vendorId = userData.vendorId;
    console.log('vendorid',vendorId);
    const data = {
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
     vendorId: vendorId,
    };

    console.log("data", data)

    try {
      const response = await fetch(`http://localhost:9096/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),

      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      console.log('Product added successfully');
      setProductname('');
      setSku('');
      setBatchnumber('');
      setImages([]);
      setCountryorign('');
      setInventory('');
      setDescription('');
      setTag('');
      setPrice('');
      setSaleprice('');
      setBrand('');
      setCategories('');
      setOpenSnackbar(true);
      setProductnameError(false);
      setDescriptionError(false);
      setSkuError(false);
      setCountryOriginError(false);
      setInventoryError(false);
      setBrandError(false);
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error adding product:', error.message);
    }

    //validation section
    if (productname.trim() === '') {
      setProductnameError(true);
      return;
    }
    
    if (countryorigin.trim() === '') {
      setCountryOriginError(true);
      return;
    }
    if (description.trim() === '') {
      setDescriptionError(true);
      return;
    }
    if (sku.trim() === '') {
      setSkuError(true);
      return;
    }

    if (inventory.trim() === '') {
      setInventoryError(true);
      return;
    }

    if (brand.trim() === '') {
      setBrandError(true);
      return;
    }
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  return (
    <Box sx={{background:'#ffffff',  }}>
      <Box sx={{display: 'flex', flexDirection: 'column', margin: { sm: '3% 5%', xs: "4% 0% 0% -16%" }, padding: {md:'5% 5%', sm: '15% 3%', xs: '20% 3%' } }}  >
        <Box display="flex" gap="10px" justifyContent="space-between">
          <Box ><Typography sx={{ color: '#124BF2', fontWeight: 'bold', fontSize: {md:'20px', sm: '16px', xs: '16px' },textAlign:{xs:'left',} }}>ADD NEW PRODUCT </Typography></Box>
          <Box display="flex" gap="10px">
           {/**<Link to="/addproduct" style={{ backgroundColor: "#0D2768", color: "#ffffff", borderRadius: "10px", textDecoration: "none", fontSize: { sm: '10px', xs: '5px',md:'20px' } }}><ListItem sx={{fontSize: { sm: '20px', xs: '10px',md:'20px' }}}><ListItemIcon><AddCircleOutlineIcon sx={{ color: '#ffffff',fontSize: { sm: '20px', xs: '20px',md:'20px' } }} /></ListItemIcon>SINGLE PRODUCT UPLOAD</ListItem></Link> */} 
            <Link to="/bulkproduct" style={{ color: '#0C2262', border: '1px solid #0C2262', padding: '0px 10px', borderRadius: '10px', textDecoration: 'none'}}><ListItem ><ListItemIcon><AddCircleOutlineIcon sx={{ color: '#0C2262' }} /></ListItemIcon >BULK UPLOAD</ListItem></Link>
          </Box>
        </Box>
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Product Name</InputLabel>
        <CustomInput placeholder="Productname" value={productname} id="outlined-basic" variant="outlined" onChange={handleProductname} required error={productnameError} />
        {productnameError && formSubmitted && (<Typography variant="caption" sx={{ color: 'red', textAlign: 'left' }}> Please enter a product name.</Typography>)}
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Batch Number</InputLabel>
        <CustomInput placeholder="Batchnumber" value={batchnumber} id="standard-basic" variant="outlined" onChange={handleBatchnumber} />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Country Origin</InputLabel>
        <CustomInput placeholder="Country origin" value={countryorigin} id="standard-basic" variant="outlined" onChange={handleCountryorigin} required error={countryOriginError} />
        {countryOriginError && formSubmitted && (<Typography variant="caption" sx={{ color: 'red', textAlign: 'left' }}> Please enter a Country Origin.</Typography>)}
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Description</InputLabel>
        <CustomInput placeholder="Description" value={description} id="standard-basic" variant="outlined" onChange={handleDescription} required />
        {descriptionError && formSubmitted && (<Typography variant="caption" sx={{ color: 'red', textAlign: 'left' }}> Please enter a Description.</Typography>)}
        <Box display="flex" gap='10px'>
          <Box width='100%'><InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Sku</InputLabel>
            <CustomInput placeholder="Sku" value={sku} id="filled-basic" variant="outlined" onChange={handleSku} required error={skuError} />
            {skuError && formSubmitted && (<Typography variant="caption" sx={{ color: 'red', textAlign: 'left' }}> Please enter a product Sku.</Typography>)}</Box>
          <Box width='100%'>
            <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Inventory</InputLabel>
            <CustomInput placeholder="Inventory" value={inventory} type="text" id="standard-basic" variant="outlined" onChange={handleInventory} required error={inventoryError} />
            {inventoryError && formSubmitted && (<Typography variant="caption" sx={{ color: 'red', textAlign: 'left' }}> Please enter a product inventory.</Typography>)}
          </Box>
        </Box>
        <Box display="flex" gap="10px">
          <Box width='100%'>
            <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Price</InputLabel>
            <CustomInput placeholder="Price" value={price} type="text" id="standard-basic" variant="outlined" onChange={handlePrice} />
            
          </Box>
          <Box width='100%'>
            <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Sale Price</InputLabel>
            <CustomInput placeholder="Saleprice" value={saleprice} type="text" id="standard-basic" variant="outlined" onChange={handleSaleprice} /></Box>
        </Box>
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Tag</InputLabel>
        <CustomInput placeholder="Tag" value={tag} id="standard-basic" variant="outlined" onChange={handleTag} required />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Brand Name</InputLabel>
        <CustomInput placeholder="Brand name" value={brand} id="standard-basic" variant="outlined" onChange={handleBrandname} required error={brandError} />
        {brandError && formSubmitted && (<Typography variant="caption" sx={{ color: 'red', textAlign: 'left' }}> Please enter a Brand Name.</Typography>)}
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Categories</InputLabel>
        <CustomInput placeholder="Categories" value={categories} id="standard-basic" variant="outlined" onChange={handleCategories}  />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Image</InputLabel>
        <CustomInput type="file" multiple accept="image/*" id="standard-basic" variant="outlined" onChange={handleImage}  /><br />
        <Button variant="text" onClick={handlesubmit} sx={{
          color: '#fff', backgroundColor: '#124BF2', '&:hover': {
            color: '#fff', backgroundColor: '#124BF2',
          }
        }}>Update</Button>

      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}  // Centering the Snackbar
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Product added successfully!
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default Addproduct