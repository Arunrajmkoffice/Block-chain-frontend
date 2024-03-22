import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';



export default function RowAndColumnSpacing() {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 3, md: 3 }}>
        <Grid item xs={4}>
          1
        </Grid>
        <Grid item xs={4}>
          2
        </Grid>
        <Grid item xs={4}>
         3
        </Grid>
      </Grid>
    </Box>
  );
}
