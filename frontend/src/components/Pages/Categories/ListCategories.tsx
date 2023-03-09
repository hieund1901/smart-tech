import { useEffect, useState } from 'react';
import { Category, CategoryRequest, Collection } from '../../../types/category';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
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
import { deleteCategory, getCategories, createCategory, updateCategory } from '../../../services/category.service';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateCategory from './CreateCategory';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CustomModal from '../Users/CustomModal';

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
  id: keyof Category;
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
    label: 'Số lượng danh mục',
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
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Category) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Category) => (event: React.MouseEvent<unknown>) => {
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

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    console.log(open);
  };
  const handleDeleteCategory = (arr: string[]) => {
    console.log('arrayID', arrayID);
    const fetchCollections = async () => {
      arrayID.map(async (id) => {
        const response = await deleteCategory(parseInt(id));
        console.log(response);
      });

      setReload(!reload);
      handleClose();
    };

    fetchCollections();
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
              <MenuItem onClick={() => handleDeleteCategory(arrayID)}>
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

function ListCategories() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Category>('id');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showClearIcon, setShowClearIcon] = useState('none');
  const [valueInputSearch, setValueInputSearch] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [zIndexCustom, setZIndexCustom] = useState<number>(-100);
  const [categoryRequest, setCategoryRequest] = useState<CategoryRequest>();
  const [option, setOption] = useState('');
  const [categoryId, setCategoryId] = useState<undefined | number>();
  const [categoryName, setCategoryName] = useState<undefined | string>();
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    fetchCategories();
    setReload(false);
    setSelected([]);
  }, [reload]);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Category) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
  };

  const handlingReceiveData = async (name: string, option: string, id?: number) => {
    let response;

    const categoryRequest: CategoryRequest = {
      name: name,
    };
    if (option === 'create') {
      response = await createCategory(categoryRequest);
    } else if (option === 'update') {
      response = await updateCategory(id, categoryRequest);
    }
    console.log(response);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = categories.map((n) => n.name);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;
  const handleChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === '' ? 'none' : 'flex');
    setValueInputSearch(event.target.value);
  };
  const handleClickSearch = (): void => {
    setValueInputSearch('');
    setShowClearIcon('none');
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSubmit = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteCategory = (id: number) => {
    const fetchCollections = async () => {
      const response = await deleteCategory(id);
      console.log(response);

      setReload(!reload);
      handleClose();
    };

    fetchCollections();
    setZIndexCustom(-100);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
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
                onBlur={handleSearch}
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
                      onClick={handleClickSearch}
                    >
                      <ClearIcon />
                    </InputAdornment>
                  ),
                }}
                value={valueInputSearch}
              />
            </FormControl>
          </Box>
          <Box sx={{ position: 'inherit' }}>
            <Button
              sx={{ float: 'right' }}
              onClick={() => {
                open ? setOpen(false) : setOpen(true);
                setOption('create');
                setCategoryId(undefined);
                setCategoryName(undefined);
              }}
            >
              <AddCircleOutlineIcon />
              Thêm danh mục
            </Button>
            <CustomModal
              content={
                <Box
                  sx={{
                    width: 500,
                    height: 200,
                  }}
                >
                  <CreateCategory
                    onClick={handlingReceiveData}
                    reload={reload}
                    setReload={setReload}
                    open={open}
                    setOpen={setOpen}
                    option={option}
                    categoryId={categoryId}
                    catrgoryName={categoryName}
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
              rowCount={categories.length}
            />
            <TableBody>
              {stableSort(categories, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category, index) => {
                  const isItemSelected = isSelected(category.id.toString());
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={category.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='normal'
                        onClick={(event) => handleClick(event, category.id.toString())}
                      >
                        {category.name}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, category.id.toString())}>
                        {category.id}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, category.id.toString())}>
                        {category.collections.length}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, category.id.toString())}>
                        {category.created_at}
                      </TableCell>
                      <TableCell align='right'>
                        <IconButton
                          aria-label='edit'
                          onClick={() => {
                            open ? setOpen(false) : setOpen(true);
                            setOption('update');
                            setCategoryId(category.id);
                            setCategoryName(category.name);
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
                          sx={{ boxShadow: 'none' }}
                        >
                          <MenuItem
                            onClick={() => {
                              handleDeleteCategory(category.id);
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
          rowsPerPageOptions={[25, 50, 100]}
          component='div'
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default ListCategories;
