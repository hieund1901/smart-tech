import { useEffect, useState } from 'react';
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Products } from '../../../types/products';
import { deleteProduct, getAllProducts } from '../../../services/products.service';
import CreateProducts from './CreateProducts';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  ImageList,
  ImageListItem,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import CustomModal from '../Users/CustomModal';
import { alpha } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { array } from 'decoders';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string | object }, b: { [key in Key]: number | string | object }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Products;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Tên sản phẩm',
  },
  {
    id: 'imageBase64',
    numeric: false,
    disablePadding: true,
    label: 'Ảnh sản phẩm',
  },
  {
    id: 'shortName',
    numeric: true,
    disablePadding: false,
    label: 'Tên hiện thị',
  },
  {
    id: 'importingPrice',
    numeric: true,
    disablePadding: false,
    label: 'Giá nhập vào',
  },
  {
    id: 'sellingPrice',
    numeric: true,
    disablePadding: false,
    label: 'Giá bán ra',
  },
  {
    id: 'discount',
    numeric: true,
    disablePadding: false,
    label: 'Giảm giá',
  },
  {
    id: 'remainingAmount',
    numeric: true,
    disablePadding: false,
    label: 'Số lượng còn lại',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Products) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Products) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align='right' sx={{ width: 100, padding: '8px' }}>
          chỉnh sửa
        </TableCell>
        <TableCell align='center' sx={{ width: 50, padding: '8px' }}>
          xóa
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  arrayID: string[];
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setZIndexCustom: React.Dispatch<React.SetStateAction<number>>;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, arrayID, setZIndexCustom, reload, setReload } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(open);
  };
  const handleDeleteProducts = (arr: string[]) => {
    console.log('arrayID', arrayID);
    const fetchProducts = async () => {
      arrayID.map(async (id) => {
        const response = await deleteProduct(parseInt(id));
        console.log(response);
        setReload(!reload);
      });
      
      handleClose();
    };

    fetchProducts();
    setZIndexCustom(-100);
  };
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
          {numSelected} selected
        </Typography>
      ) : (
        <></>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <Box>
            <IconButton onClick={(e) => handleOpen(e)}>
              <DeleteIcon />
            </IconButton>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  handleDeleteProducts(arrayID);
                }}
              >
                <ListItemIcon>
                  <DoneIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText sx={{ fontSize: '15px' }}>Đồng ý</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <CloseIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText sx={{ fontSize: '15px' }}>Từ chối</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Tooltip>
      ) : (
        <></>
      )}
    </Toolbar>
  );
}

export default function ListProducts() {
  const [open, setOpen] = useState(false);
  const [showClearIcon, setShowClearIcon] = useState('none');
  const [valueInputSearch, setValueInputSearch] = useState('');
  const [products, setProducts] = useState<Products[]>([]);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Products>('id');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [zIndexCustom, setZIndexCustom] = useState<number>(-100);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const getProducts = async () => {
      const response = await getAllProducts();
      console.log("esponse",response.length)
      setProducts(response);
    };
    getProducts();
    setReload(false);
    console.log('đã reload');
    setSelected([]);
  }, [reload]);

  console.log('products', products.length);

  console.log('reload', reload);
  const handleChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === '' ? 'none' : 'flex');
    setValueInputSearch(event.target.value);
  };
  const handleClick1 = (): void => {
    setValueInputSearch('');
    setShowClearIcon('none');
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Products) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = products.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      setZIndexCustom(100);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      setZIndexCustom(-100);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    console.log('newSelected', newSelected);
    setShowDelete(true);
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSubmit = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubmit = () => {
    setReload(true);
    setOpen(false);
    console.log('reload-sub', reload);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ mt: '16px', margin: '10px' }}>
              <FormControl>
                <TextField
                  placeholder='Tìm kiếm theo id, tên, SĐT, địa chỉ'
                  size='small'
                  variant='outlined'
                  onChange={handleChangeInputSearch}
                  sx={{
                    minWidth: '50px',
                    width: '830px',
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        style={{ display: showClearIcon, cursor: 'pointer' }}
                        onClick={handleClick1}
                      >
                        <ClearIcon />
                      </InputAdornment>
                    ),
                  }}
                  value={valueInputSearch}
                />
              </FormControl>
            </Box>
            <Button
              sx={{ float: 'left' }}
              onClick={() => {
                setOpen(true);
              }}
            >
              <AddCircleOutlineIcon />
              Thêm sản phẩm
            </Button>
          </Box>
          <CustomModal
            content={
              <>
                <Box
                  sx={{
                    width: '1500px',
                    height: '850px',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    overscrollBehavior: 'contain',
                  }}
                >
                  <CreateProducts onClick={handleSubmit} />
                </Box>
              </>
            }
            open={open}
            setOpen={setOpen}
          />

          {/* <DataGrid rows={products} columns={columns} pageSize={10} rowsPerPageOptions={[10]} checkboxSelection /> */}
        </Box>

        {showDelete ? (
          <Box
            component='div'
            sx={{
              width: '-webkit-fill-available',
              marginRight: '20px',
              position: 'fixed',
              top: '65px',
              backgroundColor: '#ffffff',
              zIndex: zIndexCustom,
            }}
          >
            <EnhancedTableToolbar
              numSelected={selected.length}
              arrayID={selected}
              reload={reload}
              setReload={setReload}
              setZIndexCustom={setZIndexCustom}
            />
          </Box>
        ) : null}
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={products.length}
            />
            <TableBody>
              {stableSort(products, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((product, index) => {
                  const isItemSelected = isSelected(product.id.toString());
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={product.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='normal'
                        onClick={(event) => handleClick(event, product.id.toString())}
                      >
                        <Typography sx={{ width: '150px' }}>{product.name}</Typography>
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, product.id.toString())}>
                        <ImageList sx={{ width: '100px', height: '100px' }} cols={1}>
                          <ImageListItem key={product.imageBase64}>
                            <img src={product.imageBase64} alt='' sizes='' />
                          </ImageListItem>
                        </ImageList>
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, product.id.toString())}>
                        {product.shortName}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, product.id.toString())}>
                        {product.importingPrice}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, product.id.toString())}>
                        {product.sellingPrice}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, product.id.toString())}>
                        {product.discount}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, product.id.toString())}>
                        {product.remainingAmount}
                      </TableCell>
                      <TableCell align='right'>
                        <IconButton
                          aria-label='edit'
                          onClick={() => {
                            open ? setOpen(false) : setOpen(true);
                            // setOption('update');
                            // setManufacturerId(manufacturer.id);
                            // setManufacturerName(manufacturer.name);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align='right'>
                        <IconButton
                          aria-label='delete'
                          // onClick={(event) => handleClick(event, manufacturer.id.toString())}
                          onClick={(e) => handleOpen(e)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <Menu
                          id='basic-menu'
                          anchorEl={anchorEl}
                          open={openSubmit}
                          onClose={handleClose}
                          MenuListProps={{
                            'aria-labelledby': 'basic-button',
                          }}
                        >
                          <MenuItem
                            onClick={() => {
                              // handleDeleteManufacturer(manufacturer.id);
                            }}
                          >
                            <ListItemIcon>
                              <DoneIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText sx={{ fontSize: '15px' }}>Đồng ý</ListItemText>
                          </MenuItem>
                          <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                              <CloseIcon fontSize='small' />
                            </ListItemIcon>
                            <ListItemText sx={{ fontSize: '15px' }}>Từ chối</ListItemText>
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component='div'
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
