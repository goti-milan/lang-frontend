import { IconButton, Stack, TextField } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function TextItem({ setText, text, indent, setIndent, deleteItem }) {
  return (
    <Stack
      direction='row'
      alignItems='center'
      spacing={5}
      justifyContent='space-between'
      className='textinput'
      sx={{
        backgroundColor: '#f7f7f7',
        border: "1px solid #ddd",
        p: 3,
        margin: "10px 0"
      }}
    >
      <div>
        <TextField
          id='text'
          name='text'
          label='Text'
          variant='outlined'
          required
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </div>
      <Stack direction='row' alignItems='center' spacing={5}>
        <TextField
          id='indent'
          label='Indent'
          name='indent'
          required
          type='number'
          value={indent}
          onChange={(e) => setIndent(e.target.value)}
          sx={{ width: '100px' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <IconButton
          aria-label='delete item'
          color='error'
          sx={{ p: 1, backgroundColor: '#ececec' }}
          onClick={deleteItem}
        >
          <ClearIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default TextItem;
