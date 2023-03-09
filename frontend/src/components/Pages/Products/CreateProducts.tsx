import Button from '@mui/material/Button';
import {
  TextField,
  Stack,
  IconButton,
  TableBody,
  TableRow,
  TableCell,
  MenuItem,
  Table,
  TextareaAutosize,
  CardContent,
  Typography,
  Menu,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useState } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { ProductRequest, Products } from '../../../types/products';
import { getCategories } from '../../../services/category.service';
import { Category, Collection } from '../../../types/category';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UploadImages from './UploadFile';
import { FormProvider, useForm } from 'react-hook-form';
import { createProduct } from '../../../services/products.service';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: '0px 0px 1px 0px rgb(0 0 0 / 20%), 0px 0px 0px 0px rgb(0 0 0 / 14%), 0px -3px 0px 0px rgb(0 0 0 / 12%)',
}));

interface FormatField {
  id: keyof ProductRequest;
  name: String;
}

const fields: FormatField[] = [
  { id: 'name', name: 'Tên sản phẩm' },
  { id: 'shortName', name: 'Tên hiện thị' },
  { id: 'importingPrice', name: 'Giá nhập vào' },
  { id: 'sellingPrice', name: 'Giá bán ra' },
  { id: 'discount', name: 'Giảm giá' },
  { id: 'soldAmount', name: 'Số lượng trong kho' },
];

interface attribute {
  key: string;
  value: string;
}

interface data {
  onClick?: React.MouseEvent | any;
}

