import React, { useState } from 'react';
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography, FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import b2 from '../images/b2.png';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [name, setName] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
    // Validate password length
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleVendorName = (event) => {
    setVendorName(event.target.value);
  }
  const handleName = (event) => {
    setName(event.target.value);
  }
  const handleAddress = (event) => {
    setAddress(event.target.value);
  }
  const handleSubmit = () => {
    // Submit the signup data if there are no errors

let data = {
  email, password, role: "Us Warehouse", vendorName, address, name
}
console.log("data----------",data)

    if (!emailError && !passwordError) {
      axios.post("http://localhost:9096/signup", 
      data
      )
        .then((res) => {
          console.log('Signup successful:', res.data);
          // Optionally, you can redirect the user to another page after successful signup
        })
        .catch((err) => {
          console.error('Error:', err);
          // Handle error state
        });
    }
  };

  return (<>

    <Box sx={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
      <Grid container spacing={2} style={{ padding: 10 }}>
        <Grid item xs={12} sm={7}>
          <Box sx={{ marginTop: '15%', width: '100%', display: 'flex', justifyContent: 'center' }}></Box>
          <Box as="img"
            src={b2}
            alt="Background Image"
            sx={{ width: '100%', height: 'auto' }}>
          </Box>

        </Grid>
        <Grid item xs={12} sm={5}>
          <Box sx={{ marginTop: '5%' }}></Box>
          <br />
          <Typography sx={{ marginLeft: '65%', textDecoration: 'underline', color: '#124BF2', padding: '10px 0px', fontSize: '20px', fontWeight: '800' }}>Profile</Typography>
          <br />
          <Box >
            <Box sx={{
              width: '80%', marginLeft: '20px', border: '1px solid #124BF2', padding: '10px 20px', borderRadius: '20px', boxShadow: '0px 0px 18px 8px #124BF229'
            }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#124BF2', fontSize: '36px', fontWeight: 'bold' }}>Sign Up</Typography>
              <Typography sx={{ textAlign: 'left', color: '#124BF2' }}>Email*</Typography>
              <TextField

                variant="outlined"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
                sx={{ mb: 2, width: '100%', border: '1px solid #124bf2', borderRadius: '10px' }}

              />
              <Typography sx={{ textAlign: 'left', color: '#124BF2' }}>Vendor Name*</Typography>
              <TextField id="outlined-basic" variant="outlined" value={vendorName} onChange={handleVendorName} sx={{ mb: 2, width: '100%', border: '1px solid #124bf2', borderRadius: '10px' }} />
              <Typography sx={{ textAlign: 'left', color: '#124BF2' }}>Company Name*</Typography>
              <TextField variant="outlined" value={name} onChange={handleName} sx={{ mb: 2, width: '100%', border: '1px solid #124bf2', borderRadius: '10px' }} />
              <Typography sx={{ textAlign: 'left', color: '#124BF2' }}>Address*</Typography>
              <TextField variant="outlined" value={address} onChange={handleAddress} sx={{ mb: 2, width: '100%', border: '1px solid #124bf2', borderRadius: '10px' }} />
              <Typography sx={{ textAlign: 'left', color: '#124BF2' }}>Role*</Typography>

              <FormControl fullWidth>
                <InputLabel sx={{ textAlign: 'left', color: '#124BF2' }}>Select Role</InputLabel>
                <Select defaultValue="" onChange={handleRoleChange} id="select1">
                  <MenuItem value="Us Warehouse">Warehouse</MenuItem>
                  <MenuItem value="Medorna Office">Medorna</MenuItem>
                  <MenuItem value="IGO Office">Igo</MenuItem>
                  <MenuItem value="Amazon Office">Amazon</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
                <Typography sx={{ textAlign: 'left', color: '#124BF2' }}>Password*</Typography>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  sx={{ width: '100%', border: '1px solid #124bf2', borderRadius: '10px' }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }

                  error={!!passwordError}
                  helperText={passwordError}
                />
                {passwordError && <FormHelperText sx={{ color: 'red' }}>{passwordError}</FormHelperText>}
              </FormControl>
              <Button variant="text" onClick={handleSubmit} sx={{
                '&:hover': {
                  backgroundColor: 'green', // Change the color on hover
                }, backgroundColor: '#124bf2', color: '#ffffff', padding: '5px 45px', textTransform: 'capitalize', borderRadius: '50px', fontSize: '20px'
              }}>
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>

    </Box>
  </>
  );
}

export default Signup;
