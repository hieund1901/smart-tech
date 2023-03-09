import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { Logo } from '../../image';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { getAllByNameContains } from '../../services/apiRequest';
import { Products } from '../../types/products';
import { NavigateFunction, useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  marginRight: theme.spacing(4),
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'white',
  borderRadius: '5px',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    paddingLeft: `calc(1em + ${theme.spacing(0.5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const [input, setInput] = useState<string>('');
  // const [nameItem, setNameItem] = useState<Products | any>([]);

  const navigate: NavigateFunction = useNavigate();
  const handleOnclick = () => {};

  // React.useEffect(() => {
  //   fetchProducts();
  // }, []);

  const [getProduct, setProduct] = useState([{ product: {}, quantity: 0 }]);
  let total = 0;
  React.useEffect(() => {
    setProduct(JSON.parse(localStorage.getItem('cart')!));
  }, [total]);

  if (getProduct) {
    getProduct.forEach(function (product) {
      total += product.quantity;
    });
  }
  console.log(total);

  // const user = useAppSelector((state) => state.auth.login.currentUser.data.username);
  //   const user1 = localStorage.getItem('user');
  //   const user2 = JSON.parse(user1);
  //   console.log(user2.username);
  const [user, setUser] = useState<null | HTMLElement>(null);
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      setUser(user.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAnchorEl(null);
    setUser(null);
  };

  const handleProfileMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    console.log('gey ko ae');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>{user}</MenuItem>
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <Box>
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={'90px'}
        sx={{
          backgroundColor: '#EF2038',
          color: 'black',
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '1',
          boxShadow: 'rgba(0, 0, 0, 0.05) 0 3px 3px',
          width: '1920px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box width='1200px' margin='auto' display='flex' alignItems='center'>
          <Box
            sx={{ '&:hover': { cursor: 'pointer' } }}
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <a href='/' style={{ marginLeft: '20px' }}>
              <img src={Logo} height={'30px'} width={'170px'}></img>
            </a>
            <IconButton
              sx={{
                color: 'white',
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'rgba(255,255,255, 0.15)',
                borderRadius: '5px',
                marginLeft: '20px',
                height: '45px',
              }}
            >
              <Box>
                <Typography fontSize={11} lineHeight={2}>
                  Hệ thống cửa hàng
                </Typography>
                <Typography fontSize={11} lineHeight={1} fontWeight={600}>
                  30 chi nhánh
                </Typography>
              </Box>
            </IconButton>
            <Search sx={{ marginLeft: '50px' }}>
              <StyledInputBase
                type='text'
                placeholder='Tìm kiếm...'
                inputProps={{ 'aria-label': 'search' }}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  navigate(`/search/${input}`);
                }}
              >
                <SearchIcon sx={{ color: 'black', fontSize: '22px', fontWeight: 300 }} />
              </Button>
            </Search>
          </Box>
          <Box display='flex' justifyContent='space-between' columnGap='15px' zIndex='2'>
            <IconButton
              sx={{
                color: 'white',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '5px',
              }}
            >
              <PhoneInTalkIcon />
              <Box sx={{ marginLeft: '5px' }}>
                <Typography fontSize={11} display={'flex'} lineHeight={1}>
                  Hotline
                </Typography>
                <Typography fontSize={11} fontWeight={600}>
                  078912638
                </Typography>
              </Box>
            </IconButton>
            <Badge
              sx={{
                '& .MuiBadge-badge': {
                  right: 40,
                  top: 10,
                  padding: '0 2px',
                  height: '14px',
                  minWidth: '13px',
                },
              }}
              badgeContent={total}
              color='error'
            >
              <IconButton onClick={() => {}} sx={{ color: 'white', width: '70px', borderRadius: '5px' }}>
                <ShoppingCartCheckoutIcon />
                <Box marginLeft={'6px'}>
                  <Typography fontSize={11} display={'flex'} lineHeight={1}>
                    Giỏ
                  </Typography>
                  <Typography fontSize={11}>hàng</Typography>
                </Box>
              </IconButton>
            </Badge>
            {user ? (
              <IconButton
                size='large'
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                sx={{
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'row',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255,255,255, 0.15)',
                }}
              >
                <AccountCircleOutlinedIcon />
                <Typography fontSize={14} sx={{ marginLeft: '5px' }}>
                  {user}
                </Typography>
              </IconButton>
            ) : (
              <IconButton
                size='large'
                edge='end'
                sx={{
                  color: 'white',
                  display: 'flex',
                  flexDirection: 'row',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(255,255,255, 0.15)',
                  height: '45px',
                }}
                href='/login'
              >
                <AccountCircleOutlinedIcon />
                <Box sx={{ marginLeft: '5px' }}>
                  <Typography fontSize={11}>Đăng nhập</Typography>
                  <Typography fontSize={11} display={'flex'}>
                    Đăng kí
                  </Typography>
                </Box>
              </IconButton>
            )}
          </Box>
        </Box>
        {renderMenu}
        <Box sx={{ width: '1100px' }}>
          <Box sx={{ minHeight: '30px', display: 'flex', flexDirection: 'row' }}>
            <Typography fontSize={'14px'} color={'white'} fontFamily={'Verdana'} padding={'0px 10px 5px 10px'}>
              Điện thoại
            </Typography>
            <Typography fontSize={'14px'} color={'white'} fontFamily={'Verdana'} padding={'0px 10px 5px 10px'}>
              Laptop
            </Typography>
            <Typography fontSize={'14px'} color={'white'} fontFamily={'Verdana'} padding={'0px 10px 5px 10px'}>
              Máy tính bảng
            </Typography>
            <Typography fontSize={'14px'} color={'white'} fontFamily={'Verdana'} padding={'0px 10px 5px 10px'}>
              Đồng hồ
            </Typography>
            <Typography fontSize={'14px'} color={'white'} fontFamily={'Verdana'} padding={'0px 10px 5px 10px'}>
              Tai nghe
            </Typography>
            <Typography fontSize={'14px'} color={'white'} fontFamily={'Verdana'} padding={'0px 10px 5px 10px'}>
              Phụ kiện
            </Typography>
            <Typography fontSize={'14px'} color={'white'} fontFamily={'Verdana'} padding={'0px 10px 5px 10px'}>
              Màn hình
            </Typography>
            <Typography fontSize={'14px'} color={'white'} fontFamily={'Verdana'} padding={'0px 10px 5px 10px'}>
              PC
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
