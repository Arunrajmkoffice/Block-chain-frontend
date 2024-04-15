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
  backgroundColor: "white",
  '&:hover': {
    backgroundColor: "white",
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
    // vertical padding + font size from searchIcon
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
  console.log('produ', productData)
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  let token = localStorage.getItem('bcToken')
  let role = JSON.parse(localStorage.getItem('bcUserData'));
  const [searchInput, setSearchInput] = useState("");
  console.log("data", productData)
  useEffect(() => {
    axios({
      method: 'GET',
      url: "http://52.66.194.234:9095/product",
      headers: {
        'Authorization': `Bearer ${token}`
      }, params: {
        limit: 100,
        page: 1,
        sortBy: 'createdDate',
        sortOrder: "desc",
        /*search:searchInput,*/

      }
    })
      .then((res) => {
        setProductData(res.data.products);
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
      const response = await fetch(`http://52.66.194.234:9095/product/${productId}`, {
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
            {productData
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
      <Box sx={{ display: { xs: 'block', sm: 'none' },padding:'0px' }}>
      <Box sx={{ backgroundColor: '#124BF2', width: '100%', display: 'flex', margin:'13% 0% 0% -14%',width:'110%'}}>
            <Box sx={{ flexGrow: 1 }}>
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
  {productData
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
