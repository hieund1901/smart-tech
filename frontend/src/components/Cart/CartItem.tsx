import React from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Iphone14 } from '../../image';
import { color } from '@mui/system';

interface Props {}

const CartItem = () => {
  return (
    <Box>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <CardMedia sx={{ height: 58, width: 58 }} image={Iphone14} />
        <Box>
          <Typography variant='body2' display='block' gutterBottom noWrap={true}>
            Macbook Pro 14 M1 Pro 8 CPU - 14 GPU 16GB 512GB 2021
          </Typography>
          <CardActions sx={{ border: '1px solid #ddd' }}>
            <Button>-</Button>
            <p>1</p>
            <Button>+</Button>
          </CardActions>
        </Box>
        <Box>
          <Typography sx={{ color: '#d80000', fontWeight: 700 }}>48.590.000 ₫</Typography>
          <Button variant='outlined' sx={{ color: '#d80000', border: '1px solid #d80000' }}>
            Xóa
          </Button>
        </Box>
      </CardContent>
    </Box>
  );
};

export default CartItem;
