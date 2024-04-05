import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

// Search bar start here
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
// Search bar end here

export default function Grouped() {
  const [productData, setProductData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const token = localStorage.getItem('bcToken');

  useEffect(() => {
    if (!dataFetched) {
      axios({
        method: 'GET',
        url: 'http://52.66.194.234:9094/product',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        setProductData(res.data.products);
        setDataFetched(true); // Update state to indicate data has been fetched
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
    }
  }, [dataFetched, token]);

  // Filter out duplicate brand names
  const uniqueBrands = Array.from(new Set(productData.map(product => product.brand)));

  // Handle brand selection change
  const handleBrandChange = (event, value) => {
    setSelectedBrand(value);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', padding: { sx: '5% 0%', xs: '6% 0%' }, margin: { sx: '0% 0% 0% 10%', xs: '0% 0% 0% 0%' } }}>
        <Box sx={{ backgroundColor: '#124BF2', width: '100%' }}>
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
                />
              </Search>
              <DeleteIcon sx={{ color: '#ffffff', padding: '0px 10px', fontSize: '2.5rem' }} />
              <Typography sx={{ color: '#ffffff', padding: '0px 5%' }}>Total products: {productData.totalCount}</Typography>
            </Toolbar>
          </Box>
        </Box>
        <Box>
          <Autocomplete
            id="grouped-demo"
            options={uniqueBrands}
            getOptionLabel={(option) => option}
            onChange={handleBrandChange}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select brand" />}
          />
          <Box>
            <h3>Products for {selectedBrand || 'All Brands'}</h3>
            <ul>
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
                          {product.image.map((image, imageIndex) => (
                            <Box key={imageIndex} sx={{ textAlign: "left", padding: '10px 20px', justifyContent: 'space-between' }}>
                              <img style={{ width: '100px' }} src={image?.imageData} alt="Product" />
                            </Box>
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
                        <Box sx={{ width: '30%', padding: '10px 20px', justifyContent: 'space-between' }}>
                          <Typography>Branch Number: {product.branchNumber}</Typography>
                          <Typography>Country of Origin: {product.countryOfOrigin}</Typography>
                          <Typography>Description: {product.description}</Typography>
                          <Typography>Brand: {product.brand}</Typography>
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
                            {/* Add your edit link here */}
                          </ListItem>
                          <ListItem>
                            {/* Add your delete button here */}
                          </ListItem>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
            </ul>
          </Box>
        </Box>
      </Box>
    </>
  );
}
