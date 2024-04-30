import { Box, Grid, Table, TableBody, TableCell, TableRow, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react'; // Import QRCode library


function Productpage() {
 let { id } = useParams();
 //const id="1db08b6a-d7f5-47c0-b256-7b27b8a4e773";
  const [products, setProducts] = useState([]);
  let token = localStorage.getItem('bcToken');
  const [qrCodeReady, setQRCodeReady] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:9096/product/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          },
        
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



  console.log("products",products)
  // Generate the QR code content
  const qrCodeContent = `http://localhost:3000/productpage/${products?.product?.qr[0]}`;
  const downloadQRCode = () => {
    products?.product?.qr.forEach((qrData, index) => {
      const canvas = document.getElementById(`qr-code-canvas-${index}`);
      if (canvas) {
        const url = canvas.toDataURL('image/png');
        const fileName = `${products?.product?.product}-${index}.png`; // Include product name and index in filename
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        console.error(`Canvas element with ID qr-code-canvas-${index} not found`);
      }
    });
  };



  useEffect(() => {
    setQRCodeReady(true); // Set QR code ready when component mounts
  }, []);

  return (
    <>
      <Box sx={{ margin: { xs: '23px 0px 0px -37px', sm: '35px 0px 0px 0px', lg: "0px" }, padding: { xs: '12% 0%', sm: '10% 0%', lg: '5%' }, width: '100%' }}>
        <Box sx={{ padding: '0px', width: { xs: '100%', sm: '100%' } }}>
          <ol class="progtrckr" data-progtrckr-steps="4">
            {products?.product?.tracking.map((track, index) => (
               <li class={track.complete ? 'progtrckr-done' : 'progtrckr-todo'}>{track.productAt}</li>
            ))}
          </ol>
        </Box >
        {/* destopview code start here */}
        <Box sx={{ width: '100%', padding: '5% 0%', display: { xs: 'none', sm: 'none', md: 'block' } }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
            <Grid item xs={12} sm={6} md={4}>
              <h3>{products?.product?.product}</h3>
              {products?.product?.image.map((image) => (
                <Box sx={{ padding: '10px 20px', justifyContent: 'space-between' }}><img style={{ width: '100px' }} src={image?.imageData} alt="Product" /></Box>
              ))}
              <br></br>
              {products?.product?.qr.map((qrData, index) => (
                <div key={index}>
                  <QRCode id={`qr-code-canvas-${index}`} value={`http://localhost:3000/productpage/${qrData}`} /> 
                </div>
              ))}
              <Button variant="contained" onClick={downloadQRCode}>Bulk Download</Button>
            </Grid>
            <Grid sx={{ borderRight: '1px solid #1A316C94', textAlign: 'left' }} item xs={12} sm={1} md={4} >
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
                    <TableCell sx={{ width: '28%', border: 'none', color: '#1A316C94', fontWeight: '600' }}>Tag</TableCell>
                    <TableCell sx={{ width: '2%', border: 'none' }}>:</TableCell>
                    <TableCell sx={{ width: '70%', border: 'none' }}>{products?.product?.tag}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            <Grid sx={{ textAlign: 'left' }} item xs={12} sm={6} md={4}>
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
                    <TableCell sx={{ width: '28%', border: 'none', color: '#1A316C94', fontWeight: '600' }}>Description</TableCell>
                    <TableCell sx={{ width: '2%', border: 'none' }}>:</TableCell>
                    <TableCell sx={{ width: '70%', border: 'none' }}>{products?.product?.description}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        
        </Box>
        {/* destopview code end here here */}
        {/* mobileview code start here */}
        <Box sx={{ width: '100%', display: { xs: 'block', sm: 'block', md: 'none' } }}>
          <Grid container rowSpacing={1} >
            <Grid sx={{ textAlign: 'left' }} >
              <h3>{products?.product?.product}</h3>
              {products?.product?.image.map((image) => (
                <Box sx={{ textAlign: "left", padding: '10px 20px', justifyContent: 'space-between' }}><img style={{ width: '100px' }} src={image?.imageData} alt="Product" /></Box>
              ))}
              <br></br>
              <QRCode id="qr-code-canvas" value={qrCodeContent} /><br></br>
              <Button variant="contained" onClick={downloadQRCode}>Bulk Download</Button>
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
        <Box sx={{ backgroundColor: '#124BF2', padding: '10px 0px', justifyContent: 'space-evenly', width: { xs: '130%', sm: '100%' }, display: 'none' }}>
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
            <Box>
          {products?.product?.qr.map((qrData, index) => (
                <div key={index}>
                  <QRCode id={`qr-code-canvas-${index}`} value={`http://localhost:3000/productpage/${qrData}`} /> 
                </div>
              ))}
              <Button variant="contained" onClick={downloadQRCode}>Bulk Download QR Codes</Button>
          </Box>
        </Box>
      </Box>



    </>


  )
}

export default Productpage
