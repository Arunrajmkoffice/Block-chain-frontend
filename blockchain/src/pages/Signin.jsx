import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { siginAuth } from '../redux/auth/action';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material';
import b2 from '../images/b2.png';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

function Signin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [responseData, setResponseData] = useState(null);


  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmail = (e) => {
    const value = (e.target.value);
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }

  }
  const handlePassword = (e) => {
    const value = (e.target.value)
    setPassword(value);

    if (!value.trim()) {
      setPasswordError('Password is required');
    } else if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  }
  const handleSubmit = () => {
    let data = {
      email,
      password
    }

    if (!emailError && !passwordError) {
      axios.post("http://localhost:9096/signin", data)
        .then((res) => {
          setResponseData(res.data);
          if (res.data.token !== undefined) {
            localStorage.setItem('bcToken', res.data.token);
            let userData = {
              role: res.data.role,
              userId: res.data.userId,
              vendorId:res.data.vendorId,
            };
            localStorage.setItem('bcUserData', JSON.stringify(userData));
          }
        })
        .catch((err) => {
          console.error('Error:', err);
          // Handle error state
        });
    }
  }


  useEffect(() => {
    if (responseData && Object.keys(responseData).length > 0) {
      navigate('/');
      window.location.reload();
    }
  }, [responseData]);


  return (
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
          <Box sx={{
            width: '80%', marginLeft: '20px', border: '1px solid #124BF2', padding: '10px 20px', borderRadius: '20px', boxShadow: '0px 0px 18px 8px #124BF229'
          }}>
            <Typography sx={{ color: '#124BF2', fontSize: '36px', fontWeight: 'bold' }}>Log in</Typography>
            <br /><br />
            <Typography sx={{ textAlign: 'left', color: '#124BF2' }}>Email*</Typography>
            <TextField id="outlined-basic" variant="outlined" value={email} onChange={handleEmail} required error={!!emailError} helperText={emailError}
              sx={{
                width: '100%',
                border: '1px solid #124BF2',
                borderRadius: '10px'
              }} /><br /><br />
            <Typography style={{ textAlign: 'left', color: '#124BF2' }}>Password*</Typography>
            <FormControl sx={{ width: '100%', border: '1px solid #124BF2', borderRadius: '10px' }} variant="outlined" value={password} onChange={handlePassword} error={!!passwordError} helperText={passwordError} required>

              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
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
                label="Password"
              />
            </FormControl><br /><br />
            <Link to="/signup" target="_blank" rel="noopener" style={{ color: '#124bf2', textDecoration: 'none', float: 'left' }} >Sig UP</Link>
            <Link href="#" target="_blank" rel="noopener" style={{ color: '#124bf2', textDecoration: 'none', float: 'right' }} >Forgot Password</Link><br /><br />
            <Button variant="text" onClick={handleSubmit} sx={{
              '&:hover': {
                backgroundColor: 'green', // Change the color on hover
              }, backgroundColor: '#124bf2', color: '#ffffff', padding: '5px 45px', textTransform: 'capitalize', borderRadius: '50px', fontSize: '20px'
            }}>Log in</Button><br /><br />
          </Box>
        </Grid>
      </Grid>

    </Box>
  )
}

export default Signin