export default function CreateProducts(props: data) {
  const { onClick } = props;

  const [open, setOpen] = React.useState(false);
  const [check, setCheck] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [textFieldCategory, setTextFieldCategory] = React.useState('');
  const [textFieldCollection, setTextFieldCollection] = React.useState('');
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const [product, setProduct] = React.useState<ProductRequest>();
  const [textFieldInfo, setTextFieldInfo] = useState('');

  const [Numattributes, setNumAttributes] = React.useState<number>(0);
  const [collectionId, setCollectionId] = useState(0);
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [importingPrice, setImportingPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [remainingAmount, setRemainingAmount] = useState(0);
  const [soldAmount, setSoldAmount] = useState(0);
  const [detail, setDetail] = useState('');
  const [imgLink, setImgLink] = useState();
  const [textAttributeValue, setTextAttributeValue] = useState<string>('');
  const [textAttributeName, setTextAttributeName] = useState<string>('');
  const [attributes, setAttributes] = useState<object>({});
  const [attribute, setAttribute] = useState<attribute[]>([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    fetchCategories();
  }, []);

  const getCollections = (idx: number) => {
    const result = categories.find((n, i) => i === idx);
    result ? setCollections(result.collections) : setCollections([]);
  };

  const handleSet = (id: string, value: string) => {
    if (id === 'name') {
      setName(value);
    } else if (id === 'importingPrice') {
      setImportingPrice(parseInt(value));
    } else if (id === 'sellingPrice') {
      setSellingPrice(parseInt(value));
    } else if (id === 'discount') {
      setDiscount(parseInt(value));
    } else if (id === 'remainingAmount') {
      setRemainingAmount(parseInt(value));
    } else if (id === 'soldAmount') {
      setSoldAmount(parseInt(value));
    } else if (id === 'detail') {
      setDetail(value);
    } else if (id === 'collection_id') {
      setCollectionId(parseInt(value));
    } else if (id === 'shortName') {
      setShortName(value);
    }
  };
  const handleGet = (id: string) => {
    if (id === 'name') {
      return name;
    } else if (id === 'importingPrice') {
      return importingPrice;
    } else if (id === 'sellingPrice') {
      return sellingPrice;
    } else if (id === 'discount') {
      return discount;
    } else if (id === 'remainingAmount') {
      return remainingAmount;
    } else if (id === 'soldAmount') {
      return soldAmount;
    } else if (id === 'detail') {
      return detail;
    } else if (id === 'collection_id') {
      return collectionId;
    } else if (id === 'shortName') {
      return shortName;
    }
    return 0;
  };

  const methods = useForm<any>({
    defaultValues: {
      name: '',
      active: false,
      entryPrice: 0,
      productCode: '',
      salePrice: 0,
      weight: 0,
      image: undefined,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: object) => {
    let formData = new FormData();
    const dataObject = Object.create(data);
    let file = new File([], 'undefined');
    Object.keys(data).forEach((key) => {
      if (key === 'image') {
        formData.append(key, dataObject[key][0] ? dataObject[key][0] : new File([], 'undefined'));
        file = dataObject[key][0] ? dataObject[key][0] : new File([], 'undefined');
      }
    });
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async function () {
      const productRequest: ProductRequest = {
        collectionId: collectionId,
        name: name,
        shortName: shortName,
        importingPrice: importingPrice,
        sellingPrice: sellingPrice,
        discount: discount,
        remainingAmount: remainingAmount,
        soldAmount: soldAmount,
        detail: detail,
        imgBase64: reader.result?.toString(),
        rating: 1,
        attributes: JSON.parse(handleAttributeRequest(attribute)),
      };
      const response = await createProduct(productRequest);
      console.log('response', response);
      console.log('productRequest', productRequest);
      onClick();
    };

    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    
  };

  const handleAttributeRequest = (array: attribute[]) => {
    let str = `{`;
    array.map((a, idx) => {
      if (a.key != '' && a.value != '') {
        console.log('array.length', array.length);
        if (idx === array.length - 1) {
          str = str.concat(`"${a.key}":"${a.value}"`);
        } else {
          str = str.concat(`"${a.key}":"${a.value}",`);
        }
      }
    });
    str = str.concat(`}`);
    return str;
  };

  const handleAddAttribute = () => {
    const attributeTemp: attribute = {
      key: textAttributeName,
      value: textAttributeValue,
    };
    const array: attribute[] = [];
    if (attributeTemp.key != '' && attributeTemp.value != '') {
      array.unshift(attributeTemp);
    }
    attribute.map((a) => {
      if (a.key != '' && a.value != '') {
        array.unshift(a);
      }
    });
    setAttribute(array);
    setTextAttributeName('');
    setTextAttributeValue('');
  };

  const handleAttribute = () => {
    handleAddAttribute();
    setNumAttributes(Numattributes + 1);
  };

  // handleAttribute();
  // console.log(JSON.parse(handleAttributeRequest(attribute)));
  // setAttributes(JSON.parse(handleAttributeRequest(attribute)));
  // console.log(attributes);
  const handleChangeCategory = (event: SelectChangeEvent) => {
    setTextFieldCategory(event.target.value);
  };
  const handleChangeCollection = (event: SelectChangeEvent) => {
    setTextFieldCollection(event.target.value);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleDetail = (e: Event, editor: typeof ClassicEditor) => {
    console.log(editor.getData());
    setDetail(editor.getData());
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xl={6}>
          <Item
            sx={{
              marginLeft: '50px',
            }}
          >
            <Table aria-label='simple table'>
              <TableBody>
                {fields.map((field, index) => {
                  return (
                    <TableRow sx={{ padding: 0 }} hover tabIndex={-1}>
                      <TableCell
                        sx={{ height: '30px', padding: '1px', width: '200px', fontSize: '18px', border: 'none' }}
                        key={field.id}
                      >
                        {field.name}:
                      </TableCell>
                      <TableCell sx={{ height: '30px', padding: '1px', border: 'none' }} align='right'>
                        <TextField
                          id='outlined-basic'
                          sx={{ marginBottom: '0', width: '300px' }}
                          variant='outlined'
                          value={handleGet(field.id) ? handleGet(field.id) : ''}
                          onBlur={(e) => {
                            handleSet(field.id, e.target.value);
                            console.log(e.target.value);
                          }}
                          onChange={(e) => {
                            handleSet(field.id, e.target.value);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell sx={{ height: '30px', padding: '1px', width: '200px', fontSize: '18px', border: 'none' }}>
                    Chọn loại danh mục:
                  </TableCell>
                  <TableCell sx={{ height: '30px', padding: '1px', border: 'none' }} align='right'>
                    <FormControl sx={{ m: 1, width: 300, margin: 0 }}>
                      <InputLabel id='category-label'>Danh mục</InputLabel>
                      <Select
                        labelId='category-label'
                        id='demo-multiple-category'
                        value={textFieldCategory}
                        onChange={handleChangeCategory}
                        input={<OutlinedInput label='Danh mục' />}
                        MenuProps={MenuProps}
                      >
                        {categories ? (
                          categories.map((option, idx) => (
                            <MenuItem
                              key={option.id}
                              value={option.name}
                              onClick={() => {
                                setCollections(option.collections);
                              }}
                            >
                              {option.name}
                            </MenuItem>
                          ))
                        ) : (
                          <></>
                        )}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ height: '30px', padding: '1px', width: '200px', fontSize: '18px', border: 'none' }}>
                    Chọn bộ sưu tập:
                  </TableCell>
                  <TableCell sx={{ height: '30px', padding: '1px', border: 'none' }} align='right'>
                    <FormControl sx={{ m: 1, width: 300, margin: 0 }}>
                      <InputLabel id='collection-label'>Bộ sưu tập</InputLabel>
                      <Select
                        labelId='collection-label'
                        id='demo-multiple-collection'
                        value={textFieldCollection}
                        onChange={handleChangeCollection}
                        input={<OutlinedInput label='Bộ sưu tập' />}
                        MenuProps={MenuProps}
                      >
                        {categories ? (
                          collections.map((option, idx) => (
                            <MenuItem
                              key={option.id}
                              value={option.name}
                              onClick={() => {
                                setTextFieldCollection(option.name);
                                handleSet('collection_id', option.id.toString());
                              }}
                            >
                              {option.name}
                            </MenuItem>
                          ))
                        ) : (
                          <></>
                        )}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ height: '30px', padding: 0, width: '200px', fontSize: '18px', border: 'none' }}>
                    <Typography
                      sx={{
                        fontSize: '18px',
                        padding: 0,
                      }}
                    >
                      Ảnh sản phẩm:
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ padding: '0', border: 'none', display: 'flex' }} align='right'>
                    <Box
                      component='div'
                      className='box'
                      sx={{
                        marginLeft: '220px',
                        border: '1px solid #ccc',
                        boxShadow: ' 0px 0px 7px 0px rgb(0 0 0 / 20%)',
                        borderRadius: '4px',
                        width: '300px',
                      }}
                    >
                      <CardContent sx={{ width: '300px', height: 'auto', fontSize: '18px', padding: 2 }}>
                        <FormProvider {...methods}>
                          <UploadImages />
                        </FormProvider>
                      </CardContent>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Item>
          <Item
            sx={{
              boxShadow: 'none',
              marginLeft: '50px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              padding: 0,
            }}
          >
            <Button sx={{ float: 'left' }} onClick={handleAttribute}>
              <AddCircleOutlineIcon />
              Thêm thuộc tính
            </Button>

            <Box sx={{ flexGrow: 1, width: '100%' }}>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {Array.from(Array(Numattributes)).map((_, index) => {
                  var i = 0;
                  return (
                    <>
                      <Grid item xl={6} key={index + 'e'}>
                        <Item>
                          <TextField
                            id='outlined-multiline-flexible'
                            label='giá trị thuộc tính'
                            multiline
                            maxRows={4}
                            value={
                              attribute[index] != null && attribute[index].key
                                ? attribute[index].key
                                : textAttributeName
                            }
                            sx={{ marginBottom: '0', width: '100%', height: '50px', padding: '10' }}
                            onBlur={(e) => {
                              if (attribute[index] && attribute[index].key != '') {
                                setTextAttributeName(e.target.value);
                              } else {
                                setTextAttributeName(e.target.value);
                              }
                            }}
                            onChange={(e) => {
                              if (attribute[index] && attribute[index].key != '') {
                              } else {
                                setTextAttributeName(e.target.value);
                              }
                            }}
                          />
                        </Item>
                      </Grid>
                      <Grid item xl={6} key={index}>
                        <Item>
                          <TextField
                            id='outlined-basic'
                            sx={{ marginBottom: '0', width: '100%', height: '50px', padding: '10' }}
                            label='tên thuộc tính'
                            variant='outlined'
                            value={
                              attribute[index] != null && attribute[index].value
                                ? attribute[index].value
                                : textAttributeValue
                            }
                            onBlur={(e) => {
                              if (attribute[index] && attribute[index].value != '') {
                              } else {
                                setTextAttributeValue(e.target.value);
                                handleAddAttribute();
                              }
                            }}
                            onChange={(e) => {
                              if (attribute[index] && attribute[index].value != '') {
                              } else {
                                setTextAttributeValue(e.target.value);
                              }
                            }}
                          />
                        </Item>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Box>
            <Button variant='contained' component='label' sx={{ margin: '15px' }} onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </Item>
        </Grid>
        <Grid item xl={6}>
          <Item sx={{ height: 300, maxHeight: 500 }}>
            <Typography variant='h3' gutterBottom>
              {' '}
              Mô tả chi tiết{' '}
            </Typography>

            <CKEditor editor={ClassicEditor} onBlur={handleDetail} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
