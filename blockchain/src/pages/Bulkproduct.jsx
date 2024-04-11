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

  const convertToJSONAndUpload = () => {
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
        const key = headers[j].replace(/\r?\n|\r/g, '');
        const value = data[j].trim().replace(/\r/g, '');
        obj[key] = value;
      }
      jsonArray.push(obj);
    }

    const jsonDataWrapped = { csvData: jsonArray }; // Wrap the JSON array in an object with key 'csvData'

    setJSONData(JSON.stringify(jsonDataWrapped, null, 2));

    const token = localStorage.getItem('bcToken');
    axios({
      method: 'POST',
      url: 'http://52.66.194.234:9095/convert',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: jsonDataWrapped,
    })
      .then((res) => {
        console.log('Response:', res.data);
        // Handle success response here
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle error here
      });
  };

  return (
    <div style={{ padding: '8% 0%' }}>
      <h2>CSV to JSON Converter</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <button onClick={convertToJSONAndUpload}>Convert to JSON and Upload</button>
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
