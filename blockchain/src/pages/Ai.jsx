import React, { useState, useEffect } from 'react';
import { Button, Input, OutlinedInput } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Stack } from '@mui/material';
const YourComponent = () => { 
    const [generatedContent, setGeneratedContent] = useState({generatedContent:""});
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('bcToken');
const handleSearch = (e)=>{
  setQuery(e.target.value)
}
const handleAi = ()=>{
let data ={
    query:query
}

    axios({
        method:"POST",
        url:"http://localhost:9096/ai",
        data,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    .then((res)=>{
        console.log("AI Responce", res.data)
        setGeneratedContent({generatedContent:res.data.generatedContent}   )
        console.log("generatedContent", res.data)
    })
    .catch((error)=>{

    })
}
    return (
        <Box sx={{display:'flex', justifyContent:'center', flexDirection:'column', alignItems:'center',padding:'10% 0%'}}>
            {error && <p>{error}</p>}
            <Typography sx={{fontWeight:'500'}}>Ai Search</Typography>
            <Stack sx={{ gap:'20px', flexDirection:'row', marginTop:'20px'}}>
            <OutlinedInput sx={{width:'360px'}} placeholder='How can I help you?' onChange={handleSearch}/>
            <Button variant='contained' onClick={handleAi}> Ai Search </Button>
            </Stack>
            <Typography sx={{width:'60%', marginTop:'30px', fontSize:'22px'}}>{generatedContent.generatedContent}</Typography>
        </Box>
    );
};
export default YourComponent;