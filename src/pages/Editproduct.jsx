import { AppBar, Box, Checkbox, FormControlLabel, IconButton, Link, List, ListItem, ListItemIcon, Toolbar, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
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
  let token = localStorage.getItem('bcToken')
  let role = JSON.parse(localStorage.getItem('bcUserData'));
  console.log("data", productData)
  useEffect(() => {
    // const fetchData = async () => {

    //   try {
    //     const response = await fetch('http://52.66.194.234:9093/product', {
    //       headers: {
    //         'Authorization': `Bearer ${token}`
    //       },data:{
    //         limit:100,
    //         page:1
    //       }
    //     });
    //     const data = await response.json();
    //     console.log('Data type:', typeof data); 
    //     console.log('get data', data);
    //     setProductData(data);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    // fetchData();



    axios({
      method: 'GET',
      url: "http://52.66.194.234:9093/product",
      headers: {
        'Authorization': `Bearer ${token}`
      }, params: {
        limit: 100,
        page: 1
      }
    })
      .then((res) => {
        setProductData(res.data);
      }).catch((error) => {

      })






  }, []);






  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://52.66.194.234:9093/product/${productId}`, {
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


  return (<>
    <Box sx={{ margin: '0px', display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', padding: '5% 0%' }}>
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
            <DeleteIcon sx={{ color: '#ffffff', padding: '0px 10px' }} />
            <Typography sx={{ color: '#ffffff', padding: '0px 5%' }}>Total products:</Typography>
          </Toolbar>

        </Box>
      </Box>
      <Box>
      {productData?.products?.map((product, index) => (
        <Box id="full-width-box" sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }} key={index}>
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
                <Box sx={{ textAlign: "left", padding: '10px 20px', justifyContent: 'space-between' }} ><Typography sx={{ textAlign: "left" }}>{product.product}</Typography></Box>
              </Box>
              <Box sx={{ width: '30%', borderRight: '1px solid #95AAAD36', padding: '10px 20px', justifyContent: 'space-between' }}><Typography>SKU: {product.sku}</Typography>
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
                  {role.role !== 'Medorna Office' && role.role !== 'IGO Office' && role.role !== 'Amazone Office' && (
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
                      {role.role !== 'Medorna Office' && role.role !== 'IGO Office' && role.role !== 'Amazone Office' && (
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
  </>

  );
}

export default Editproduct;
