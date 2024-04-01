
import axios from 'axios';
import React, { useState } from 'react';

const Bulkproduct = () => {
  const [csvData, setCSVData] = useState(null);
  const [jsonData, setJSONData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      setCSVData(result);
    };
    reader.readAsText(file);
  };

  const convertToJSON = () => {
    const token = localStorage.getItem('bcToken');
    if (!csvData) {
      alert('Please upload a CSV file first.');
      return;
    }

    const lines = csvData.split('\n');
    const headers = lines[0].split(',');

    const jsonArray = [];
for (let i = 1; i < lines.length; i++) {
  const data = lines[i].split(',');
  const obj = {};
  for (let j = 0; j < headers.length; j++) {
    // Removing \n and \r characters from the keys
    const key = headers[j].replace(/\r?\n|\r/g, '');
    // Removing \r from the value
    const value = data[j].trim().replace(/\r/g, '');
    obj[key] = value;
  }
  jsonArray.push(obj);
}


    setJSONData(JSON.stringify(jsonArray, null, 2));

    axios({
      method:'POST',
      url:'http://52.66.194.234:9092/product/convert',
      headers:{
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(jsonArray)
    })
    .then((res)=>{
      console.log("res",res.data)
    })
    .catch((error)=>{

    })
    
  };

  return (
    <div style={{padding:'8% 0%'}}>
      <h2>CSV to JSON Converter</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <button onClick={convertToJSON}>Convert to JSON</button>
      {jsonData && (
        <div>
          <h3>JSON Output</h3>
          <textarea rows={10} cols={50} value={jsonData} readOnly />
        </div>
      )}
    </div>
  );
};

export default Bulkproduct;
