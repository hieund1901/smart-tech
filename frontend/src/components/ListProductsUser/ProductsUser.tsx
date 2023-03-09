import React, { useEffect, useState } from 'react';
import { Badge, Box, Button, Typography } from '@mui/material';
import Header from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { getProductTopSelling } from '../../services/apiRequest';
import Product from './Product';
import { Products } from '../../types/products';
import {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  DesktopMac,
  Keyboard,
  Mouse,
  Airplay,
  EarbudsBattery,
  Dock,
  Cable,
  NavigateNext,
} from '@mui/icons-material';
import { useParams } from 'react-router';

export default function ProductsUser() {
  const [topProducts, setTopProducts] = useState<Products | any>([]);
  const [idCategory, setIdCategory] = useState<string | any>(useParams().id);

  const fetchProducts = async () => {
    const response = await getProductTopSelling(idCategory, 10);
    setTopProducts(response);
  };

  useEffect(() => {
    fetchProducts();
  }, [idCategory]);

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ width: '1100px', paddingTop: '120px', display: 'flex', justifyContent: 'space-around' }}>
        <Box
          sx={{
            width: '200px',
            height: '100%',
            flexDirection: 'column',
            border: '1px solid #ddd',
            borderRadius: '20px',
          }}
        >
          <Button
            onClick={() => {
              setIdCategory('1');
            }}
            sx={{ color: 'black', fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <Smartphone />
            <Typography variant='caption'>Điện thoại</Typography>
            <NavigateNext />
          </Button>
          <Button
            onClick={() => {
              setIdCategory('2');
            }}
            sx={{ color: 'black', fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <Laptop />
            <Typography variant='caption'>Laptop</Typography>
            <NavigateNext />
          </Button>
          <Button
            onClick={() => {
              setIdCategory('3');
            }}
            sx={{ color: 'black', fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <Tablet />
            <Typography variant='caption'>Máy tính bảng</Typography>
            <NavigateNext />
          </Button>
          <Button
            onClick={() => {
              setIdCategory('4');
            }}
            sx={{ color: 'black', fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <Headphones />
            <Typography variant='caption'>Âm thanh</Typography>
            <NavigateNext />
          </Button>
          <Button
            onClick={() => {
              setIdCategory('5');
            }}
            sx={{ color: 'black', fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <Watch />
            <Typography variant='caption'>Đồng hồ</Typography>
            <NavigateNext />
          </Button>
          <Button
            onClick={() => {
              setIdCategory('6');
            }}
            sx={{ color: 'black', fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <Cable />
            <Typography variant='caption'>Ốp lưng</Typography>
            <NavigateNext />
          </Button>
          <Button
            onClick={() => {
              setIdCategory('7');
            }}
            sx={{ color: 'black', fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <EarbudsBattery />
            <Typography variant='caption'>Sạc điện thoại</Typography>
            <NavigateNext />
          </Button>
          <Button
            onClick={() => {
              setIdCategory('8');
            }}
            sx={{ color: 'black', fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <Dock />
            <Typography variant='caption'>Pin dự phòng</Typography>
            <NavigateNext />
          </Button>
          <Button
            onClick={() => {
              setIdCategory('9');
            }}
            sx={{ color: 'black', fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <Airplay />
            <Typography variant='caption'>Màn hình</Typography>
            <NavigateNext />
          </Button>
          <Button
            onClick={() => {
              setIdCategory('10');
            }}
            sx={{ color: 'black', fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <DesktopMac />
            <Typography variant='caption'>Desktop</Typography>
            <NavigateNext />
          </Button>
          <Button
            onClick={() => {
              setIdCategory('11');
            }}
            sx={{ color: 'black', fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <Keyboard />
            <Typography variant='caption'>Bàn phím</Typography>
            <NavigateNext />
          </Button>
          <Button
            onClick={() => {
              setIdCategory('12');
            }}
            sx={{ color: 'black', fontSize: '12px', display: 'flex', justifyContent: 'space-between', width: '100%' }}
          >
            <Mouse />
            <Typography variant='caption'>Chuột máy tính</Typography>
            <NavigateNext />
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', width: '80%' }}>
          {topProducts.map((item: Products) => (
            <Product item={item} key={item.id} />
          ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
