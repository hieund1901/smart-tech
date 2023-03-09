import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Button, Grid, Icon, Tooltip, Typography } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { Banner1, Banner3,Banner2, bannerSlide, bannerSlide2, bannerSlide3, bannerSlide1 } from '../../image';




const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'Banner1',
    imgPath: bannerSlide,
  },
  {
    label: 'Banner2',
    imgPath:bannerSlide1,
  },
  {
    label: 'Banner3',
    imgPath:bannerSlide2,
  },
  {
    label: 'Banner4',
    imgPath:bannerSlide3,
  }
];

function SlideSale() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ maxWidth: 1200, flexGrow: 1, mt: '10px', display: 'flex', flexDirection: 'row' }}>
        {/* <Grid item>
        <Tooltip title='Miễn phí đổi trả' placement='top-start'>
          <Button sx={{ color: 'black' }}>
            <Icon>
              <LoopIcon sx={{ marginBottom: '4px', paddingRight: '3px' }} />
            </Icon>
            Đổi trả 15 ngày
          </Button>
        </Tooltip>
        <Tooltip title='Miễn phí giao hàng' placement='top'>
          <Button sx={{ color: 'black' }}>
            <Icon>
              <LocalShippingIcon sx={{ marginBottom: '4px', paddingRight: '3px' }} />
            </Icon>
            Freeship toàn quốc
          </Button>
        </Tooltip>
        <Tooltip title='giảm giá cực tốt' placement='top-end'>
          <Button sx={{ color: 'black' }}>
            <Icon>
              <CardGiftcardIcon sx={{ marginBottom: '4px', paddingRight: '3px' }} />
            </Icon>
            Giảm giá khi thanh toán online
          </Button>
        </Tooltip>
      </Grid> */}

        <Box
          sx={{
            boxShadow: 'rgba(0, 0, 0, 0.05) 0 3px 3px',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component='img'
                    sx={{
                      height: 360,
                      display: 'block',
                      maxWidth: 740,
                      overflow: 'hidden',
                      width: '100%',
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box
            sx={{
              height: '110px',
              width: '370px',
              borderRadius: '10px',
              overflow: 'hidden',
              margin: '0px 0px 5px 10px',
            }}
          >
            <img src={Banner1} alt='' height={110} width={370} />
          </Box>
          <Box
            sx={{
              height: '110px',
              width: '370px',
              borderRadius: '10px',
              overflow: 'hidden',
              margin: '5px 0px 5px 10px',
            }}
          >
            <img src={Banner2} alt='' height={110} width={370} />
          </Box>
          <Box
            sx={{
              height: '110px',
              width: '370px',
              borderRadius: '10px',
              overflow: 'hidden',
              margin: '5px 0px 5px 10px',
            }}
          >
            <img src={Banner3} alt='' height={110} width={370} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '20px 10px 20px 10px' }}>
        <Tooltip title='Sản phẩm chính hãng' placement='top-start'>
          <Box
            sx={{
              display: 'flex',
              color: 'black',
              fontSize: '13px',
              width: '250px',
              borderRadius: '12px',
              backgroundColor: 'white',
              fontFamily: 'Arial',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60px',
              boxShadow: 'rgba(0, 0, 0, 0.05) 3px 3px',
            }}
          >
            <Icon sx={{ marginRight: '5px', color: '#2EC778', fontSize: '30px' }}>
              <VerifiedUserOutlinedIcon sx={{ color: '#2EC778', fontSize: '25px' }} />
            </Icon>
            <Typography fontFamily={'Arial'} fontSize={14} color={'#808080'}>
              Sản phẩm chính hãng
            </Typography>
          </Box>
        </Tooltip>
        <Tooltip title='Miễn phí đổi trả' placement='top-start'>
          <Box
            sx={{
              display: 'flex',
              color: 'black',
              fontSize: '13px',
              width: '250px',
              borderRadius: '12px',
              backgroundColor: 'white',
              fontFamily: 'Arial',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60px',
              boxShadow: 'rgba(0, 0, 0, 0.05) 3px 3px',
            }}
          >
            <Icon sx={{ marginRight: '5px', color: '#2EC778', fontSize: '30px' }}>
              <LoopIcon sx={{ color: '#2EC778', fontSize: '25px' }} />
            </Icon>
            <Typography fontFamily={'Arial'} fontSize={14} color={'#808080'}>
              Miễn phí đổi trả
            </Typography>
          </Box>
        </Tooltip>
        <Tooltip title='Giao hàng toàn quốc' placement='top-start'>
          <Box
            sx={{
              display: 'flex',
              color: 'black',
              fontSize: '13px',
              width: '250px',
              borderRadius: '12px',
              backgroundColor: 'white',
              fontFamily: 'Arial',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60px',
              boxShadow: 'rgba(0, 0, 0, 0.05) 3px 3px',
            }}
          >
            <Icon sx={{ marginRight: '5px', color: '#2EC778', fontSize: '30px' }}>
              <LocalShippingIcon sx={{ color: '#2EC778', fontSize: '25px' }} />
            </Icon>
            <Typography fontFamily={'Arial'} fontSize={14} color={'#808080'}>
              Giao hàng toàn quốc
            </Typography>
          </Box>
        </Tooltip>
        <Tooltip title='Ưu đãi ngập tràn' placement='top-start'>
          <Box
            sx={{
              display: 'flex',
              color: 'black',
              fontSize: '13px',
              width: '250px',
              borderRadius: '12px',
              backgroundColor: 'white',
              fontFamily: 'Arial',
              justifyContent: 'center',
              alignItems: 'center',
              height: '60px',
              boxShadow: 'rgba(0, 0, 0, 0.05) 3px 3px',
            }}
          >
            <Icon sx={{ marginRight: '5px', color: '#2EC778', fontSize: '30px' }}>
              <CardGiftcardIcon sx={{ color: '#2EC778', fontSize: '25px' }} />
            </Icon>
            <Typography fontFamily={'Arial'} fontSize={14} color={'#808080'}>
              Ưu đãi ngập tràn
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default SlideSale;
