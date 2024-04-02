import { Box, Grid, Table, TableBody, TableCell, TableRow, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react'; // Import QRCode library

function Productpage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  let token = localStorage.getItem('bcToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://52.66.194.234:9093/product/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setProducts(data);
        console.log('datas', data)
      } catch (error) {
        console.error('error:', error)
      }
    };
    fetchData();
  }, [])
  // Generate the QR code content
  const qrCodeContent = window.location.href;
  const handleQRCodeScan = (scannedContent) => {
    // Update destination based on scanned content

  };
  useEffect(() => {
    handleQRCodeScan(qrCodeContent);
  }, []);
  return (
    <>
      <Box sx={{ margin: '10px', padding: '8% 0%' }}>
        <Box sx={{ backgroundColor: '#124BF2', padding: '10px 0px', display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
          {products?.product?.tracking.map((track, index) => (
            <Box sx={{ display: 'flex', alignItems: 'center', width: "100%", color: '#ffffff', }}>
              <Box sx={{ margin: '0 10px', border: '' }}>{track.productAt}</Box>
              <Box
                sx={{
                  width: '100%',
                  borderTop: `3px solid ${track.complete ? '#ffffff' : '#FFFFFF78'}`,
                  // border:'1px solid white',
                }}
              >
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
            <Grid sx={{ textAlign: 'left' }} item xs={4}>
              <h3>{products?.product?.product}</h3>
              {products?.product?.image.map((image) => (
                <Box sx={{ textAlign: "left", padding: '10px 20px', justifyContent: 'space-between' }}><img style={{ width: '100px' }} src={image?.imageData} alt="Product" /></Box>
              ))}
              <br></br>
              <QRCode value={qrCodeContent} />
              <Typography>product image</Typography>
            </Grid>
            <Grid sx={{ borderRight: '1px solid #1A316C94', textAlign: 'left' }} item xs={4}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ width: '28%', border: 'none', color: '#1A316C94', fontWeight: '600' }}>Batch Number</TableCell>
                    <TableCell sx={{ width: '2%', border: 'none' }}>:</TableCell>
                    <TableCell sx={{ width: '70%', border: 'none' }}>{products?.product?.branchNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: '28%', border: 'none', color: '#1A316C94', fontWeight: '600' }}>Brand Name</TableCell>
                    <TableCell sx={{ width: '2%', border: 'none' }}>:</TableCell>
                    <TableCell sx={{ width: '70%', border: 'none' }}>{products?.product?.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: '28%', border: 'none', color: '#1A316C94', fontWeight: '600' }}>Categories</TableCell>
                    <TableCell sx={{ width: '2%', border: 'none' }}>:</TableCell>
                    <TableCell sx={{ width: '70%', border: 'none' }}>{products?.product?.category}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: '28%', border: 'none', color: '#1A316C94', fontWeight: '600' }}>Country origin</TableCell>
                    <TableCell sx={{ width: '2%', border: 'none' }}>:</TableCell>
                    <TableCell sx={{ width: '70%', border: 'none' }}>{products?.product?.countryOfOrigin}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: '28%', border: 'none', color: '#1A316C94', fontWeight: '600' }}>Description</TableCell>
                    <TableCell sx={{ width: '2%', border: 'none' }}>:</TableCell>
                    <TableCell sx={{ width: '70%', border: 'none' }}>{products?.product?.description}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Grid sx={{ textAlign: 'left' }} item xs={4}>
              <Table>
                <TableBody sx={{ border: 'none' }}>
                  <TableRow>
                    <TableCell sx={{ width: '28%', border: 'none', color: '#1A316C94', fontWeight: '600' }}>sku</TableCell>
                    <TableCell sx={{ width: '2%', border: 'none' }}>:</TableCell>
                    <TableCell sx={{ width: '70%', border: 'none' }}>{products?.product?.sku}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: '28%', border: 'none', color: '#1A316C94', fontWeight: '600' }}>Inventory</TableCell>
                    <TableCell sx={{ width: '2%', border: 'none' }}>:</TableCell>
                    <TableCell sx={{ width: '70%', border: 'none' }}>{products?.product?.inventory}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: '28%', border: 'none', color: '#1A316C94', fontWeight: '600' }}>Regular Price</TableCell>
                    <TableCell sx={{ width: '2%', border: 'none' }}>:</TableCell>
                    <TableCell sx={{ width: '70%', border: 'none' }}>{products?.product?.price}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: '28%', border: 'none', color: '#1A316C94', fontWeight: '600' }}>Sale Price</TableCell>
                    <TableCell sx={{ width: '2%', border: 'none' }}>:</TableCell>
                    <TableCell sx={{ width: '70%', border: 'none' }}>{products?.product?.salesPrice}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ width: '28%', border: 'none', color: '#1A316C94', fontWeight: '600' }}>Tag</TableCell>
                    <TableCell sx={{ width: '2%', border: 'none' }}>:</TableCell>
                    <TableCell sx={{ width: '70%', border: 'none' }}>{products?.product?.tag}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Box>
      </Box>


      {products?.product?.tracking.map((track, index) => (
        <div key={index}>
          <p>Complete: {String(track.complete)}</p>
          <p>productat: {String(track.productAt)}</p>
        </div>
      ))}

    </>


  )
}

export default Productpage
