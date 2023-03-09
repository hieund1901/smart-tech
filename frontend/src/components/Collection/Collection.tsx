import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getCollectionById, getProductById, getProductTopSelling } from '../../services/apiRequest';
import { Iphone14 } from '../../image';
import ProductCard from '../ProductCard/ProductCard';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export default function Collection(idcategory: any) {
  const [products, setProducts] = useState([{ id: 1, name: '', sellingPrice: null, imageBase64: '' }]);
  const id = idcategory.idcategory;
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  // const fetchCollection = async () => {
  //   const response = await getCollectionById(id);
  //   setProducts(response);
  // };
  const fetchProduct = async () => {
    const response = await getProductTopSelling(id, 5);
    setProducts(response);
  };

  useEffect(() => {
    fetchProduct();
  }, []);
  // console.log(products);

  const handleGetProduct = (id: any) => {
    navigate('/product/' + id);
  };

  return (
    <Box sx={{ width: '1100px', minHeight: '330px', marginTop: '20px' }}>
      <Box sx={{ marginTop: '15px' }}>
        <Grid>
          <Grid>
            <Grid container justifyContent='center' spacing={4}>
              {products.map((product) => (
                <Grid key={product.id} item>
                  <Card
                    onClick={() => handleGetProduct(product.id)}
                    sx={{
                      width: 180,
                      height: 260,
                      borderRadius: '8px',
                      boxShadow: 'rgba(0, 0, 0, 0.1) 1px 0px 4px 4px',
                    }}
                  >
                    <CardActionArea sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          alignContent: 'center',
                          width: '115px',
                          height: '115px',
                          justifyItems: 'center',
                          marginTop: '15px',
                        }}
                      >
                        <img
                          src={product.imageBase64}
                          style={{
                            objectFit: 'contain',
                            width: '100%',
                            height: '100%',
                          }}
                        />
                      </Box>
                      <CardContent>
                        <Typography fontSize={15} sx={{ marginBottom: '5px', fontWeight: '550', color: '#666666' }}>
                          {product.name}
                        </Typography>
                        <Typography variant='body2' fontWeight={550} color={'red'}>
                          {product.sellingPrice} ₫
                        </Typography>
                        <Box display={'flex'} flexDirection={'row'}>
                          <Typography
                            sx={{
                              borderRadius: '3px',
                              backgroundColor: '#F7941E',
                              color: '#ffffff',
                              height: '18px',
                              width: '40px',
                              padding: '1px 2px',
                              margin: '3px 3px 0px 0px',
                              boxShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 3px',
                              ':hover': {
                                scale: '1.1',
                              },
                            }}
                            fontSize={12}
                            fontWeight={600}
                          >
                            KM
                          </Typography>
                          <Typography fontSize={11} fontWeight={550} variant={'body2'} color={'#888888'}>
                            Giảm thêm 500.000 khi thanh toán qua BIDV
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
