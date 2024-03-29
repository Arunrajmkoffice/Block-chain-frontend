import { Box } from '@mui/material';
import React from 'react';

function App() {
  // Assuming you have a condition variable named "condition"
  const condition = true; // or false based on your logic
  const conditions = false;

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ margin: '0 10px' }}>USA</Box>
        <Box
          sx={{
            flexGrow: '1',
            borderTop: `1px solid ${condition ? 'red' : 'black'}`
          }}
        ></Box>
        <Box sx={{ margin: '0 10px' }}>Medorna</Box>
        <Box
          sx={{
            flexGrow: '1',
            borderTop: `1px solid ${condition ? 'red' : 'black'}`
          }}
        ></Box>
        <Box sx={{ margin: '0 10px' }}>IGO</Box>
        <Box
          sx={{
            flexGrow: '1',
            borderTop: `1px solid ${conditions ? 'red' : 'black'}`
          }}
        ></Box>
        <Box sx={{ margin: '0 10px' }}>Amazon</Box>
      </Box>
    </>
  );
}

export default App;
