import { Box, Grid, Table, TableBody, TableCell, TableRow, Typography , Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import QRCode from 'qrcode.react'; // Import QRCode library

function Productpage() {
    const { id } = useParams();
    const [products, setProducts]=useState([]);
    let token = localStorage.getItem('bcToken');
    const [currentDestination, setCurrentDestination] = useState(null);
    const [currentPath, setCurrentPath] = useState([]);

  const updateDestination = (destination) => {
    setCurrentDestination(destination);
    updatePath(destination);
  };
  const updatePath = (destination) => {
    let newPath = ['USA vendor'];
    
    if (destination === 'medorna') {
      newPath.push('Medorna office');
    } else if (destination === 'igo') {
      newPath.push('Medorna office', 'IGO office');
    } else if (destination === 'amazon') {
      newPath.push('Medorna office', 'Amazon office','Buyer');
    } else if (destination === 'buyer') {
      newPath.push('Medorna office', 'IGO office', 'Amazon office', 'Buyer');
    }
    
    setCurrentPath(newPath);
  };

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await fetch(`http://3.6.93.117:9091/product/${id}`,{
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
  const handleQRCodeScan = (scannedContent) => {
    // Update destination based on scanned content
    if (scannedContent === 'YOUR_EXPECTED_CONTENT') {
      updateDestination('usa'); // Change 'usa' to your expected destination
    }
  };
  useEffect(() => {
    handleQRCodeScan(qrCodeContent);
  }, []);
  return (
<>
<Box sx={{margin:'10px'}}>
  <Box sx={{backgroundColor:'#124BF2', padding:'10px 0px'}}>
<Box style={{ display: 'flex', justifyContent: 'space-between', width: '800px', position: 'relative', marginLeft:'22%' }}>
      <Box style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button style={{ background: 'none', border: 'none', color: 'black', cursor: 'pointer' }} onClick={() => updateDestination('usa')}>USA</Button>
      </Box>
      <Box style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button style={{ background: 'none', border: 'none', color: 'black', cursor: 'pointer' }} onClick={() => updateDestination('medorna')}>Medorna</Button>
      </Box>
      <Box style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button style={{ background: 'none', border: 'none', color: 'black', cursor: 'pointer' }} onClick={() => updateDestination('igo')}>IGO</Button>
      </Box>
      <Box style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button style={{ background: 'none', border: 'none', color: 'black', cursor: 'pointer' }} onClick={() => updateDestination('amazon')}>Amazon</Button>
      </Box>
      <Box style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'gray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Button style={{ background: 'none', border: 'none', color: 'black', cursor: 'pointer' }} onClick={() => updateDestination('buyer')}>Buyer</Button>
      </Box>
      {currentPath.map((step, index) => (
        <Box key={index} style={{ position: 'absolute', width: '50px', height: '2px', backgroundColor: 'red', top: '50px', left: `${115 + (index * 176)}px` }}></Box>
      ))}
  </Box>
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
