import { Box, List, ListItem, Typography } from '@mui/material';
import { toUpper } from 'ramda';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCategory } from '../../services/apiRequest';
import { useAppSelector } from '../../state/storeHooks';
import Collection from '../Collection/Collection';

export default function Category() {
  const listCategory = useAppSelector((state) => state.category?.category.allCategories?.data);
  if (listCategory) {
    const list = listCategory?.map((c: any) => ({ id: c.id, name: c.name }));
  }

  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategory(dispatch);
  }, []);
  return (
    <Box sx={{ marginTop: '30px' }}>
      <List sx={{ marginTop: '0px', paddingTop: '0px', paddingBottom: '1px' }}>
        {listCategory?.map((c: any) => (
          <Box key={c.id} sx={{ borderRadius: '15px', marginBottom: '20px', background: '#ffffff' }}>
            <ListItem
              sx={{
                width: 250,
                justifyContent: 'center',
                marginLeft: '5px',
                paddingTop: '15px',
                borderRadius: '13px',
              }}
              //onClick={() => change(c)}
              className='category-button'
            >
              <Typography sx={{ fontSize: '19px', fontWeight: '550', color: 'rgb(239,32,56)' }}>
                {toUpper(c.name)}
              </Typography>
            </ListItem>
            <Collection idcategory={c.id} />
          </Box>
        ))}
      </List>
    </Box>
  );
}
