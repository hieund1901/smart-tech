import {
  getCollections,
  deleteCollection,
  createCollection,
  updateCollection,
} from '../../../services/collection.service';
import { useEffect, useState } from 'react';
import { Collection, CollectionRequest, Product } from '../../../types/collection';
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
import CreateCollection from './CreateCollection';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomModal from '../Users/CustomModal';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { getManufactureById } from '../../../services/manufacturer.service';
import { getCategoryById } from '../../../services/category.service';
import { Manufacturer } from '../../../types/manufacturer';
import { Category } from '../../../types/category';

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
  a: { [key in Key]: number | string | Product[] | Category | Manufacturer },
  b: { [key in Key]: number | string | Product[] | Category | Manufacturer }
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
  id: keyof Collection;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Tên bộ sưu tập',
  },
  {
    id: 'id',
    numeric: true,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: false,
    label: 'danh mục',
  },
  {
    id: 'manufacturer',
    numeric: true,
    disablePadding: false,
    label: 'nhà sản suất',
  },
  {
    id: 'products',
    numeric: true,
    disablePadding: false,
    label: 'số lượng sản phẩm',
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
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Collection) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: keyof Collection) => (event: React.MouseEvent<unknown>) => {
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
  const { numSelected, arrayID, reload, setReload } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
    // setOpen(false);
  };
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteCollection = (arr: string[]) => {
    const fetchCollections = async () => {
      arrayID.map(async (id) => {
        const response = await deleteCollection(parseInt(id));
      });
      setReload(!reload);
      handleClose();
    };

    fetchCollections();
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
          <IconButton onClick={() => handleDeleteCollection(arrayID)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <></>
      )}
    </Toolbar>
  );
}

function ListCollections() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Collection>('id');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [showClearIcon, setShowClearIcon] = useState('none');
  const [valueInputSearch, setValueInputSearch] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const [manufacturerId, setManufacturerId] = React.useState<number>(0);
  const [categoryId, setCategoryId] = React.useState<number>(0);
  const [name, setName] = React.useState<string>('');
  const [option, setOption] = React.useState<string>('');
  const [collectionNameResponse, setCollectionNameResponse] = React.useState<string>();
  const [reload, setReload] = React.useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [zIndexCustom, setZIndexCustom] = useState<number>(-100);
  const [collectionId, setCollectionId] = useState<number>(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openSubmit = Boolean(anchorEl);
  const [categoryNameResponse, setCategoryNameResponse] = React.useState<string>('');
  const [manufacturerNameResponse, setManufacturerNameResponse] = React.useState<string>('');
  const [listCategories, setListCategories] = useState<Category[]>([]);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setCollectionId(id);
  };

  const getCategoryNameById2 = async (id: number) => {
    const categoriesresponse = await getCategoryById(id);
    return categoriesresponse;
  };

  const fetchCollections = async () => {
    const response = await getCollections();

    let categories = listCategories;
    setCollections(response);
    if (response.length > 0) {
      console.log('da vao');
      response.forEach(async (c, idx) => {
        // categories[idx] = await getCategoryById(c.category_id);
        // console.log('categoriesresponse', categoriesresponse);
        // categories.push(categoriesresponse);
        console.log(`categories${idx}`, categories[idx]);

        setListCategories(categories);
      });
      // setTimeout()
    }
  };
  useEffect(() => {
    fetchCollections();
    setReload(false);
    setSelected([]);
  }, [reload]);

  console.log('collections', collections);
  console.log('listCategories', listCategories);

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Collection) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = collections.map((n) => n.name);
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
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - collections.length) : 0;
  const handleChangeInputSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setShowClearIcon(event.target.value === '' ? 'none' : 'flex');
    setValueInputSearch(event.target.value);
  };
  const handleClick1 = (): void => {
    setValueInputSearch('');
    setShowClearIcon('none');
  };
  const handleDeleteCollection = (id: number) => {
    const fetchCollections = async () => {
      const response = await deleteCollection(id);
      setReload(!reload);
      handleClose();
    };

    fetchCollections();
    setZIndexCustom(-100);
  };

  const getCategoryNameById = async (id: number) => {
    const response = await getCategoryById(id);
    console.log(response?.name);
    setCategoryNameResponse(response?.name || '');
    return response?.name;
  };
  const getManufactureNameById = async (id: number) => {
    const response = await getManufactureById(id);
    setManufacturerNameResponse(response?.name || '');
    return response?.name;
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
                setOpen(true);
                setOption('create');
                setName('');
                setCategoryNameResponse('');
                setManufacturerNameResponse('');
              }}
            >
              <AddCircleOutlineIcon />
              Thêm danh mục
            </Button>
          </Box>
        </Box>
        <CustomModal
          content={
            <>
              <CreateCollection
                setName={setName}
                setCategoryId={setCategoryId}
                setManufacturerId={setManufacturerId}
                setReload={setReload}
                setOpen={setOpen}
                option={option}
                collectionId={collectionId}
                categoryId={categoryId}
                manufacturerId={manufacturerId}
                name={name}
                categoryNameResponse={categoryNameResponse}
                manufacturerNameResponse={manufacturerNameResponse}
                setCategoryNameResponse={setCategoryNameResponse}
                setManufacturerNameResponse={setManufacturerNameResponse}
              />
            </>
          }
          open={open}
          setOpen={setOpen}
        />
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
              rowCount={collections.length}
            />
            <TableBody>
              {stableSort(collections, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((collection, index) => {
                  const isItemSelected = isSelected(collection.id.toString());
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={collection.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component='th'
                        id={labelId}
                        scope='row'
                        padding='normal'
                        onClick={(event) => handleClick(event, collection.id.toString())}
                      >
                        {collection.name}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, collection.id.toString())}>
                        {collection.id}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, collection.id.toString())}>
                        {collection.category.name}
                        {/* {listCategories.length > 0 ? listCategories[index].name : ''} */}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, collection.id.toString())}>
                        {/* {/* {getManufactureNameById( */}
                        {collection.manufacturer.name}
                        {/* )} } */}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, collection.id.toString())}>
                        {collection.products.length}
                      </TableCell>
                      <TableCell align='right' onClick={(event) => handleClick(event, collection.id.toString())}>
                        {collection.created_at}
                      </TableCell>
                      <TableCell align='right'>
                        <IconButton
                          aria-label='edit'
                          onClick={() => {
                            setCategoryId(collection.category.id);
                            setManufacturerId(collection.manufacturer.id);
                            setCollectionId(collection.id);
                            setOption('update');
                            setName(collection.name);
                            getCategoryNameById(collection.category.id);
                            getManufactureNameById(collection.manufacturer.id);
                            setOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align='right'>
                        <IconButton
                          aria-label='delete'
                          onClick={(e) => {
                            handleOpen(e, collection.id);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
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
          count={collections.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
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
            handleDeleteCollection(collectionId);
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
    //
  );
}

export default ListCollections;
