import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Paper, styled, TableBody, TableCell, TableRow, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: '10px',
}));

const infoUser = [
  {
    id: 'name',
    label: 'Họ và tên',
    value: 'Vũ Trọng Quảng',
  },
  {
    id: 'birthday',
    label: 'Ngày sinh',
    value: '29-09-2001',
  },
  {
    id: 'phone',
    label: 'Số điện thoại',
    value: '0968317889',
  },
  {
    id: 'address',
    label: 'Địa chỉ',
    value: 'Ngõ 87 Lê Thanh Nghị, Đồng Tâm, Hai Bà Trưng, Hà Nội',
  },
];
const infoPurchase  = [
    {
      id: 'totalMoney',
      label: 'Tổng chi tiêu',
      value: '9000000',
    },
    {
      id: 'totalOrder',
      label: 'Tổng số lượng đơn hàng',
      value: '29',
    },
    {
      id: 'totalProduct',
      label: 'Tổng sản phẩm đã mua',
      value: '90',
    },
  ];
function UserDetailComponent(props?: any) {
  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Grid>
          <Item>
            <Typography sx={{ flex: '1 1 100%', display: 'flex' }} variant='h6' id='tableTitle' component='div'>
              Thông tin cá nhân
            </Typography>

            <Box component='div' sx={{ display: 'flex' }}>
              <TableBody>
                {infoUser.map((headCell, index) => {
                  return (
                    <TableRow hover onClick={() => {}} tabIndex={-1} key={headCell.id}>
                      <TableCell component='th' id={headCell.id} scope='row' padding='normal'>
                        {headCell.label}
                      </TableCell>
                      <TableCell align='right'>{headCell.value}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Box>
          </Item>
          <Item>
            <Typography sx={{ flex: '1 1 100%', display: 'flex' }} variant='h6' id='tableTitle' component='div'>
              Thông tin mua hàng
            </Typography>

            <Box component='div' sx={{ display: 'flex' }}>
              <TableBody>
                {infoPurchase.map((headCell, index) => {
                  return (
                    <TableRow hover onClick={() => {}} tabIndex={-1} key={headCell.id}>
                      <TableCell component='th' id={headCell.id} scope='row' padding='normal'>
                        {headCell.label}
                      </TableCell>
                      <TableCell align='right'>{headCell.value}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Box> 
          </Item>
        </Grid>
      </Box>

      <Box>
        <Box></Box>
        <Box></Box>
      </Box>
    </Box>
  );
}

UserDetailComponent.propTypes = {};

export default UserDetailComponent;
