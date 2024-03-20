import { AppBar, Box, Checkbox, FormControlLabel, ListItem, ListItemIcon, Toolbar, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
// Search bar end here

function Editproduct() {
  const [productData, setProductData] = useState([]);
  let token = localStorage.getItem('bcToken')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://wide-eyed-pear-meerkat.cyclic.app/product', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        console.log('Data type:', typeof data); 
        console.log('get data', data);
        setProductData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`https://wide-eyed-pear-meerkat.cyclic.app/product/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Remove the deleted product from state
        setProductData(productData.filter(product => product.id !== productId));
        console.log('Product deleted successfully');
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <>
      <Box sx={{ margin:'0px', display:'flex', flexDirection:'column', gap:'20px', width:'100%' }}>
        <Box sx={{ backgroundColor:'#124BF2', width:'100%' }}>
          <Box sx={{ flexGrow: 1 }}>
            <Toolbar>
              <Checkbox  sx={{color:'#ffffff'}}/>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <DeleteIcon sx={{color:'#ffffff', padding:'0px 10px'}}/>
              <Typography sx={{color:'#ffffff', padding:'0px 5%'}}>Total products:</Typography>
            </Toolbar>
          </Box>
        </Box>
        {productData?.products?.map((product, index) => (
          <Box id="full-width-box" sx={{display:'flex',  width:'100%', justifyContent:'space-between'}} key={index}>
            <FormControlLabel
              control={<Checkbox />}
            />
            <Box  sx={{border: '1px solid #95AAAD36', display:'flex',width:'100%', justifyContent:'space-between'}}>
              <Box id="main-box-edit" sx={{display:'flex', justifyContent:'space-between', width:'100%', textAlign:'left'}}>
                <Box sx={{display:'flex', justifyContent:'space-between', gap:'10x', width:'20%', border:'1px solid #95AAAD36', textAlign:"left"}}>
                  <Box sx={{textAlign:"left",padding:'10px 20px', justifyContent:'space-between'}}><img src={`https://courageous-cow-life-jacket.cyclic.app/${product.image[0].imageData}`} alt="Product" /></Box>
                  <Box sx={{textAlign:"left",padding:'10px 20px', justifyContent:'space-between'}} ><Typography sx={{textAlign:"left"}}>{product.product}</Typography></Box>
                </Box> 
                <Box sx={{width:'20%', borderRight:'1px solid #95AAAD36', padding:'10px 20px', justifyContent:'space-between'}}>
                  <Typography>SKU: {product.sku}</Typography>
                  <Typography>Category: {product.category}</Typography>
                  <Typography>Tag: {product.tag}</Typography>
                </Box>
                <Box sx={{width:'20%', borderRight:'1px solid #95AAAD36', padding:'10px 20px', justifyContent:'space-between'}}>
                  <Typography sx={{color:'#F3941E'}}>Price: ${product.price}</Typography>
                  <Typography>Sales Price: ${product.salesPrice}</Typography>
                  <Typography>Inventory: {product.inventory}</Typography>
                </Box>
                <Box sx={{width:'20%',padding:'10px 20px', justifyContent:'space-between'}}>
                  <Typography>Branch Number: {product.branchNumber}</Typography>
                  <Typography>Country of Origin: {product.countryOfOrigin}</Typography>
                  <Typography>Description: {product.description}</Typography>
                  <Typography>Brand: {product.brand}</Typography>
                </Box>
                <Box sx={{width:'2%', borderRight:'1px solid #95AAAD36', padding:'10px 20px', backgroundColor:'#124BF2',WebkitBorderTopLeftRadius:'10px', borderBottomLeftRadius:'10px', justifyContent:'space-between'}}>
                  <ListItem button onClick={() => handleDelete(product.id)}>
                    <ListItemIcon>
                      <DeleteIcon sx={{color:'#ffffff'}}/>
                    </ListItemIcon>
                  </ListItem>
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default Editproduct;
