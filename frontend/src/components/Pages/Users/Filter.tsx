import PropTypes, { bool } from 'prop-types';
import * as React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { UserDetail } from '../../../types/user';
import { useEffect, useState } from 'react';
import { getUserDetails } from '../../../services/user.service';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Column, Compare } from './TypeData';



const operater: Compare[] = [
  {
    id: 'string',
    comp: ['chứa', 'bằng', 'bắt đầu bằng', 'kết thúc bằng'],
  },
  {
    id: 'number',
    comp: ['lớn hơn & bằng', 'nhỏ hơn & bằng', 'bằng', 'lớn hơn', 'nhỏ hơn'],
  },
  {
    id: 'time',
    comp: ['trước', 'sau', 'cùng ngày', 'cùng tháng', 'cùng năm'],
  },
];

interface data {
  column: Column[];
  onClick?: React.MouseEvent | any;
}
function Filter(props: data) {
  const [textFieldValue, setTextFieldValue] = useState('');
  const [textFieldCompare, setTextFieldCompare] = useState('');
  const [textFieldInfo, setTextFieldInfo] = useState('');
  const [check, setCheck] = useState<Compare>();
  const [open, setOpen] = useState(false);
  const { column } = props;
  const compType = (str: string) => {
    return operater.find((op, idx) => {
      return op.id === str ? op : null;
    });
  };

  return (
    <Box sx={{ width: '600px', position: 'inherit' }}>
      <Box sx={{ textAlign: 'right' }}>
        <Button
          onClick={() => {
            open ? setOpen(false) : setOpen(true);
          }}
        >
          <FilterListIcon />
          Filter
        </Button>
        {open && (
          <Button
            onClick={() => {
              props.onClick(textFieldValue, textFieldCompare, textFieldInfo);
              setTextFieldCompare('');
              setTextFieldInfo('');
              setTextFieldInfo('');
            }}
          >
            <FilterAltIcon />
          </Button>
        )}
      </Box>
      {open && (
        <Box
          component='div'
          sx={{
            backgroundColor: '#ffffff',
            height: '100px',
            width: '600px',
            padding: '10px',
            display: 'flex',
            // top: '40px',
            // left: '0px',
            // position: 'absolute',
            //  zIndex: '1',
          }}
        >
          <Box sx={{ width: '180px', marginRight: '10px' }}>
            <TextField
              id='outlined-column-currency'
              select
              label='column'
              value={textFieldValue}
              helperText='chọn thông tin'
              variant='standard'
            >
              {column.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.field}
                  onClick={() => {
                    setTextFieldValue(option.field);
                    setCheck(compType(option.type));
                  }}
                >
                  {option.field}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ width: '180px', marginRight: '10px' }}>
            <TextField
              id='outlined-compare-currency'
              select
              label='compare'
              value={textFieldCompare}
              helperText='chọn loại lọc'
              variant='standard'
              fullWidth={true}
            >
              {check?.comp.map((option, idx) => (
                <MenuItem
                  key={idx.toString()}
                  value={option}
                  onClick={() => {
                    setTextFieldCompare(option);
                  }}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <TextField
            id='input-with-sx'
            label='text'
            variant='standard'
            value={textFieldInfo}
            onBlur={(e) => {
              setTextFieldInfo(e.target.value);
            }}
            onChange={(e) => {
              setTextFieldInfo(e.target.value);
            }}
          />
        </Box>
      )}
    </Box>
  );
}

Filter.propTypes = {};

export default Filter;
