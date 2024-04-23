import { Box, Checkbox, FormControlLabel, IconButton, Link, List, ListItem, ListItemIcon, Toolbar, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
//search bar start here
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
// search bar end here
function Editproduct() {
  const [productData, setProductData] = useState([]);
  console.log('produedrtftgyhjikl', productData)
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const token = localStorage.getItem('bcToken')
  let role = JSON.parse(localStorage.getItem('bcUserData'));
  const [searchInput, setSearchInput] = useState("");
  const userDataString = localStorage.getItem('bcUserData');
  const userData = JSON.parse(userDataString);
  const vendorId = userData.vendorId;
  console.log('vendorid',vendorId)
  console.log("data", productData)
  useEffect(() => {
    let data= {
      vendorId: vendorId
      
    }
    console.log("data",data )
    axios({
      method: 'GET',
      url: `http://localhost:9096/product`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },params: { vendorId },
    })
      .then((res) => {
        setProductData(res.data.products);
        console.log("res.data.",res.data)
        setDataFetched(true); // Update state to indicate data has been fetched
      }).catch((error) => {

      })


  }, [dataFetched, token]);
  const uniqueBrands = Array.from(new Set(productData.map(product => product.brand)));

  // Handle brand selection change
  const handleBrandChange = (event, value) => {
    setSelectedBrand(value);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:9096/product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response) {

        console.log('Product deleted successfully', response);
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  let data = {
    "products": [
      {
        "_id": "6621fcfbe7ee7e6d5d8384c0",
        "product": "Apples",
        "price": "1000",
        "sku": "MP10",
        "branchNumber": "MP18",
        "countryOfOrigin": "India",
        "inventory": "10",
        "description": "Debrox Earwax",
        "tag": "MP18",
        "brand": "Debrox Earwax",
        "category": "Debrox Earwax",
        "salesPrice": "999",
        "createdDate": "2024-04-19",
        "createdTime": "5:11:06 AM",
        "image": [
          {
            "imageData": "azazazaz",
            "id": "1711545349587",
            "_id": "6621fcfbe7ee7e6d5d8384c1"
          }
        ],
        "tracking": [
          {
            "productAt": "Us Warehouse",
            "date": "2024-04-19",
            "time": "5:11:06 AM",
            "complete": true,
            "_id": "6621fcfbe7ee7e6d5d8384c2"
          },
          {
            "productAt": "Medorna Office",
            "date": "2024-04-22",
            "time": "12:39:37 pm",
            "complete": true,
            "_id": "6621fcfbe7ee7e6d5d8384c3"
          },
          {
            "productAt": "IGO Office",
            "date": "",
            "time": "",
            "complete": false,
            "_id": "6621fcfbe7ee7e6d5d8384c4"
          },
          {
            "productAt": "Amazon Office",
            "date": "",
            "time": "",
            "complete": false,
            "_id": "6621fcfbe7ee7e6d5d8384c5"
          }
        ],
        "id": "apples",
        "plot_embedding_hf": [],
        "vendorId": "31b139eb-66e4-49c3-ba71-ab9affb502dd",
        "qr": [
          "429130e1-6fb6-4506-bc64-7c433e310575",
          "3142b3b6-1998-4708-b247-1a0b6b7edb40",
          "c3c2dc3e-4052-41be-b497-b0aec75dcc5c",
          "8e56423e-7918-4ac1-a788-27adf9287399",
          "8d54c97b-e2ae-4be7-b31c-918fe7a5bbd7",
          "4f6406d5-cec7-4143-a0cc-a5be54094d4c",
          "50a68801-9f65-4a69-ae15-56b1fb746b15",
          "1053fcbd-5ca2-4ee4-b225-806acf0fbf29",
          "e9a3aa87-9db8-4ce4-8c03-448beaf165f6",
          "1f2c3e8b-f984-49db-850c-046ed2551114"
        ],
        "__v": 0
      }
    ],
    "totalCount": 1
  }
  
  return (
    <> {/* desktop view code start here */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', padding: { sx: '5% 0%', xs: '8% 0%',lg:'6% 0%' }, margin: { sx: '0% 0% 0% 10%', xs: '0% 0% 0% 0%' } }}>
          <Box sx={{ backgroundColor: '#124BF2', width: '100%', display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Toolbar>
                <Checkbox sx={{ color: '#ffffff' }} />
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </Search>
                <DeleteIcon sx={{ color: '#ffffff', padding: '0px 10px', fontSize: '2.5rem' }} />
                <Typography sx={{ color: '#ffffff', padding: '0px 5%' }}>Total products: {productData.length}</Typography>
                <Autocomplete
                  id="grouped-demo1"
                  options={uniqueBrands}
                  getOptionLabel={(option) => option}
                  onChange={handleBrandChange}
                  sx={{
                    color: '#ffffff', // Change the text color of the label
                    width: 200,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ffffff", // customize border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#ffffff", // customize border color on hover
                      },
                      "& input": {
                        color: "#ffffff", // customize text color
                      }
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label="Select brand" InputLabelProps={{ style: { color: '#ffffff' } }} />}
                />
              </Toolbar>
            </Box>
          </Box>
          <Box>
            {data.products
              .filter(product => selectedBrand === null || product.brand === selectedBrand)
              .map((product, index) => (
                <Box key={index} id="full-width-box" sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                  <FormControlLabel
                    control={
                      <Checkbox />
                    }
                  />
                  <Box sx={{ border: '1px solid #95AAAD36', display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                    <Box id="main-box-edit" sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', textAlign: 'left' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '10x', width: '20%', border: '1px solid #95AAAD36', textAlign: "left" }}>

                        {product?.image.map((image) => (
                          <Box sx={{ textAlign: "left", padding: '10px 20px', justifyContent: 'space-between' }}><img style={{ width: '100px' }} src={image?.imageData} alt="Product" /></Box>
                        ))}
                        <Box sx={{ textAlign: "left", padding: '10px 20px', justifyContent: 'space-between' }} ></Box>
                      </Box>
                      <Box sx={{ width: '30%', borderRight: '1px solid #95AAAD36', padding: '10px 20px', justifyContent: 'space-between' }}>
                        <Typography sx={{ textAlign: "left", fontWeight: 'bold' }}>{product.product}</Typography>
                        <Typography>SKU: {product.sku}</Typography>
                        <Typography>Category: {product.category}</Typography>
                        <Typography>Tag: {product.tag}</Typography>
                      </Box>
                      <Box sx={{ width: '30%', borderRight: '1px solid #95AAAD36', padding: '10px 20px', justifyContent: 'sspace-between' }}>
                        <Typography sx={{ color: '#F3941E' }}>Price: ${product.price}</Typography>
                        <Typography>Sales Price: ${product.salesPrice}</Typography>
                        <Typography>Inventory: {product.inventory}</Typography>
                      </Box>
                      <Box sx={{ width: '30%', padding: '10px 20px', justifyContent: 'space-between' }}> <Typography>Branch Number: {product.branchNumber}</Typography>
                        <Typography>Country of Origin: {product.countryOfOrigin}</Typography>
                        <Typography>Brand: {product.brand}</Typography>
                        <Typography>Description: {product.description}</Typography>
                      </Box>
                      <Box sx={{ width: '10%', borderRight: '1px solid #95AAAD36', padding: '10px 20px', backgroundColor: '#124BF2', WebkitBorderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', justifyContent: 'space-between' }}>
                        <ListItem >
                          <ListItemIcon>
                            <Link href={`productpage/${product._id}`}>
                              <VisibilityIcon sx={{ color: '#ffffff' }} />
                            </Link>
                          </ListItemIcon>
                        </ListItem>
                        <ListItem>
                          {role.role !== 'Medorna Office' && role.role !== 'IGO Office' && role.role !== 'Amazon Office' && (
                            <ListItemIcon>
                              <Link href={`edit/${product._id}`}>
                                <BorderColorIcon sx={{ color: '#ffffff' }} />
                              </Link>
                            </ListItemIcon>
                          )}
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <Box>
                              {role.role !== 'Medorna Office' && role.role !== 'IGO Office' && role.role !== 'Amazon Office' && (
                                <IconButton onClick={() => handleDelete(product._id)}>
                                  <DeleteIcon sx={{ color: '#ffffff' }} />
                                </IconButton>
                              )}
                            </Box>
                          </ListItemIcon>
                        </ListItem>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>
      {/*desktop view code end  here */}
      {/*mobile view start code here */}
      <Box sx={{ display: { xs: 'block', sm: 'none' },padding:'0px',}}>
      <Box class="edit-page-top" sx={{display: 'flex'}}>
      <Box class="edit-page-header">
      <Toolbar>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Search>
        <DeleteIcon sx={{ color: '#ffffff', padding: '0px 10px', fontSize: '2.5rem' }} />
        <Typography sx={{ color: '#ffffff', padding: '0px 5%' }}>Total products: {productData.length}</Typography>
      </Toolbar>
      
    </Box>
          </Box>
  {data.products
    .filter(product => selectedBrand === null || product.brand === selectedBrand)
    .map((product, index) => (
      <Box key={index} id="full-width-box" sx={{ display: 'flex', flexDirection: 'column', width: '100%' ,margin:'1% 0% 0% -14%',width:'110%' ,borderBottom:'2px solid black'}}>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%', textAlign: 'justify' }}>
          <Typography sx={{ fontWeight: 'bold' }}>{product.product}</Typography>
          {product?.image.map((image, imageIndex) => (
            <img key={imageIndex} style={{ width: '100px' }} src={image?.imageData} alt="Product" />
          ))}
          <Typography>SKU: {product.sku}</Typography>
          <Typography>Category: {product.category}</Typography>
          <Typography>Tag: {product.tag}</Typography>
          <Typography sx={{ color: '#F3941E' }}>Price: ${product.price}</Typography>
          <Typography>Sales Price: ${product.salesPrice}</Typography>
          <Typography>Inventory: {product.inventory}</Typography>
          <Typography>Branch Number: {product.branchNumber}</Typography>
          <Typography>Country of Origin: {product.countryOfOrigin}</Typography>
          <Typography>Brand: {product.brand}</Typography>
          <Typography>Description: {product.description}</Typography>
        </Box>
        <ListItem>
          <ListItemIcon>
            <Link href={`productpage/${product._id}`}>
              <VisibilityIcon sx={{ color: 'red' }} />
            </Link>
          </ListItemIcon>
          {role.role !== 'Medorna Office' && role.role !== 'IGO Office' && role.role !== 'Amazon Office' && (
            <ListItemIcon>
              <Link href={`edit/${product._id}`}>
                <BorderColorIcon sx={{ color: 'red' }} />
              </Link>
            </ListItemIcon>
          )}
          {role.role !== 'Medorna Office' && role.role !== 'IGO Office' && role.role !== 'Amazon Office' && (
            <ListItemIcon>
              <IconButton onClick={() => handleDelete(product._id)}>
                <DeleteIcon sx={{ color: 'red' }} />
              </IconButton>
            </ListItemIcon>
          )}
        </ListItem>
      </Box>
    ))}
</Box>
      {/*mobile view end here */}
    </>

  );
}

export default Editproduct;