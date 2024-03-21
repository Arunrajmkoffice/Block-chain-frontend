import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, InputLabel, ListItem, ListItemIcon, TextField,Typography,styled } from '@mui/material'
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

function Updateproductpage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  let token = localStorage.getItem('bcToken')
  const [productname, setProductname]=useState('');
  const [errorProductname, setErrorProductname]=useState('');
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
            const response =await fetch(`https://wide-eyed-pear-meerkat.cyclic.app/product/${id}`,{
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
    const value=e.target.value;
    const isValid = /^[a-zA-Z0-9\s]*$/.test(value);
    if (isValid || value === ''){
      setProductname(value);
      setErrorProductname('');
    }else{
      setErrorProductname('please enter only alphanumeric character')
    }
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
  

  };

  return (
  <>
    <Box>
      <h1>Products</h1>
  
        <div key={products._id}>
          <h3>{products?.product?.brand}</h3>
        </div>
    </Box>
    <Box sx={{display:'flex',flexDirection:'column', margin:'0px 10%'}}  >
      <Box display="flex" gap="10px" justifyContent="space-between">
        <Box ><Typography sx={{color:'#124BF2',fontWeight:'bold',fontSize:'20px'}}>EDIT PRODUCT </Typography></Box>
        <Box display="flex" gap="20px">
          <Link to="/addproduct" style={{backgroundColor:"#0D2768" ,color:"#ffffff", borderRadius:"10px", textDecoration:"none" }}><ListItem><ListItemIcon><AddCircleOutlineIcon sx={{color:'#ffffff'}}/></ListItemIcon>SINGLE PRODUCT UPLOAD</ListItem></Link>
          <Link to="/bulkproduct" style={{color:'#0C2262', border:'1px solid #0C2262',padding:'0px 10px', borderRadius:'10px', textDecoration:'none'}}><ListItem><ListItemIcon><AddCircleOutlineIcon sx={{color:'#0C2262'}} /></ListItemIcon >BULK UPLOAD</ListItem></Link>
        </Box>
      </Box>
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Product Name</InputLabel>
    <CustomInput placeholder="Productname" value={productname} id="outlined-basic"  variant="outlined" onChange={handleProductname} error={Boolean(errorProductname)} helperText={errorProductname}  required />
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
        <CustomInput placeholder="Price" value={products?.product?.price} type="text" id="standard-basic"  variant="outlined" onChange={handlePrice} /></Box>
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
