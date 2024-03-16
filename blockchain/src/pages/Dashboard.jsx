import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

function Dashboard() {
  let data = [
    { id: "12312121" },
    { id: "1112321121" },
    { id: "332133" },
    { id: "12333221321" },
    { id: "1223323321" },
    { id: "3" },
    { id: "9000999" }
  ];

  // State to store selected IDs for bulk download
  const [selectedIds, setSelectedIds] = useState([]);
  const storedUserRole =JSON.parse(localStorage.getItem("bcUserData"));


  // Function to handle bulk download
  const handleBulkDownload = () => {
    // Perform bulk download logic with selectedIds
    console.log("Bulk download:", selectedIds);
  };

  return (
    <>
      {storedUserRole.role==="Us Warehouse"?
      <Box>
      <h2>Dashboard</h2>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <p>ID: {item.id}</p>
            <QRCode value={item.id} />
            {/* Checkbox to select IDs for bulk download */}
            <input
              type="checkbox"
              checked={selectedIds.includes(item.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedIds([...selectedIds, item.id]);
                } else {
                  setSelectedIds(selectedIds.filter(id => id !== item.id));
                }
              }}
            />
          </div>
        ))}
      </div>
      {/* Single download button */}
      <button onClick={() => console.log("Single download")}>Download Single</button>
      {/* Bulk download button */}
      <button onClick={handleBulkDownload} disabled={selectedIds.length === 0}>Download Bulk</button>
      </Box>:<Typography>scanner</Typography>}
    </>
  );
            
}

export default Dashboard;
