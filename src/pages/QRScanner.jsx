import axios from 'axios';
import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';


const QRScanner = () => {
  const [delay] = useState(100);
  let token = localStorage.getItem('bcToken')
  const [scanResult, setScanResult] = useState({ id: '', fullResult: '' });
  let role = JSON.parse(localStorage.getItem('bcUserData'));
  const handleScan = (data) => {
    if (data) {
      // Split the scanned data by slashes and extract the last part as the ID
      const parts = data.text.split('/');
      const id = parts[parts.length - 1];
      // Update state with both the full result and the extracted ID
      setScanResult({ id, fullResult: data.text });
      console.log("idscan",id)
      console.log("full url",data)


    axios({
            method:"PATCH",
            url:`http://52.66.194.234:9093/product/${id}`,
          data:{role:role.role},
            headers: {
                Authorization:`Bearer ${token}` 
            }
        })
        .then((res)=>{
            
        })
        .catch((err)=>{
            
        })
    
      

    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  return (
    <div style={{padding:'8% 0%'}}>
      <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
      <p>Full Result:<a href={scanResult.fullResult}> {scanResult.fullResult}</a></p>
      <p>ID: {scanResult.id}</p>
    </div>
  );
};

export default QRScanner;
