import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Footer } from '../Footer/Footer';
import { Typography } from '@mui/material';
import CartItem from './CartItem';
import Header from '../Header/Header';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Cart() {
  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ width: '1100px', paddingTop: '120px', marginTop: '70px' }}>
        <Typography variant='body2' display='block' gutterBottom>
          GIỎ HÀNG
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={8}>
            <Item sx={{ width: 730 }}>
              <CartItem />
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item
              sx={{
                backgroundColor: '#ffda24',
                color: '#fff',
                width: 352,
                height: 62,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant='body2' display='block' gutterBottom sx={{ fontWeight: 700, fontSize: '1.2em' }}>
                TỔNG TIỀN
              </Typography>
              <Typography variant='body2' display='block' gutterBottom sx={{ fontWeight: 700, fontSize: '1.5em' }}>
                48.590.000 ₫
              </Typography>
            </Item>
            <Item
              sx={{
                marginTop: '24px',
                backgroundColor: '#dc3545',
                color: '#fff',
                width: 352,
                height: 58,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography variant='body2' display='block' gutterBottom sx={{ fontWeight: 700, fontSize: '1.2em' }}>
                THANH TOÁN
              </Typography>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
}
