import {
  Box,
  Button,
  Icon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Hotline, Iphone14 } from '../../../image';
import Header from '../../Header/Header';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Footer } from '../../Footer/Footer';
import { useAppSelector } from '../../../state/storeHooks';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../services/apiRequest';
import { useDispatch } from 'react-redux';
import { fontSize } from '@mui/system';
import { Products } from '../../../types/products';
import { dispatch } from 'decoders';

export default function ProductDetail() {
  const idProduct = useParams().id;
  const dispatch = useDispatch();
  const product = useAppSelector((state) => state.product?.product.ProductById.data);
  const price = product.sellingPrice;
  const attributes: { [key: string]: any } = product.attributes;
  function createData(name: string, calories: string) {
    return { name, calories };
  }

  const [storage, setStorage] = useState([{ product: { id: 0 }, quantity: 0 }]);
  useEffect(() => {
    setStorage(JSON.parse(localStorage.getItem('cart')!));
  }, []);

  const addToCart = (product: any, id: number) => {
    let a = storage.findIndex((c: any) => c.product.id == id);
    console.log(a);
    let b = [...storage];
    console.log(b);
    if (a === -1) {
      b.push({ product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(b));
    } else {
      b[a].quantity += 1;
      console.log(b[a].quantity);
      localStorage.setItem('cart', JSON.stringify(b));
    }
    // localStorage.setItem('cart', JSON.stringify([{product, quantity:1}]))
  };

  // // localStorage.setItem('cart',JSON.stringify(cart));
  // console.log(cart);

  useEffect(() => {
    getProductById(idProduct, dispatch);
  }, []);

  const listobjectA: any = [];
  const handlePrice = (e: any) => {
    console.log('hello ae');
  };

  if (attributes != null) {
    Object.keys(attributes).forEach(function (key, index) {
      const attributesArray = createData(key, attributes[key].toString());
      listobjectA.push(attributesArray);
    });
  }

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', backgroundColor: '#F4F4F4' }}>
      <Header />
      <Box sx={{ width: '1200px', marginTop: '110px', backgroundColor: '#ffffff', borderRadius: '8px' }}>
        <Typography sx={{ marginLeft: '30px', marginTop: '20px', fontSize: '20px', fontWeight: 550 }}>
          {product.name}
        </Typography>
        <Box sx={{ marginTop: '30px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box
              sx={{
                width: '550px',
                minHeight: '440px',
                padding: '50px',
              }}
            >
              <img src={product.imageBase64} style={{ objectFit: 'contain', width: '100%', height: '100%' }}></img>
            </Box>
            <Box sx={{ width: '400px' }}>
              <Typography
                sx={{
                  fontSize: 25,
                  fontWeight: 600,
                  marginBottom: 2,
                  color: '#ffffff',
                  borderRadius: '10px',
                  background: '#EF2038',
                  paddingLeft: '15px',
                  maxWidth: '250px',
                }}
              >
                {price}.000.000 ???
              </Typography>
              <Box
                sx={{
                  marginBottom: '15px',
                  display: 'flex',
                  '& > :not(style)': {
                    m: 0.3,
                    width: 130,
                    height: 50,
                    borderRadius: 2,
                    textAlign: 'center',
                    justifyItems: 'center',
                  },
                }}
              >
                <Button
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #EF2038',
                    color: '#EF2038',
                    transition: 'all 300ms cubic-bezier(0.23, 1, 0.32, 1)',
                    ':hover': {
                      boxShadow: 'rgba(0, 0, 0, 0.25) 0 8px 15px',
                      transform: 'transform: translateY(-2px)',
                      border: '1px solid #EF2038',
                      color: '#FFFFFF',
                      backgroundColor: '#EF2038',
                    },
                  }}
                  variant='outlined'
                  onClick={handlePrice}
                >
                  <p>128gb</p>
                  <p>28.990.000 ??</p>
                </Button>
                <Button
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #EF2038',
                    color: '#EF2038',
                    transition: 'all 300ms cubic-bezier(0.23, 1, 0.32, 1)',
                    ':hover': {
                      boxShadow: 'rgba(0, 0, 0, 0.25) 0 8px 15px',
                      transform: 'transform: translateY(-2px)',
                      border: '1px solid #EF2038',
                      color: '#FFFFFF',
                      backgroundColor: '#EF2038',
                    },
                  }}
                  variant='outlined'
                  onClick={handlePrice}
                >
                  <p>128gb</p>
                  <p>28.990.000 ??</p>
                </Button>
                <Button
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #EF2038',
                    color: '#EF2038',
                    transition: 'all 300ms cubic-bezier(0.23, 1, 0.32, 1)',
                    ':hover': {
                      boxShadow: 'rgba(0, 0, 0, 0.25) 0 8px 15px',
                      transform: 'transform: translateY(-2px)',
                      border: '1px solid #EF2038',
                      color: '#FFFFFF',
                      backgroundColor: '#EF2038',
                    },
                  }}
                  variant='outlined'
                  onClick={handlePrice}
                >
                  <p>128gb</p>
                  <p>28.990.000 ??</p>
                </Button>
              </Box>
              <Box
                sx={{
                  borderRadius: '10px',
                  marginBottom: '20px',
                  // background: 'linear-gradient(to bottom right, rgba(63,238,230,0.15), rgba(0,0,0,0) 750px)',
                  border: '1px dashed #EF2038 ',
                  marginTop: '50px',
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      color: '#EF2038',
                      margin: '-20px 0px 0px 20px',
                      padding: '0px 5px',
                      border: '1px solid #EF2038',
                      backgroundColor: '#ffffff',
                      width: '270px',
                      borderRadius: '20px',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img
                      src='https://bizweb.dktcdn.net/thumb/icon/100/459/533/themes/868331/assets/gift.gif?1676652384879'
                      style={{ marginBottom: '5px' }}
                    ></img>
                    <Typography
                      sx={{
                        fontSize: '18px',
                        fontWeight: 500,
                        marginLeft: '3px',
                      }}
                    >
                      KHUY???N M??I B??NG N???
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ padding: '10px 30px 30px 30px', fontFamily: 'Calibri', fontSize: '17px' }}>
                  <ul className='listdeal'>
                    <li>Gi???m th??m t???i 5% cho th??nh vi??n SAPOmember (??p d???ng t??y s???n ph???m)</li>
                    <li>B???o v??? s???n ph???m to??n di???n v???i d???ch v??? b???o h??nh m??? r???ng</li>
                    <li>Nh???p m?? T??ng ??o???p troai gi???m th??m 500k</li>
                    <li>Gi???m th??m t???i 300k cho ????n h??ng t??? 5 tri???u khi thanh to??n qua VNPAY</li>
                    <li>Thu c?? ?????i m???i h??? tr??? 1 tri???u</li>
                    <li>
                      1 ?????I 1 trong 30 ng??y n???u c?? l???i ph???n c???ng nh?? s???n xu???t. B???o h??nh 12 th??ng t???i trung t??m b???o h??nh
                      ch??nh h??ng
                    </li>
                    <li>Ph??? ki???n ??i k??m bao g???m: H???p, S??ch h?????ng d???n, C??y l???y sim, C??p Lightning - Type C</li>
                  </ul>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Button
                  variant='contained'
                  sx={{
                    borderRadius: '5px',
                    minHeight: '50px',
                    minWidth: '280px',
                    backgroundColor: '#EF2038',
                    transition: 'all 300ms cubic-bezier(0.23, 1, 0.32, 1)',
                    ':hover': {
                      boxShadow: 'rgba(0, 0, 0, 0.25) 0 8px 15px',
                      transform: 'transform: translateY(-2px)',
                      backgroundColor: '#EF2038',
                    },
                  }}
                >
                  <Box>
                    <Typography fontSize={16} fontWeight={600}>
                      MUA NGAY
                    </Typography>
                    <Typography fontSize={10}>(Giao t???n n??i ho???c l???y t???i c???a h??ng)</Typography>
                  </Box>
                </Button>
                <Button
                  variant='outlined'
                  sx={{
                    marginLeft: '10px',
                    border: '2px solid #EF2038',
                    borderRadius: '8px',
                    minHeight: '50px',
                    minWidth: '50px',
                    ':hover': {
                      boxShadow: 'rgba(0, 0, 0, 0.25) 0 8px 15px',
                      transform: 'transform: translateY(-2px)',
                      border: '2px solid #EF2038',
                    },
                    color: '#EF2038',
                  }}
                  onClick={() => addToCart(product, product.id)}
                >
                  <span>
                    <ShoppingCartIcon />
                  </span>
                  <Typography fontSize={8} fontWeight={700}>
                    th??m v??o gi???
                  </Typography>
                </Button>
              </Box>
            </Box>
            <Box sx={{ width: '300px', height: '500px', margin: '55px 15px 15px 15px', paddingTop: '0px' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  borderRadius: '10px',
                  marginBottom: '20px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFF3CD',
                }}
              >
                <Box sx={{ width: '50px', margin: '15px' }}>
                  <img src={Hotline} style={{ objectFit: 'contain', width: '100%', height: '100%' }}></img>
                </Box>
                <Typography sx={{ width: '200px', fontSize: '15px', marginLeft: '5px' }}>
                  G???i ngay <span style={{ fontSize: '16px', fontWeight: '600', color: '#EF2038' }}>19006 33909</span> ?????
                  ???????c t?? v???n (T??? 8:00-21:00)
                </Typography>
              </Box>
              <Box
                sx={{
                  border: '1px solid #EF2038',
                  borderRadius: '10px',
                  fontFamily: 'Calibri',
                  overflow: 'hidden',
                }}
              >
                <Typography
                  sx={{
                    color: '#ffffff',
                    backgroundColor: '#EF2038',
                    paddingLeft: '75px',
                    fontSize: '17px',
                    fontWeight: 550,
                  }}
                >
                  T?? v???n tr??? g??p
                </Typography>
                <Box
                  sx={{
                    padding: '5px 30px 30px 30px',
                    fontFamily: 'Calibri',
                  }}
                >
                  <ul className='listdeal'>
                    <li>Gi???m th??m t???i 1% cho th??nh vi??n Smember (??p d???ng t??y s???n ph???m)</li>
                    <li>B???o v??? s???n ph???m to??n di???n v???i d???ch v??? b???o h??nh m??? r???ng</li>
                    <li>Nh???p m?? t??ng ??o???p troai gi???m th??m 500k</li>
                    <li>Gi???m th??m t???i 300k cho ????n h??ng t??? 5 tri???u khi thanh to??n qua VNPAY</li>
                  </ul>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'Row' }}>
          <Box
            sx={{
              width: '800px',
              padding: '5px 20px 20px 30px',
              margin: '20px',
              border: '1px solid rgba(192,192,192,0.5)',
              borderRadius: '6px',
              fontFamily: 'Calibri',
            }}
          >
            <Typography variant={'h6'}>Chi ti???t s???n ph???m</Typography>
            <ul>
              <li>
                M??n h??nh Dynamic Island - S??? bi???n m???t c???a m??n h??nh tai th??? thay th??? b???ng thi???t k??? vi??n thu???c, OLED 6,7
                inch h??? tr??? always-on display
              </li>
              <li>C???u h??nh iPhone 14 Pro Max m???nh m???, hi???u n??ng c???c kh???ng t??? chipset A16 Bionic</li>
              <li>L??m ch??? c??ng ngh??? nhi???p ???nh - Camera sau 48MP, c???m bi???n TOF s???ng ?????ng</li>
              <li>Pin li???n lithium-ion k???t h???p c??ng c??ng ngh??? s???c nhanh c???i ti???n</li>
            </ul>
            <h3>di???n m???o</h3>
            <p>
              iPhone 14 Pro Max s??? v???n gi??? l???i ki???u thi???t k??? ?????c tr??ng ?????n t??? c??c th??? h??? tr?????c nh?? iPhone 13 series v???i
              c??c c???nh vu??ng v???c v?? hai m???t gia c??ng ph???ng, ????y v???n ???????c xem l?? ki???u thi???t k??? r???t th???nh h??nh v?? th??nh
              c??ng tr??n th??? tr?????ng di ?????ng t??nh ?????n th???i ??i???m hi???n t???i.
            </p>
          </Box>
          <Box
            sx={{ borderRadius: '5px', border: '1px solid rgba(192,192,192,0.5)', width: '340px', marginTop: '19px' }}
          >
            <Typography sx={{ paddingLeft: '20px', marginTop: '10px', fontWeight: 500 }}>Th??ng s??? k??? thu???t</Typography>
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: 'rgba(0, 0, 0, 0.1) 1px 1px 3px 3px',
                border: '1px solid rgba(192,192,192,0.5),',
                borderRadius: '10px',
                width: '319px',
                margin: '10px',
              }}
            >
              <Table sx={{ minWidth: 315 }} size='small' aria-label='a dense table'>
                <TableBody>
                  {listobjectA?.map((row: any) => (
                    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component='th' scope='row'>
                        {row.name}
                      </TableCell>
                      <TableCell>{row.calories}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
