import { Box, Card, CardActions, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Products } from '../../types/products';

interface Props {
  item: Products;
  //   handleAddToCart: (clickedItem: Products) => void;
}

const Product: React.FC<Props> = ({ item }) => {
  const navigate: NavigateFunction = useNavigate();

  const handleGetProduct = (id: any) => {
    console.log(id);
    navigate('/product/' + id);
  };
  return (
    <Box>
      <Card sx={{ width: 192, height: 320 }} onClick={() => handleGetProduct(item.id)}>
        <CardMedia sx={{ height: '140px', width: '140px' }} image={item.imageBase64} title={item.name} />
        <Box sx={{ textOverflow: 'ellipsis' }}>
          <CardContent>
            <Typography
              variant='caption'
              display='block'
              gutterBottom
              noWrap={true}
              sx={{ cursor: 'pointer', fontWeight: 700 }}
            >
              {item.name}
            </Typography>
            <Typography variant='caption' display='block' gutterBottom>
              {item.detail}
            </Typography>
            <Typography variant='body2' display='block' gutterBottom sx={{ color: '#d80000', fontWeight: 700 }}>
              {item.sellingPrice}đ
            </Typography>
          </CardContent>
        </Box>
        <CardActions>
          <Button size='small'>
            <p>Thêm vào giỏ hàng</p>
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default Product;
