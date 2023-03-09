import { Box, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Iphone14 } from '../../image';

export default function ProductCard(price:any) {
  return (
    <Box>
      <CardMedia component='img' height='140' image={Iphone14} alt='green iguana' />
      <CardContent>
        <Typography variant='body2'>123</Typography>
        <Typography variant='body2' color='text.secondary'>
          {price}
        </Typography>
      </CardContent>
    </Box>
  );
}
