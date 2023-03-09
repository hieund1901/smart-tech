import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import { useAppSelector } from '../../state/storeHooks';
import { S22ultra, tablet, laptop, applewatch, speak, Oplung, adapter, sacduphong,screen,pc,keyboard,mouse } from '../../image';
import { useNavigate } from 'react-router-dom';

export default function ListCategory() {
  const database = [
    {
      categoryID: 1,
      categoryName: 'Điện thoại',
      icon: S22ultra,
    },

    {
      categoryID: 3,
      categoryName: 'Máy tỉnh bảng',
      icon: tablet,
    },
    {
      categoryID: 2,
      categoryName: 'Laptop',
      icon: laptop,
    },
    {
      categoryID: 5,
      categoryName: 'Đồng hồ',
      icon: applewatch,
    },
    {
      categoryID: 4,
      categoryName: 'Âm thanh',
      icon: speak,
    },
    {
      categoryID: 6,
      categoryName: 'Ốp lưng',
      icon: Oplung,
    },
  ];
  const database2 = [
    {
      categoryID: 7,
      categoryName: 'Sạc điện thoại',
      icon: adapter,
    },
    {
      categoryID: 8,
      categoryName: 'Pin dự phòng',
      icon: sacduphong,
    },
    {
      categoryID: 9,
      categoryName: 'Màn hình',
      icon: screen,
    },
    {
      categoryID: 10,
      categoryName: 'PC',
      icon: pc,
    },
    {
      categoryID: 11,
      categoryName: 'Bàn phím',
      icon: keyboard,
    },
    {
      categoryID: 12,
      categoryName: 'Chuột máy tính',
      icon: mouse,
    },
  ];
  const listCategory = useAppSelector((state) => state.category?.category.allCategories?.data);
  const [categories, setCategories] = useState('');
  const navigate = useNavigate();

  function toggleMenu() {}
  const handleGetListProduct=(id:any)=>{
    console.log(id);
    navigate('/products-user/'+id);
  }


  return (
    <Box
      sx={{
        width: '1100px',
        boxShadow: 'rgba(0, 0, 0, 0.05) 0 3px 3px',
        height: '300px',
        borderRadius: '10px',
        overflow: 'hidden',
        backgroundColor: 'white',
      }}
    >
      <Typography
        sx={{ color: '#666666', height: '40px', fontSize: '22px', fontWeight: '600' }}
        display='flex'
        alignItems='center'
        justifyContent={'center'}
        marginBottom='15px'
   
      >
        Danh mục sản phẩm
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'wrap', width: '100%', marginTop: '0px', marginLeft: '30px' }}>
        {database.map((c) => (
          <Box key={c.categoryID} sx={{ margin: '10px' }}>
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                fontSize: '15px',
                ':hover': {
                  backgroundColor: '#ffffff',
                  transform: 'transform: translateY(-2px)',
                  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 5px 5px',
                },
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '5px',
                width: '140px',
                height: '100px',
                borderRadius:'10px'
              }}
              onClick={() => handleGetListProduct(c.categoryID)}
            >
              <img className='img1' src={c.icon} alt='phone' width={'70px'} height={'65px'} />
              <Typography fontSize={14} color={'black'}>
                {c.categoryName}
              </Typography>
            </Button>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'wrap', width: '100%', marginTop: '0px', marginLeft: '100px' }}>
        {database2.map((c) => (
          <Box key={c.categoryID} sx={{ margin: '10px' }}>
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#ffffff',
                fontSize: '15px',
                ':hover': {
                  backgroundColor: '#ffffff',
                  transform: 'transform: translateY(-2px)',
                  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px 4px',
                },
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '5px',
                width: '140px',
                height: '100px',
                borderRadius:'10px'
              }}
              onClick={() => handleGetListProduct(c.categoryID)}
            >
              <img className='img1' src={c.icon} alt='phone' width={'70px'} height={'65px'} />
              <Typography fontSize={14} color={'black'}>
                {c.categoryName}
              </Typography>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
