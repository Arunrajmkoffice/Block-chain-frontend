import { Box, Grid, Table, TableBody, TableCell, TableRow, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react'; // Import QRCode library

function Productpage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  let token = localStorage.getItem('bcToken');
  const [qrCodeReady, setQRCodeReady] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://52.66.194.234:9095/product/${id}`, {
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
 
  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code-canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const fileName = `${products?.product?.product}.png`; // Include product name in filename
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      console.error('Canvas element not found');
    }
  };

  useEffect(() => {
    setQRCodeReady(true); // Set QR code ready when component mounts
  }, []);
  
  return (
    <>
      <Box sx={{ margin: { xs: '10px 10px 0px -100px ', sm: '5px', }, padding: { sm: '5% 0%', xs: '12% 10%' }, width: '100%' }}>
      <Box sx={{padding:'0px',width:{xs:'100%',sm:'100%'}}}>
          <ol class="progtrckr" data-progtrckr-steps="4">
            {products?.product?.tracking.map((track, index) => (
              <li  class={track.complete ? 'progtrckr-done' : 'progtrckr-todo'}>{track.productAt}</li>
            ))}
          </ol>
        </Box >
        {/* destopview code start here */}
        <Box sx={{ width: '100%',padding:'5% 0%', display: { xs: 'none', sm: 'block' } }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
            <Grid sx={{ textAlign: 'left' }} item xs={4}>
              <h3>{products?.product?.product}</h3>
              {products?.product?.image.map((image) => (
                <Box sx={{ textAlign: "left", padding: '10px 20px', justifyContent: 'space-between' }}><img style={{ width: '100px' }} src={image?.imageData} alt="Product" /></Box>
              ))}
              <br></br>
              <QRCode id="qr-code-canvas" value={qrCodeContent} /><br></br>
               <Button variant="contained" onClick={downloadQRCode}>Download QR Code</Button>
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
        {/* destopview code end here here */}
        {/* mobileview code start here */}
        <Box sx={{ width: '100%', display: { xs: 'block', sm: 'none' } }}>
          <Grid container rowSpacing={1} >
            <Grid sx={{ textAlign: 'left' }} >
              <h3>{products?.product?.product}</h3>
              {products?.product?.image.map((image) => (
                <Box sx={{ textAlign: "left", padding: '10px 20px', justifyContent: 'space-between' }}><img style={{ width: '100px' }} src={image?.imageData} alt="Product" /></Box>
              ))}
              <br></br>
              <QRCode value={qrCodeContent} />
              <Typography>product image</Typography>
            </Grid>
            <Grid sx={{ textAlign: 'left' }} >
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

                </TableBody>
              </Table>
            </Grid>
            <Grid sx={{ textAlign: 'left' }} >
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
                  <TableRow>
                    <TableCell sx={{ width: '28%', border: 'none', color: '#1A316C94', fontWeight: '600' }}>Description</TableCell>
                    <TableCell sx={{ width: '2%', border: 'none' }}>:</TableCell>
                    <TableCell sx={{ width: '70%', border: 'none' }}>{products?.product?.description}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Box>
        {/* mobileview code end here */}
        <Box sx={{ textAlign: 'center' }}>
            
          </Box>
        <Box sx={{ backgroundColor: '#124BF2', padding: '10px 0px', display: 'flex', justifyContent: 'space-evenly', width: { xs: '130%', sm: '100%' }, display:'none'}}>
          {products?.product?.tracking.map((track, index) => (
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', color: '#ffffff', }}>
              <Box sx={{ margin: { xs: '0px 0px', sm: '0 10px' }, border: '', }}>{track.productAt}</Box>
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
      </Box>



    </>


  )
}

export default Productpage
