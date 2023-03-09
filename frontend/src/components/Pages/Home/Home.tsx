import { Box } from '@mui/material';
import Category from '../../Category/Category';
import { Footer } from '../../Footer/Footer';
import Header from '../../Header/Header';
import ListCategory from '../../ListCategory/ListCategory';
import SlideSale from '../../SlideSale/SlideSale';
import TopSale from '../../Topsale/Topsale';
import { Banner1, Banner } from '../../../image';
export function Home() {
  return (
    <Box sx={{ backgroundColor: '#f4f4f4' }}>
      <Header />
      <div className='slide-header'>
        <img className='img' src={Banner} alt='' width={1920} />
      </div>
      <div className='homepage-container'>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Box>
            <SlideSale />
          </Box>
        </Box>
        <Box>
          <ListCategory />
        </Box>
        <Box>
          <TopSale />
        </Box>
        <Box>
          <Category />
        </Box>
      </div>
      <Footer />
    </Box>
  );
}
