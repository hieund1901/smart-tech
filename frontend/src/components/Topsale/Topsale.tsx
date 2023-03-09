import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Icon, Paper, Typography } from '@mui/material';
import OfflineBoltSharpIcon from '@mui/icons-material/OfflineBoltSharp';
import { flashsale, ipadpro, Iphone13, Iphone14, macM2, s23ultra, zflip4 } from '../../image';

export default function TopSale() {
  const topsaledb = [
    {
      id: 1,
      name: 'Iphone14 Pro Max 256gb',
      img: Iphone14,
      price: 29000000,
    },
    {
      id: 2,
      name: 'SamSung S23Ultra 512gb',
      img: s23ultra,
      price: 24900000,
    },
    {
      id: 3,
      name: 'SamSung ZFlip 4 128gb',
      img: zflip4,
      price: 19900000,
    },
    {
      id: 4,
      name: 'Iphone 13 128gb Chính hãng VNA',
      img: Iphone13,
      price: 18900000,
    },
    {
      id: 5,
      name: 'Apple MacBook Air M2 2022',
      img: macM2,
      price: 23000000,
    },
    {
      id: 6,
      name: 'Ipad Pro 11 2021 Wifi 128gb',
      img: ipadpro,
      price: 19500000,
    },
  ];
  return (
    <Box
      sx={{
        width: '1100px',
        minHeight: '350px',
        marginTop: '20px',
        background: 'linear-gradient(to bottom , rgb(239,32,56), rgba(255,255,0,0.1) 400px)',
        borderRadius: '10px',
      }}
    >
      <Box sx={{ paddingTop: '5px', display: 'flex', justifyContent: 'center' }}>
        <img src={flashsale} alt='iphone' width={'430px'} height={'50px'} />
      </Box>

      <Box sx={{ marginTop: '20px' }}>
        <Grid>
          <Grid>
            <Grid container justifyContent='center' spacing={2}>
              {topsaledb.map((product) => (
                <Grid key={product.id} item>
                  <Card sx={{ width: 165, height: 240, borderRadius: '8px' }}>
                    <CardActionArea>
                      <Box sx={{ alignContent: 'center' }}>
                        <img className='imgtopsale' src={product.img} alt='iphone' width={'100px'} height={'100px'} />
                      </Box>
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='div' fontSize={15} fontWeight={600}>
                          {product.name}
                        </Typography>
                        <Typography variant='body2' color='red' fontWeight={550}>
                          {product.price} ₫
                        </Typography>
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
