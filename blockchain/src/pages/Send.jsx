import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, InputLabel, TextField, Typography, styled, Snackbar, Alert } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export default function Send() {
  const CustomInput = styled(TextField)(({ theme }) => ({
    border: "1px solid #232321", borderRadius: "10px", width: '100%',
    [theme.breakpoints.down("xl")]: {},
    [theme.breakpoints.down("lg")]: {},
    [theme.breakpoints.down("md")]: {},
    [theme.breakpoints.down("sm")]: {},
    [theme.breakpoints.down("xs")]: {},
  }));
  const token = localStorage.getItem('bcToken')
  const userDataString = localStorage.getItem('bcUserData');
  const userData = JSON.parse(userDataString);
  const vendorId = userData.vendorId;
  let role = JSON.parse(localStorage.getItem('bcUserData'));
  const [productdata, setProductdata] = useState([]);
  const [productname, setProductname] = useState("");
  const [batchnumber, setBatchnumber] = useState("");
  const [countryorigin, setCountryorigin] = useState("");
  const [description, setDescription] = useState("");
  const [sku, setSku] = useState("");
  const [inventory, setInventory] = useState('');
  const [price, setPrice] = useState('');
  const [saleprice, setSaleprice] = useState('');
  const [tag, setTag] = useState('');
  const [brandname, setBrandname] = useState('');
  const [categories, setCategories] = useState('');
  const [images, setImages] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleproductname = (e) => {

    setProductname(e.target.value)
  }
  const handlebatchnumber = (e) => {
    console.log("ee", e.target.value)
    // setBatchnumber(e.target.value);
  }
  const handlecountryorigin = (e) => {
    setCountryorigin(e.traget.value);
  }
  const handledescription = (e) => {
    setDescription(e.target.value);
  }
  const handlesku = (e) => {
    setSku(e.target.value);
  }
  const handleinventory = (e) => {
    setInventory(e.target.value);
  }
  const handleprice = (e) => {
    setPrice(e.target.value);
  }
  const handlesaleprice = (e) => {
    setSaleprice(e.target.value);
  }
  const handletag = (e) => {
    setTag(e.target.value);
  }
  const handlebrandname = (e) => {
    setBrandname(e.target.value);
  }
  const handlecategories = (e) => {
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

  const handlesubmit = (e) => {
    e.preventDefault();

    const data = {
      product: productname.trim(),
      branchNumber: batchnumber.trim(),
      sku: sku.trim(),
      countryOfOrigin: countryorigin.trim(),
      inventory: inventory.trim(),
      description: description.trim(),
      tag: tag.trim(),
      price: price.trim(),
      brand: brandname.trim(),
      category: categories.trim(),
      salesPrice: saleprice.trim(),
      image: images,
      vendorId: vendorId,
    };

    console.log("data", data);


    axios({
      method: 'POST',
      url: 'http://localhost:9096/product',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data: JSON.stringify(data),
    })
      .then((res) => {
        console.log("res", res)
        setOpenSnackbar(true)
        
      })
      .catch((error) => {

      })


  };
  useEffect(() => {
    
    axios({
      method: 'GET',
      url: 'http://localhost:9096/product/unique/one',
      params:{
        vendorId:vendorId, 
        role:role.role
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((res) => {
        setProductdata(res?.data.uniqueProduct)
        console.log("<---setproduct--->", res.data.uniqueProduct)
      })
      .catch((err) => { })
  }, [])
  const handleCloseSnackbar = (event, reason)=>{
    if(reason === 'clickaway'){
      return;
    }
    setOpenSnackbar(false);
  };



  return (
    <Box sx={{ background: '#ffffff', }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', margin: { sm: '3% 5%', xs: "4% 0% 0% -16%" }, padding: { md: '5% 5%', sm: '15% 3%', xs: '20% 3%' } }}  >
        <Box display="flex" gap="10px" justifyContent="space-between">
          <Box><Typography sx={{ color: '#124BF2', fontWeight: 'bold', fontSize: { md: '20px', sm: '16px', xs: '16px' }, textAlign: { xs: 'left', } }}>Stock Update </Typography></Box>
        </Box>
        <Autocomplete
          options={productdata?.map((item) => ({ label: item.product, value: item }))}
          getOptionLabel={(option) => option.label}
          onChange={(event, newValue) => {
            if (newValue) {
              setProductname(newValue.value.product);
              setBatchnumber(newValue.value.branchNumber);
              setCountryorigin(newValue.value.countryOfOrigin);
              setDescription(newValue.value.description);
              setSku(newValue.value.sku);
              setInventory(newValue.value.inventory);
              setPrice(newValue.value.price);
              setSaleprice(newValue.value.salesPrice);
              setTag(newValue.value.tag);
              setBrandname(newValue.value.brand);
              setCategories(newValue.value.category);
              setImages(newValue.value.image);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Product" />}
        />

        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Product Name</InputLabel>
        <CustomInput value={productname} onChange={handleproductname} placeholder='search product' />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Batch Number</InputLabel>
        <CustomInput value={batchnumber} onChange={handlebatchnumber} placeholder="Batch Number" />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Country Origin</InputLabel>
        <CustomInput value={countryorigin} onChange={handlecountryorigin} placeholder='country origin' />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Description</InputLabel>
        <CustomInput value={description} onChange={handledescription} placeholder='Description' />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Sku</InputLabel>
        <CustomInput value={sku} onChange={handlesku} placeholder='Sku' />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Inventory</InputLabel>
        <CustomInput value={inventory} onChange={handleinventory} placeholder='Price' />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Price</InputLabel>
        <CustomInput value={price} onChange={handleprice} placeholder='Sale Price' />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Sale Price</InputLabel>
        <CustomInput value={saleprice} onChange={handlesaleprice} placeholder='sale price' />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}> Tag</InputLabel>
        <CustomInput value={tag} onChange={handletag} placeholder='Tag' />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>name Name</InputLabel>
        <CustomInput value={brandname} onChange={handlebrandname} placeholder='Brand Name' />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Categories</InputLabel>
        <CustomInput value={categories} onChange={handlecategories} placeholder='Categories' />
        <InputLabel sx={{ textAlign: 'left', padding: '10px 0px', color: '#080F21', fontWeight: 'bold' }}>Image</InputLabel>
        <CustomInput type="file" multiple accept="image/*" id="standard-basic" variant="outlined" onChange={handleImage} /><br></br>
        <Box display="flex" flexDirection="row" gap={1}>
          {images.map((image, index) => (
            <Box key={index} sx={{ width: '100px', height: '100px' }}>
              <img src={image.imageData} alt={`Image ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
          ))}
        </Box><br></br>
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
  );
}




