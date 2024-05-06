import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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

export default function WordsList({ words, selectedWords, setSelectedWords }) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedWords(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <div style={{ padding: '0 5%' }}>
      <FormControl sx={{ m: 1, width: 300, mt: 10 }}>
        <InputLabel id='demo-multiple-checkbox-label'>
          Selected Words
        </InputLabel>
        <Select
          labelId='demo-multiple-checkbox-label'
          id='demo-multiple-checkbox'
          multiple
          value={selectedWords}
          onChange={handleChange}
          label="Selected Words"
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {words?.map((word) => (
            <MenuItem key={word} value={word}>
              <Checkbox checked={!!selectedWords?.indexOf(word) > -1} />
              <ListItemText primary={word} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
