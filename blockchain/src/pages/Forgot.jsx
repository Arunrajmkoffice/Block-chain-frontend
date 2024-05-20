import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'

function Forgot() {
    const [email,setEmail]=useState('');
    const handleEmail=(event)=>{
        setEmail(event.target.value)
    }
    let data={
        email
    }
    console.log("data--------",data)
    const handleSubmit=()=>{
        axios({
            method:'PATCH',
            url:'http://localhost:9096/password',
            data
        }).then((res)=>{
            console.log("res-----",res.data)
        }).catch((err)=>{

        })
    }
  return (
    <Box>
        <Typography>Email*</Typography>
        <TextField value={email} onChange={handleEmail} />
        <Button onClick={handleSubmit}>Send</Button>
    </Box>
  )
}

export default Forgot
