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
  const [productnameError, setProductnameError] = useState(false);
  const [batchNumberError, setBatchnumberError] = useState(false);
  const [skuError, setSkuError] = useState(false);
  const [countryOriginError, setCountryOriginError]= useState(false);
  const [inventoryError, setInventoryError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [brandError, setBrandError] = useState(false);
  const [CategoriesError, setCategoriesError] = useState(false);

  const handleProductname=(e)=>{
    setProductname(e.target.value);
    setProductnameError(false);
  };
  const handleBatchnumber=(e)=>{
    setBatchnumber(e.target.value);
    setBatchnumberError(false);
  }
  const handleSku=(e)=>{
    setSku(e.target.value);
    setSkuError(false);
  }
  const handleCountryorigin=(e)=>{
    setCountryorign(e.target.value);
    setCountryOriginError(false);
  }
  const handleInventory=(e)=>{
    setInventory(e.target.value);
    setInventoryError(false);
  }
  const handleDescription=(e)=>{
    setDescription(e.target.value)
  }
  const handleTag=(e)=>{
    setTag(e.target.value);
  }
  const handlePrice=(e)=>{
    setPrice(e.target.value);
    setPriceError(false);
  }
  const handleSaleprice=(e)=>{
    setSaleprice(e.target.value)
  }
  const handleBrandname=(e)=>{
    setBrand(e.target.value);
    setBrandError(false);
  }
  const handleCategories=(e)=>{
    setCategories(e.target.value);
    setCategoriesError('false');
  }
  const handleImages = (e) => {
    const files = e.target.files;
    const imagesArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        imagesArray.push({
          id: Date.now() + i, // Generate a unique id for each image
          //imagedata: reader.result // The base64 representation of the image
          //imagedata: reader.result // The base64 representation of the image
          imagedata:"azazazaz"
          
        });
        setImages([...imagesArray]);
      };
    }
    
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
    console.log("data",productData)
  
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

    //validation section
    if (productname.trim() === '') {
      setProductnameError(true);
      return;
    }
    if (batchnumber.trim() ==='') {
      setBatchnumberError(true);
      return;
    }
    if (countryorigin.trim() === '') {
      setCountryOriginError(true);
      return;
    }
    if (sku.trim() ==='') {
      setSkuError(true);
      return;
    }
    
    if (inventory.trim()==='') {
      setInventoryError(true);
      return;
    }
    if (price.trim()==='') {
      setPriceError(true);
      return;
    }
    if (brand.trim() ==='') {
      setBrandError(true);
      return;
    }
    if (categories.trim()==='') {
      setCategoriesError(true);
      return;
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
    <CustomInput placeholder="Productname" value={productname} id="outlined-basic"  variant="outlined" onChange={handleProductname}  required error={productnameError} />
    {productnameError && ( <Typography variant="caption" sx={{ color: 'red', textAlign:'left'}}> Please enter a product name.</Typography>)}
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Batch Number</InputLabel>
    <CustomInput placeholder="Batchnumber" value={batchnumber}  id="standard-basic"  variant="outlined" onChange={handleBatchnumber} required error={batchNumberError} />
    {batchNumberError && (<Typography variant="caption" sx={{ color: 'red', textAlign:'left' }}>Please enter a product Batch Number.</Typography>)}
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Country Origin</InputLabel>
    <CustomInput placeholder="Country origin" value={countryorigin} id="standard-basic"  variant="outlined" onChange={handleCountryorigin} required error={countryOriginError}/>
    {countryOriginError && (<Typography variant="caption" sx={{ color: 'red', textAlign:'left'}}> Please enter a Country Origin.</Typography>)}
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Description</InputLabel>
    <CustomInput placeholder="Description" value={description} id="standard-basic"  variant="outlined" onChange={handleDescription}required  />
    <Box display="flex" gap='10px'>
      <Box width='100%'><InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Sku</InputLabel>
    <CustomInput placeholder="Sku" value={sku} id="filled-basic" variant="outlined" onChange={handleSku} required error={skuError} />
    {skuError && (<Typography variant="caption" sx={{ color: 'red', textAlign:'left' }}> Please enter a product Sku.</Typography>)}</Box>
      <Box width='100%'>
      <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Inventory</InputLabel>
    <CustomInput placeholder="Inventory" value={inventory} type="text" id="standard-basic"  variant="outlined"  onChange={handleInventory} required error={inventoryError} />
    {inventoryError && (<Typography variant="caption" sx={{ color: 'red', textAlign:'left' }}> Please enter a product inventory.</Typography>)}
      </Box>
    </Box>
    <Box display="flex" gap="10px">
      <Box width='100%'>
        <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Price</InputLabel>
        <CustomInput placeholder="Price" value={price} type="text" id="standard-basic"  variant="outlined" onChange={handlePrice} required error={priceError} />
        {priceError && (<Typography variant="caption" sx={{ color: 'red', textAlign:'left' }}> Please enter a product price(Number only).</Typography>)}
        </Box>
      <Box width='100%'>
        <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Sale Price</InputLabel>
        <CustomInput placeholder="Saleprice" value={saleprice} type="text" id="standard-basic"  variant="outlined" onChange={handleSaleprice} required  /></Box>
    </Box>
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Tag</InputLabel>
    <CustomInput placeholder="Tag" value={tag} id="standard-basic"  variant="outlined" onChange={handleTag} required  />
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Brand Name</InputLabel>
    <CustomInput placeholder="Brand name" value={brand} id="standard-basic"  variant="outlined" onChange={handleBrandname} required error={brandError} />
    {brandError && (<Typography variant="caption" sx={{ color: 'red' , textAlign:'left'}}> Please enter a Brand Name.</Typography>)}
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Categories</InputLabel>
    <CustomInput placeholder="Categories"  value={categories} id="standard-basic"  variant="outlined" onChange={handleCategories} required error={CategoriesError} />
    {CategoriesError && (<Typography variant="caption" sx={{ color: 'red', textAlign:'left' }}> Please enter a product categories.</Typography>)}
    <InputLabel sx={{textAlign:'left', padding:'10px 0px',color:'#080F21',fontWeight:'bold'}}>Image</InputLabel>
    <CustomInput type="file" multiple id="standard-basic" variant="outlined" onChange={handleImages} required  /><br />
    
    <Button variant="text" onClick={handlesubmit} sx={{color:'#fff', backgroundColor:'#124BF2', '&:hover':{
      color:'#fff', backgroundColor:'#124BF2',
    }}}>Update</Button>
    {images.map((image) => (
        <div key={image.id}>
          <img src={image.imagedata} alt={`Image ${image.id}`} />
          <p>ID: {image.id}</p>
          {/* You can include additional information here if needed */}
        </div>
      ))}
    <br/><br/>
    </Box>
  )
}

export default Addproduct