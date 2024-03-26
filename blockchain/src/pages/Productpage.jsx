import { Box, Grid, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react'; // Import QRCode library

function Productpage() {
    const { id } = useParams();
    const [products, setProducts]=useState([]);
    let token = localStorage.getItem('bcToken');

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await fetch(`http://3.6.93.117:9090/product/${id}`,{
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                });
                const data =await response.json();
                setProducts(data);
                console.log('data', data)
            }catch (error){
                console.error('error:',error)
            }
        };
        fetchData();
    },[])
  // Generate the QR code content
  const qrCodeContent = window.location.href;
  return (
<>
<Box sx={{margin:'10px'}}>
<Box sx={{background:'#124BF2',padding:'30px 0px', borderTopRightRadius:'10px', borderTopLeftRadius:'30px'}}>
<Typography sx={{color:'#ffffff'}}>USA Vendor</Typography>
</Box>
  <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
        <Grid sx={{textAlign:'left'}} item xs={4}>
        <h3>{products?.product?.product}</h3>
        <QRCode value={qrCodeContent} />
        <Typography>product image</Typography>
        </Grid>
        <Grid sx={{borderRight:'1px solid #1A316C94', textAlign:'left'}} item xs={4}>
        <Table>
        <TableBody>
          <TableRow>
            <TableCell sx={{width:'28%', border:'none',color:'#1A316C94',fontWeight:'600' }}>Batch Number</TableCell>
            <TableCell sx={{width:'2%', border:'none'}}>:</TableCell>
            <TableCell sx={{width:'70%', border:'none'}}>{products?.product?.branchNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{width:'28%', border:'none',color:'#1A316C94',fontWeight:'600'}}>Brand Name</TableCell>
            <TableCell sx={{width:'2%', border:'none'}}>:</TableCell>
            <TableCell sx={{width:'70%', border:'none'}}>{products?.product?.brand}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{width:'28%', border:'none',color:'#1A316C94',fontWeight:'600'}}>Categories</TableCell>
            <TableCell sx={{width:'2%', border:'none'}}>:</TableCell>
            <TableCell sx={{width:'70%', border:'none'}}>{products?.product?.category}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{width:'28%', border:'none',color:'#1A316C94',fontWeight:'600'}}>Country origin</TableCell>
            <TableCell sx={{width:'2%', border:'none'}}>:</TableCell>
            <TableCell sx={{width:'70%', border:'none'}}>{products?.product?.countryOfOrigin}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{width:'28%', border:'none',color:'#1A316C94',fontWeight:'600'}}>Description</TableCell>
            <TableCell sx={{width:'2%', border:'none'}}>:</TableCell>
            <TableCell sx={{width:'70%', border:'none'}}>{products?.product?.description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
        </Grid>
        <Grid sx={{textAlign:'left'}} item xs={4}>
        <Table>
        <TableBody sx={{border:'none'}}>
          <TableRow>
            <TableCell sx={{width:'28%', border:'none',color:'#1A316C94',fontWeight:'600'}}>sku</TableCell>
            <TableCell sx={{width:'2%',border:'none'}}>:</TableCell>
            <TableCell sx={{width:'70%' , border:'none'}}>{products?.product?.sku}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{width:'28%', border:'none',color:'#1A316C94',fontWeight:'600'}}>Inventory</TableCell>
            <TableCell sx={{width:'2%', border:'none'}}>:</TableCell>
            <TableCell sx={{width:'70%', border:'none'}}>{products?.product?.inventory}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{width:'28%', border:'none',color:'#1A316C94',fontWeight:'600'}}>Regular Price</TableCell>
            <TableCell sx={{width:'2%' , border:'none'}}>:</TableCell>
            <TableCell sx={{width:'70%', border:'none'}}>{products?.product?.price}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{width:'28%' , border:'none',color:'#1A316C94',fontWeight:'600'}}>Sale Price</TableCell>
            <TableCell sx={{width:'2%', border:'none'}}>:</TableCell>
            <TableCell sx={{width:'70%', border:'none'}}>{products?.product?.salesPrice}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{width:'28%', border:'none',color:'#1A316C94',fontWeight:'600'}}>Tag</TableCell>
            <TableCell sx={{width:'2%', border:'none'}}>:</TableCell>
            <TableCell sx={{width:'70%', border:'none'}}>{products?.product?.tag}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
        </Grid>
      </Grid>
    </Box>
    </Box>
</>


  )
}

export default Productpage
