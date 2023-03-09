import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { useAppSelector } from '../../state/storeHooks';

const products = [
  {
    name: 'Product 1',
    desc: 'A nice thing',
    price: '$9.99',
  },
  {
    name: 'Product 2',
    desc: 'Another thing',
    price: '$3.45',
  },
  {
    name: 'Product 3',
    desc: 'Something else',
    price: '$6.51',
  },
  {
    name: 'Product 4',
    desc: 'Best thing of all',
    price: '$14.11',
  },
  { name: 'Phí vận chuyển', price: 'Free' },
];

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
export default function Review() {

  const Customer = useAppSelector((state) => state.checkout?.user.User);
  console.log(Customer);

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Thông tin đơn hàng
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant='body2'>{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Tổng thanh toán' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
            Thông tin giao hàng
          </Typography>
          <Box sx={{ margin: '10px' }}>
            <Typography gutterBottom>{Customer.name}</Typography>
            <Typography gutterBottom>{Customer.email}</Typography>
            <Typography gutterBottom>{Customer.phone}</Typography>
            <Typography gutterBottom>{Customer.address}</Typography>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
