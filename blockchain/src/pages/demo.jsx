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
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const token = localStorage.getItem('bcToken')
  let role = JSON.parse(localStorage.getItem('bcUserData'));
  const [searchInput, setSearchInput] = useState("");
  const user = JSON.parse(localStorage.getItem('bcUserData'));
  const vendorId = user.vendorId;
  console.log('vendorids',vendorId)
  console.log("datasss", productData)



  let data = { 
      vendorId: '31b139eb-66e4-49c3-ba71-ab9affb502dd', 
  }
  useEffect(() => {
    axios({
      method: 'GET',
      url: `http://localhost:9096/product`,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        vendorId: "31b139eb-66e4-49c3-ba71-ab9affb502dd",
        
      }
    })
    .then((res) => {
      setProductData(res.data);
      console.log('Received data:', res.data);
      setDataFetched(true); 
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, [token, vendorId]);
  
  // Handle brand selection change
  const handleBrandChange = (event, value) => {
    setSelectedBrand(value);
  };
  return (
    <> 
    </>

  );
}

export default Editproduct;