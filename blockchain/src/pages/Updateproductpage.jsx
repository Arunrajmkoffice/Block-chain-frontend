import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, InputLabel, ListItem, ListItemIcon, TextField,Typography,styled } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from 'react-router-dom';
import axios from 'axios';
const CustomInput = styled(TextField)(({ theme }) => ({
  border:"1px solid #232321", borderRadius:"10px",width:'100%',
  [theme.breakpoints.down("xl")]: {},
  [theme.breakpoints.down("lg")]: {},
  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.down("sm")]: {},
  [theme.breakpoints.down("xs")]: {},
}));

function Updateproductpage() {
  const { id } = useParams();
  let token = localStorage.getItem('bcToken')
  const [productname, setProductname]=useState('');
  const [sku, setSku]=useState('');
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


useEffect(()=>{
    const fetchData = async ()=>{
        try{
            const response =await fetch(`http://52.66.194.234:9094/product/${id}`,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log('Data type:', typeof data); 
            console.log('get data', data);
            setProductname(data?.product?.product);
            setSku(data?.product?.sku);
            setBatchnumber(data?.product?.branchNumber);
            setCountryorign(data?.product?.countryOfOrigin);
            setDescription(data?.product?.description);
            setSku(data?.product?.sku);
            setInventory(data?.product?.inventory);
            setPrice(data?.product?.price);
            setSaleprice(data?.product?.salesPrice);
            setTag(data?.product?.tag);
            setBrand(data?.product?.brand);
            setCategories(data?.product?.category);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();

},[]);
const handleProductname=(e)=>{
  setProductname(e.target.value)
  
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
  
  
  const handlesubmit =  (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('bcToken');
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
    };
    
    // try {
    //   const response = await fetch(`http://52.66.194.234:9094/product/${id}`,productData {
    //     method: 'PATCH',
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   });

    //   if (response) {
       
    //     console.log('Product deleted successfully',response);
    //   } else {
    //     console.error('Failed to delete product');
    //   }
    // } catch (error) {
    //   console.error('Error deleting product:', error);
    // }


    axios({
      method:'PATCH',
      url:`http://52.66.194.234:9094/product/edit/${id}`,
      data,
      headers: {
              'Authorization': `Bearer ${token}`
             }
    })
    .then((res)=>{
       console.log("res",res.data)
    })
    .catch((error)=>{

    })
   
  }
  return (
  <>
    <Box sx={{display:'flex',flexDirection:'column', margin:{sm:'0% 10%',xs:"0% 0% 0% -16%"},padding:{sm:'8% 0%',xs:'15% 3%'}}}  >
      <Box display="flex" gap="10px" justifyContent="space-between">
        <Box ><Typography sx={{color:'#124BF2',fontWeight:'bold',fontSize:'20px'}}>EDIT PRODUCT </Typography></Box>
        <Box display="flex" gap="20px">
          <Link to="/addproduct" style={{backgroundColor:"#0D2768" ,color:"#ffffff", borderRadius:"10px", textDecoration:"none" }}><ListItem><ListItemIcon><AddCircleOutlineIcon sx={{color:'#ffffff'}}/></ListItemIcon>SINGLE PRODUCT UPLOAD</ListItem></Link>
          <Link to="/bulkproduct" style={{color:'#0C2262', border:'1px solid #0C2262',padding:'0px 10px', borderRadius:'10px', textDecoration:'none'}}><ListItem><ListItemIcon><AddCircleOutlineIcon sx={{color:'#0C2262'}} /></ListItemIcon >BULK UPLOAD</ListItem></Link>
        </Box>
      </Box>
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Product Name</InputLabel>
    <CustomInput placeholder="Productname" value={productname} id="outlined-basic"  variant="outlined" onChange={handleProductname}   required />
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Batch Number</InputLabel>
    <CustomInput placeholder="Batchnumber" value={batchnumber}  id="standard-basic"  variant="outlined" onChange={handleBatchnumber} />
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Country Origin</InputLabel>
    <CustomInput placeholder="Country origin" value={countryorigin} id="standard-basic"  variant="outlined" onChange={handleCountryorigin} />
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Description</InputLabel>
    <CustomInput placeholder="Description" value={description} id="standard-basic"  variant="outlined" onChange={handleDescription} />
    <Box display="flex" gap='10px'>
      <Box width='100%'><InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Sku</InputLabel>
    <CustomInput placeholder="Sku" value={sku} id="filled-basic" variant="outlined" onChange={handleSku} /></Box>
      <Box width='100%'>
      <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Inventory</InputLabel>
    <CustomInput placeholder="Inventory" value={inventory} type="text" id="standard-basic"  variant="outlined"  onChange={handleInventory}/>
      </Box>
    </Box>
    <Box display="flex" gap="10px">
      <Box width='100%'>
        <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Price</InputLabel>
        <CustomInput placeholder="Price" value={price} type="text" id="standard-basic"  variant="outlined" onChange={handlePrice} /></Box>
      <Box width='100%'>
        <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Sale Price</InputLabel>
        <CustomInput placeholder="Saleprice" value={saleprice} type="text" id="standard-basic"  variant="outlined" onChange={handleSaleprice} /></Box>
    </Box>
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Tag</InputLabel>
    <CustomInput placeholder="Tag" value={tag} id="standard-basic"  variant="outlined" onChange={handleTag} />
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Brand Name</InputLabel>
    <CustomInput placeholder="Brand name" value={brand} id="standard-basic"  variant="outlined" onChange={handleBrandname} />
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Categories</InputLabel>
    <CustomInput placeholder="Categories"  value={categories} id="standard-basic"  variant="outlined" onChange={handleCategories} />
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Image</InputLabel>
    <CustomInput type="file" multiple id="standard-basic" variant="outlined" onChange={handleImages} /><br />
    
    <Button variant="text" onClick={handlesubmit} sx={{color:'#fff', backgroundColor:'#124BF2', '&:hover':{
      color:'#fff', backgroundColor:'#124BF2',
    }}}>Update</Button>
    <br/><br/>
    </Box>
    
    </>
  );
}

export default Updateproductpage;
