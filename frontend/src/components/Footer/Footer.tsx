import { Container, Box, Grid, Icon } from '@mui/material';
import '../../sass/main.scss';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { LogoImage } from '../../image';
import { addressIcon } from '../../image';
import { phoneIcon } from '../../image';
import { emailIcon } from '../../image';
import { payIcon } from '../../image';

export function Footer() {
  const Item = styled(Paper)(() => ({
    textAlign: 'center',
    height: '260px',
    border: 'none',
    boxShadow: 'none',
  }));
  const infoItem1 = {
    logo: { logoName: '_footer-logo', logosrc: LogoImage },
    infoDetail: { number: 123456789, address: '266 Đội Cấn', email: 'support@sapo.vn' },
  };
  const spCustomers = [
    'giới thiệu',
    'liên hệ',
    'hệ thống của hàng',
    'hướng dẫn trả góp',
    'hướng dẫn mua hàng Online',
    'câu hỏi thường gặp',
  ];
  const spPolicys = ['chính sách bảo mật', 'chính sách đổi trả', 'chính sách bảo hành', 'chính sách đặt cọc, giữ hàng'];
  const spSwitchboards = [
    { name: 'gọi mua hàng', phone: 19006750, time: '8h-20h' },
    { name: 'gọi bảo hành', phone: 19006750, time: '8h-20h' },
    { name: 'gọi khiếu lại', phone: 19006750, time: '8h-20h' },
  ];

  return (
    <footer className='footer'>
      <Container sx={{ height: '250px', paddingTop: '15px' }} maxWidth={'lg'}>
        <Box sx={{ flexGrow: 1, height: '250px' }}>
          <Grid container spacing={2} columns={16}>
            <Grid item xs={4}>
              <Item sx={{ display: 'flex', flexFlow: 'column',background:'none' }}>
                <div>
                  <img src={infoItem1.logo.logosrc} className={infoItem1.logo.logoName} height={50} width={130} />
                </div>
                <ul className='infoDetail'>
                  <li style={{ fontSize: '15px' }}>
                    <img src={addressIcon} alt='' className='child' />
                    <span className='child index'>địa chỉ:</span>
                    <span className='child'>{infoItem1.infoDetail.address}</span>
                  </li>
                  <li style={{ fontSize: '15px' }}>
                    <img src={phoneIcon} alt='' className='child' />
                    <span className='child index'>số điện thoại:</span>
                    <span className='child'>{infoItem1.infoDetail.number}</span>
                  </li>
                  <li style={{ fontSize: '15px' }}>
                    <img src={emailIcon} alt='' className='child' />
                    <span className='child index'>email:</span>
                    <span className='child'>{infoItem1.infoDetail.email}</span>
                  </li>
                </ul>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{background:'none'}}>
                <ul className='spList'>
                  {spCustomers.map((spCustomer, idx) => (
                    <li key={idx}>
                      <span>{spCustomer}</span>
                    </li>
                  ))}
                </ul>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{background:'none'}}>
                <ul className='spList'>
                  {spPolicys.map((spPloicy, idx) => (
                    <li key={idx}>
                      <span>{spPloicy}</span>
                    </li>
                  ))}
                </ul>
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item sx={{background:'none'}}>
                <ul className='spList'>
                  {spSwitchboards.map((spSwitchboard, idx) => (
                    <li key={idx}>
                      <span className='name'>{spSwitchboard.name}:</span>
                      <span className='phone'>{spSwitchboard.phone}</span>
                      <span className='time'>({spSwitchboard.time})</span>
                    </li>
                  ))}
                </ul>
                <h5 className='header'>phương thức thanh toán</h5>
                <div>
                  <img src={payIcon} alt='' className='pay' />
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container sx={{ height: '40px' }} maxWidth={'lg'}>
        {' '}
        Công ty TNHH ABC | Cung cấp bởi Sapo
      </Container>
    </footer>
  );
}
