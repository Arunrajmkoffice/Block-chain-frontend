import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

function TrackingUI({ onTrack }) {
    const [selectedLocation, setSelectedLocation] = useState(null);

    // Function to handle tracking
    const handleTrack = () => {
        // Check if a location is selected
        if (selectedLocation) {
            onTrack(selectedLocation); // Pass the selected location to the parent component
        } else {
            alert('Please select a location to track.'); // Display an error message if no location is selected
        }
    };

    // Function to check if the current tracking location is Japan
    const isJapanReached = () => {
        return selectedLocation === 'Japan';
    };
    const isSingapore = () => {
      return selectedLocation === 'Japan';
  };
    const isIndia = () => {
      return selectedLocation === 'India';
    };
    const isBangalore = () => {
      return selectedLocation === 'Bangalore';
    };
    

    return (
        <Box sx={{ margin: '10px', textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
                Select your location to track:
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <Button variant={selectedLocation === 'USA' ? 'contained' : 'outlined'} onClick={() => setSelectedLocation('USA')}>
                    USA
                </Button>
                {isJapanReached() && (
                <Box sx={{ marginTop: '20px', width: '100%', height: '5px', backgroundColor: 'green' }} />
            )}
                <Button variant={selectedLocation === 'Japan' ? 'contained' : 'outlined'} onClick={() => setSelectedLocation('Japan')}>
                    Japan
                </Button>
                {isSingapore() && (
                <Box sx={{ marginTop: '20px', width: '100%', height: '5px', backgroundColor: 'green' }} />
            )}
                <Button variant={selectedLocation === 'Singapore' ? 'contained' : 'outlined'} onClick={() => setSelectedLocation('Singapore')}>
                    Singapore
                </Button>
                {isIndia() && (
                <Box sx={{ marginTop: '20px', width: '100%', height: '5px', backgroundColor: 'green' }} />
            )}
                <Button variant={selectedLocation === 'India' ? 'contained' : 'outlined'} onClick={() => setSelectedLocation('India')}>
                    India
                </Button>
                {isBangalore() && (
                <Box sx={{ marginTop: '20px', width: '100%', height: '5px', backgroundColor: 'green' }} />
            )}
                <Button variant={selectedLocation === 'Bangalore' ? 'contained' : 'outlined'} onClick={() => setSelectedLocation('Bangalore')}>
                    Bangalore
                </Button>
            </Box>
            <Button variant="contained" onClick={handleTrack} sx={{ marginTop: '20px' }}>
                Track
            </Button>

            {/* Display a green line if the product reached Japan */}
            
        </Box>
    );
}

export default TrackingUI;
