import axios from 'axios';
import React, { useEffect, useState } from 'react';
import QrReader from 'react-qr-scanner';
import { useNavigate } from 'react-router-dom';


const QRScanner = () => {
  const [delay] = useState(100);
  const navigate = useNavigate()
  let token = localStorage.getItem('bcToken')
  const [scanResult, setScanResult] = useState({ id: '', fullResult: '' });
  const [id, setId] = useState("")
  const [selectedData, setSelectedData] = useState({})
  let role = JSON.parse(localStorage.getItem('bcUserData'));
  const handleScan = (data) => {
    if (data) {
      // Split the scanned data by slashes and extract the last part as the ID
      const parts = data.text.split('/');
      const id = parts[parts.length - 1];
      // Update state with both the full result and the extracted ID
      setScanResult({ id, fullResult: data.text });
      console.log("idscan",id)
      setId(id)
      console.log("full url",data)

    axios({
            method:"PATCH",
            url:`http://localhost:9096/product/${id}`,
          data:{role:role.role},
            headers: {
              Authorization:`Bearer ${token}` ,
            }
        })
        .then((res)=>{
          setSelectedData(res.data)
          
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


// useEffect(()=>{
//   if(Object.keys(selectedData)?.length>0){
//     navigate(`http://localhost:3000/productpage/${selectedData?.product?._id}`)
//     }
// },[selectedData])


let path = `http://localhost:3000/productpage/${id}`
  return (
    <div style={{padding:'8% 0%'}}>
      <QrReader
        delay={delay}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
      />
    { Object.keys(selectedData)?.length>0 && <p>Full Result:<a href={path}>{path}</a></p>}
      <p>ID: {id}</p>
    </div>
  );
};

export default QRScanner;
