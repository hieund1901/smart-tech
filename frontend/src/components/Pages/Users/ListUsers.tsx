import { getUserDetails } from '../../../services/user.service';
import { useEffect, useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { visuallyHidden } from '@mui/utils';
import { UserDetail } from '../../../types/user';
import { FormControl, InputAdornment, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Filter from './Filter';
import SearchIcon from '@mui/icons-material/Search';
import { Column } from './TypeData';
import CustomModal from './CustomModal';
import UserDetailComponent from './UserDetailComponent';
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
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
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
  id: keyof UserDetail;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID khách hàng',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Tên khách hàng',
  },
  {
    id: 'phone',
    numeric: true,
    disablePadding: false,
    label: 'Số điện thoại',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Địa chỉ',
  },
  {
    id: 'totalOrder',
    numeric: true,
    disablePadding: false,
    label: 'Số lượng đơn hàng',
  },
  {
    id: 'lastOrder',
    numeric: true,
    disablePadding: false,
    label: 'Đơn hàng gần nhất',
  },
  {
    id: 'lastLoginAt',
    numeric: true,
    disablePadding: false,
    label: 'Lần cuối đăng nhập',
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Thời gian tạo',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof UserDetail) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof UserDetail) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ padding: '5px' }}
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
      </TableRow>
    </TableHead>
  );
}
const column: Column[] = [
  { id: 1, type: 'string', field: 'ID khách hàng' },
  { id: 2, type: 'string', field: 'Email' },
  { id: 3, type: 'string', field: 'Tên khách hàng' },
  { id: 4, type: 'number', field: 'Số điện thoại' },
  { id: 5, type: 'string', field: 'Địa chỉ' },
  { id: 6, type: 'number', field: 'Số lượng đơn hàng' },
  { id: 7, type: 'number', field: 'Đơn hàng gần nhất' },
  { id: 8, type: 'number', field: 'Lần cuối đăng nhập' },
  { id: 9, type: 'time', field: 'Thời gian tạo' },
];
function ListUsers() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof UserDetail>('id');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = useState<UserDetail[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showClearIcon, setShowClearIcon] = useState('none');
  const [valueInputSearch, setValueInputSearch] = useState('');
  const [open, setOpen] = useState(false);
  const handleChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === '' ? 'none' : 'flex');
    setValueInputSearch(event.target.value);
  };
  const handleClick1 = (): void => {
    setValueInputSearch('');
    setShowClearIcon('none');
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await getUserDetails();
      console.log(response);
      setUsers(response);
    };
    fetchUserDetails();
  }, []);
  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof UserDetail) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    console.log('đã click');
    setSelected([]);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
  const handleTakeDataChild = (column: string, compare: string, info: string) => {
    console.log('column', column);
    console.log('compare', compare);
    console.log('info', info);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        {/* <EnhancedTableToolbar numSelected={selected.length} arrayID={selected} /> */}
        <Box component='div' sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
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
          <Box sx={{ float: 'left' }}>
            <Filter column={column} onClick={handleTakeDataChild} />
          </Box>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle' size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {stableSort(users, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  console.log("user ",user)
                  const isItemSelected = isSelected(user.id.toString());
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={user.id}
                      onClick={() => setOpen(true)}
                    >
                      <TableCell component='th' id={labelId} scope='row' padding='normal'>
                        {user.id}
                      </TableCell>
                      <TableCell align='left'>{user.name}</TableCell>
                      <TableCell align='left'>{user.phone}</TableCell>
                      <TableCell align='left'>{user.phone}</TableCell>
                      <TableCell align='left'>{user.address}</TableCell>
                      <TableCell align='left'>{user.totalOrder}</TableCell>
                      <TableCell align='left'>{user.lastOrder}</TableCell>
                      <TableCell align='left'>{user.lastLoginAt}</TableCell>
                      <TableCell align='left'>{user.createdAt}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label='Dense padding' />
      <CustomModal
        content={
          <>
            <UserDetailComponent />
          </>
        }
        open={open}
        setOpen={setOpen}
      />
    </Box>
  );
}

export default ListUsers;
