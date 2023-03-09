import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import { LogoMini } from '../../image';
import { MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListIcon from '@mui/icons-material/List';
import AddBoxIcon from '@mui/icons-material/AddBox';

const drawerWidth = 256;
const primaryColor = '#fff';
const secondColor = '#182537';
const fontColor = '#000';
const fontSize = '14px';

type Props = {
  listProducts?: React.ReactNode;
  listCollections?: React.ReactNode;
  listUsers?: React.ReactNode;
  listManufacturers?: React.ReactNode;
  createProducts?: React.ReactNode;
  listCategories?: React.ReactNode;
};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: `${primaryColor}`,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  backgroundColor: `${secondColor}`,
}));

export default function Dashboard(props: Props) {
  const { listProducts, listCollections, listUsers, listManufacturers, createProducts, listCategories } = props;

  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const [expand, setExpand] = useState<boolean>(true);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [header, setHeader] = useState<string>('');

  const navigate: NavigateFunction = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setExpand(!expand);
  };

  const logOut = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open} sx={{ backgroundColor: `${primaryColor}`, color: `${fontColor}` }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
            {header}
          </Typography>
          <div>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              color='inherit'
              onClick={handleMenu}
            >
              <AccountCircle sx={{ color: `${fontColor}` }} />
            </IconButton>
            <IconButton>
              <NotificationsNoneIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={logOut}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: `${secondColor}`,
            color: `${primaryColor}`,
          },
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <img src={LogoMini} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton>
            <ListItemIcon sx={{ color: `${primaryColor}` }}>
              <LeaderboardIcon />
            </ListItemIcon>
            <ListItemText primary='Thống kê' primaryTypographyProps={{ fontSize: `${fontSize}` }} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon sx={{ color: `${primaryColor}` }}>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary='Danh sách đơn hàng' primaryTypographyProps={{ fontSize: `${fontSize}` }} />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon sx={{ color: `${primaryColor}` }}>
              <ManageSearchIcon />
            </ListItemIcon>
            <ListItemText
              primary='Quản lý danh mục'
              primaryTypographyProps={{ fontSize: `${fontSize}` }}
              onClick={() => {
                setHeader('Danh sách danh mục');
                navigate('/list-categories');
              }}
            />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon sx={{ color: `${primaryColor}` }}>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary='Quản lý sản phẩm' primaryTypographyProps={{ fontSize: `${fontSize}` }} />
            {expand ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={!expand} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 4 }} onClick={() => {}}>
                <ListItemIcon>
                  <ListIcon sx={{ color: `${primaryColor}` }} />
                </ListItemIcon>
                <ListItemText
                  primary='Danh sách sản phẩm'
                  primaryTypographyProps={{ fontSize: `${fontSize}` }}
                  onClick={() => {
                    setHeader('Danh sách sản phẩm');
                    navigate('/list-products');
                  }}
                />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AddBoxIcon sx={{ color: `${primaryColor}` }} />
                </ListItemIcon>
                <ListItemText
                  primary='Thêm sản phẩm'
                  primaryTypographyProps={{ fontSize: `${fontSize}` }}
                  onClick={() => {
                    setHeader('Thêm sản phẩm');
                    navigate('/create-products');
                  }}
                />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton>
            <ListItemIcon sx={{ color: `${primaryColor}` }}>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText
              primary='Danh sách người dùng'
              primaryTypographyProps={{ fontSize: `${fontSize}` }}
              onClick={() => {
                setHeader('Danh sách người dùng');
                navigate('/list-users');
              }}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon sx={{ color: `${primaryColor}` }}>
              <ManageSearchIcon />
            </ListItemIcon>
            <ListItemText
              primary='Quản lý bộ sưu tập'
              primaryTypographyProps={{ fontSize: `${fontSize}` }}
              onClick={() => {
                setHeader('Quản lý bộ sưu tập');
                navigate('/list-collections');
              }}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon sx={{ color: `${primaryColor}` }}>
              <FactCheckIcon />
            </ListItemIcon>
            <ListItemText
              primary='Quản lý hãng sản phẩm'
              primaryTypographyProps={{ fontSize: `${fontSize}` }}
              onClick={() => {
                setHeader('Quản lý hãng sản phẩm');
                navigate('/list-manufacturers');
              }}
            />
          </ListItemButton>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader sx={{ backgroundColor: `${primaryColor}` }} />
        {listProducts} {listCollections} {listUsers} {listManufacturers} {createProducts} {listCategories}
      </Main>
    </Box>
  );
}
