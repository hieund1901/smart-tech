import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { setUser } from '../Pages/Checkout/Checkout.slice';
import { useDispatch } from 'react-redux';

export default function OrderInformation() {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [voucher, setVoucher] = useState('');
  const [other, setOther] = useState('');
  const dispatch = useDispatch();

  const handleSetCustomer = () => {
    const newCustomer = {
      name: name,
      email: email,
      phone: phone,
      address: address,
      voucher: voucher,
      other: other,
    };
    dispatch(setUser(newCustomer));
    console.log('hello ae');
  }


  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Thông tin khách hàng
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='fullName'
            name='fullName'
            label='Họ và tên'
            fullWidth
            autoComplete='given-name'
            variant='standard'
            onChange={(e) => setname(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id='email'
            name='email'
            label='Email'
            fullWidth
            autoComplete='family-name'
            variant='standard'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='phone'
            name='phone'
            label='Nhập số điện thoại'
            fullWidth
            autoComplete='phone'
            variant='standard'
            onChange={(e) => setPhone(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='address'
            name='address'
            label='Địa chỉ giao hàng'
            fullWidth
            autoComplete='shipping address-line2'
            variant='standard'
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id='voucher'
            name='voucher'
            label='Mã Voucher(nếu có)'
            fullWidth
            autoComplete='tungdz123'
            variant='standard'
            onChange={(e) => setVoucher(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id='other'
            name='other'
            label='Yêu cầu khác'
            fullWidth
            autoComplete='shipping country'
            variant='standard'
            onChange={(e) => setOther(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            onClick={handleSetCustomer}
            control={<Checkbox color='secondary' name='saveAddress' value='yes' />}
            label='Xác nhận thông tin thanh toán'
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
