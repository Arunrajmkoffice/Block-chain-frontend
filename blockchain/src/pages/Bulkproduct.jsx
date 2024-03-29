
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
        obj[headers[j]] = data[j];
      }
      jsonArray.push(obj);
    }

    setJSONData(JSON.stringify(jsonArray, null, 2));
    
  };

  return (
    <div>
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
