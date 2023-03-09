import {
  getManufacturers,
  deleteManufacturer,
  createManufacture,
  updateManufacturer,
} from '../../../services/manufacturer.service';
import { useEffect, useState } from 'react';
import { Manufacturer, ManufacturerRequest } from '../../../types/manufacturer';
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Button,
  FormControl,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
} from '@mui/material';
import { Collection } from '../../../types/collection';
import CreateManufacturer from './CreateManufacturer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import CustomModal from '../Users/CustomModal';
import EditIcon from '@mui/icons-material/Edit';
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
): (
  a: { [key in Key]: number | string | Collection[] },
  b: { [key in Key]: number | string | Collection[] }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
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
  id: keyof Manufacturer;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Tên hãng sản xuất',
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'collections',
    numeric: true,
    disablePadding: false,
    label: 'Số lượng bộ sưu tập',
  },
  {
    id: 'created_at',
    numeric: true,
    disablePadding: false,
    label: 'Thời gian tạo',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Manufacturer) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Manufacturer) => (event: React.MouseEvent<unknown>) => {
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
  const { numSelected, arrayID, reload, setReload, setZIndexCustom } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  // const open = ;

  const handleClose = () => {
    setAnchorEl(null);
    // setOpen(false);
  };
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteManufacturer = (arr: string[]) => {
    const fetchManufacturer = async () => {
      arrayID.map(async (id) => {
        const response = await deleteManufacturer(parseInt(id));
      });

      setReload(!reload);
      handleClose();
    };

    fetchManufacturer();
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
        width: '100%',
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
        <Tooltip title={undefined}>
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
              <MenuItem onClick={() => handleDeleteManufacturer(arrayID)}>
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

function ListManufacturer() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Manufacturer>('id');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [manufacturers, setManufacturer] = useState<Manufacturer[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [zIndexCustom, setZIndexCustom] = useState<number>(-100);
  const [manufacturerId, setManufacturerId] = useState<undefined | number>();
  const [manufacturerName, setManufacturerName] = useState<undefined | string>();
  const [showClearIcon, setShowClearIcon] = useState('none');
  const [valueInputSearch, setValueInputSearch] = useState('');
  const [option, setOption] = useState('');

  useEffect(() => {
    const fetchManufacturers = async () => {
      const response = await getManufacturers();
      setManufacturer(response);
    };
    fetchManufacturers();
    setReload(false);
    setSelected([]);
  }, [reload]);
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Manufacturer) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handlingReceiveData = async (name: string, option: string, id: number) => {
    const manufacturerRequest: ManufacturerRequest = {
      name: name,
    };
    let response;
    if (option === 'create') {
      response = await createManufacture(manufacturerRequest);
    } else if (option === 'update') {
      response = await updateManufacturer(id, manufacturerRequest);
    }
  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = manufacturers.map((n) => n.name);
      setSelected(newSelected);
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
      setZIndexCustom(-100);
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - manufacturers.length) : 0;
  const handleChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === '' ? 'none' : 'flex');
    setValueInputSearch(event.target.value);
  };
  const handleClick1 = (): void => {
    setValueInputSearch('');
    setShowClearIcon('none');
  };

  const handleConvertDateToString = (date: string) => {
    const event = new Date(date);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return event.toLocaleDateString();
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSubmit = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteManufacturer = (id: number) => {
    const fetchManufacturer = async () => {
      const response = await deleteManufacturer(id);

      setReload(!reload);
      handleClose();
    };

    fetchManufacturer();
    setZIndexCustom(-100);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, position: 'relative' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ mt: '16px', margin: '10px' }}>
            <FormControl>
              <TextField
                placeholder='Tìm kiếm theo tên'
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
          <Box>
            <Button
              sx={{ float: 'right' }}
              onClick={() => {
                open ? setOpen(false) : setOpen(true);
                setOption('create');
                setManufacturerId(undefined);
                setManufacturerName(undefined);
              }}
            >
              <AddCircleOutlineIcon />
              Thêm hãng sản phẩm
            </Button>
            <CustomModal
              content={
                <Box
                  sx={{
                    width: 500,
                    height: 200,
                  }}
                >
                  <CreateManufacturer
                    onClick={handlingReceiveData}
                    reload={reload}
                    setReload={setReload}
                    open={open}
                    setOpen={setOpen}
                    option={option}
                    manufacturerId={manufacturerId}
                    manufacturerName={manufacturerName}
                  />
                </Box>
              }
              open={open}
              setOpen={setOpen}
            />
          </Box>
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
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={manufacturers.length}
            />
            <TableBody>
              {stableSort(manufacturers, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((manufacturer, index) => {
                  const isItemSelected = isSelected(manufacturer.id.toString());
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={manufacturer.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='normal'
                        onClick={(event) => handleClick(event, manufacturer.id.toString())}
                      >
                        {manufacturer.name}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, manufacturer.id.toString())}>
                        {manufacturer.id}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, manufacturer.id.toString())}>
                        {manufacturer.collections.length}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, manufacturer.id.toString())}>
                        {handleConvertDateToString(manufacturer.created_at)}
                      </TableCell>
                      <TableCell align='right'>
                        <IconButton
                          aria-label='edit'
                          onClick={() => {
                            open ? setOpen(false) : setOpen(true);
                            setOption('update');
                            setManufacturerId(manufacturer.id);
                            setManufacturerName(manufacturer.name);
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
                              handleDeleteManufacturer(manufacturer.id);
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
          count={manufacturers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default ListManufacturer;
