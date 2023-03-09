import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllByNameContains } from '../../services/apiRequest';
import { Products } from '../../types/products';
import { Footer } from '../Footer/Footer';
import Header from '../Header/Header';
import Product from './Product';

function ListBySearch() {
  const search: any = useParams();

  const [items, setItems] = useState<Products | any>([]);

  const fetchByName = async () => {
    const response = await getAllByNameContains(search.name);
    setItems(response);
  };

  useEffect(() => {
    fetchByName();
  }, []);

  return (
    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ width: '1100px', paddingTop: '120px', display: 'flex', justifyContent: 'space-around' }}>
        <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap', width: '80%' }}>
          {items.map((item: Products) => (
            <Product item={item} key={item.id} />
          ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default ListBySearch;
