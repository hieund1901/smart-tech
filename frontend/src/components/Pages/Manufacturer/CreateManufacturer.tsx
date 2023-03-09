import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { ManufacturerRequest } from '../../../types/manufacturer';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  float: 'left',
  color: theme.palette.text.secondary,
  width: '200px',
  height: '50px',
  boxShadow: 'none',
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'left',
}));
interface data {
  onClick?: React.MouseEvent | any;
  reload: boolean;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  option: string;
  manufacturerId?: number;
  manufacturerName?: string;
}
function CreateManufacturer(props: data) {
  const [name, setName] = useState('');
  return (
    <Box>
      <Box sx={{ width: '500px' }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          <Grid item xs={6}>
            <Item>Tên hãng sản phẩm</Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <TextField
                id='outlined-basic'
                variant='outlined'
                defaultValue={props.manufacturerName}
                onBlur={(e) => {
                  setName(e.target.value);
                }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item>
              <Button
                variant='contained'
                component='label'
                onClick={() => {
                  props.onClick(name, props.option, props.manufacturerId);
                  props.setReload(!props.reload);
                  props.setOpen(!props.open);
                }}
              >
                Submit
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

CreateManufacturer.propTypes = {};

export default CreateManufacturer;
