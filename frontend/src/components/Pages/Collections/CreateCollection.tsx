import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { Button, CardContent, MenuItem, TextField, Typography } from '@mui/material';
import { getCategories } from '../../../services/category.service';
import { Category, Collection } from '../../../types/category';
import { CollectionRequest } from '../../../types/collection';
import { Manufacturer } from '../../../types/manufacturer';
import { getManufactureById, getManufacturers } from '../../../services/manufacturer.service';
import { getCategoryById } from '../../../services/category.service';
import { createCollection, updateCollection } from '../../../services/collection.service';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  width: '100%',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
  boxShadow: 'none',
}));

interface data {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setCategoryId: React.Dispatch<React.SetStateAction<number>>;
  setManufacturerId: React.Dispatch<React.SetStateAction<number>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  option: string;
  collectionId: number;
  categoryId: number;
  manufacturerId: number;
  name: string;
  categoryNameResponse: string;
  manufacturerNameResponse: string;
  setCategoryNameResponse: React.Dispatch<React.SetStateAction<string>>;
  setManufacturerNameResponse: React.Dispatch<React.SetStateAction<string>>;
}

function CreateCollection(props: data) {
  const {
    setName,
    setCategoryId,
    setManufacturerId,
    setReload,
    setOpen,
    option,
    collectionId,
    categoryId,
    manufacturerId,
    name,
    categoryNameResponse,
    manufacturerNameResponse,
    setCategoryNameResponse,
    setManufacturerNameResponse,
  } = props;

  const [categories, setCategories] = React.useState<Category[]>([]);
  const [manufacturers, setManufacturer] = React.useState<Manufacturer[]>([]);
  const [textFieldCollectionName, setTextFieldCollectionName] = React.useState<string>('');
  const [textFieldValueCategory, setTextFieldValueCategory] = React.useState<string>('');
  const [textFieldValueManufacturer, setTextFieldValueManufacturer] = React.useState<string>('');

  // const [categoryNameResponse, setCategoryNameResponse] = React.useState<string>();
  // const [manufacturerNameResponse, setManufacturerNameResponse] = React.useState<string>();
  React.useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response);
    };
    const fetchManufacturers = async () => {
      const response = await getManufacturers();
      setManufacturer(response);
    };
    fetchManufacturers();
    fetchCategories();
  }, []);

  const handleSubmitCollection = async () => {
    const collectionRequest: CollectionRequest = {
      name: name,
      category_id: categoryId,
      manufacturer_id: manufacturerId,
    };
    let response;
    if (option === 'create') {
      response = await createCollection(collectionRequest);
    } else if (option === 'update') {
      response = await updateCollection(collectionId, collectionRequest);
    }

    setReload(true);
    setOpen(false);
  };
  return (
    <CardContent component='div' sx={{ width: '800px', height: '500px' }}>
      <Box sx={{ width: '100%' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={6}>
            <Item>
              <Typography
                sx={{
                  fontSize: '18px',
                }}
              >
                Tên bộ sưu tập:
              </Typography>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <TextField
                id='outlined-column-currency'
                defaultValue={name}
                variant='standard'
                sx={{ width: '100%', marginBottom: '15px' }}
                onChange={(e) => setTextFieldCollectionName(e.target.value)}
                onBlur={(e) => setName(e.target.value)}
              ></TextField>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <Typography
                sx={{
                  fontSize: '18px',
                }}
              >
                Chọn danh mục:
              </Typography>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <TextField
                id='outlined-column-currency'
                select
                label='danh mục'
                value={categoryNameResponse}
                // defaultValue={categoryNameResponse}
                variant='standard'
                sx={{ width: '100%', marginBottom: '15px' }}
              >
                {categories.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.name}
                    onClick={() => {
                      setCategoryId(option.id);
                      setCategoryNameResponse(option.name);
                    }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <Typography
                sx={{
                  fontSize: '18px',
                }}
              >
                Chọn hãng sản phẩm:
              </Typography>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <TextField
                id='outlined-column-currency'
                select
                label='hãng sản phẩm'
                value={manufacturerNameResponse}
                variant='standard'
                sx={{ width: '100%', marginBottom: '15px' }}
              >
                {manufacturers.map((option) => (
                  <MenuItem
                    key={option.id}
                    value={option.name}
                    onClick={() => {
                      setManufacturerId(option.id);
                      setManufacturerNameResponse(option.name);
                    }}
                    sx={{ alignItems: 'start' }}
                  >
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              <Button variant='contained' component='label' onClick={() => handleSubmitCollection()}>
                Submit
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </CardContent>
  );
}

CreateCollection.propTypes = {};

export default CreateCollection;
