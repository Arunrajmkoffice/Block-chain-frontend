import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const styles = {
  fullPage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Set height to fill the viewport
    width: '100vw', // Set width to fill the viewport
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    position: 'fixed', // Position it fixed so it overlays everything
    top: 0,
    left: 0,
    zIndex: 9999, // Set a high z-index to make sure it's on top of everything
  },
};

export default function Loader() {
  return (
    <div style={styles.fullPage}>
      <CircularProgress disableShrink />
    </div>
  );
}
