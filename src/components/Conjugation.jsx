import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

function Conjugation({
  conjugation,
  setConjugation,
  setItemUpdated,
  updateItems,
}) {
  const [tense, setTense] = useState('present');

  return (
    <>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='center'
        spacing={5}
        sx={{ mt: 5 }}
      >
        <Button
          variant={tense === 'present' ? 'contained' : 'outlined'}
          onClick={() => setTense('present')}
        >
          Present
        </Button>
        <Button
          variant={tense === 'past' ? 'contained' : 'outlined'}
          onClick={() => setTense('past')}
        >
          Past
        </Button>
        <Button
          variant={tense === 'future' ? 'contained' : 'outlined'}
          onClick={() => setTense('future')}
        >
          Future
        </Button>
      </Stack>

      {conjugation[tense].map((el) => (
        <Stack
          key={el.type}
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          spacing={5}
          sx={{ mt: 5 }}
        >
          <Typography>{el.type}</Typography>
          <TextField
            variant='outlined'
            value={el.value}
            onChange={(e) => updateItems(el, e.target.value, tense, 'value')}
          />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={!!el.selected} />}
              label='Selected'
              onChange={(e) => updateItems(el, !el.selected, tense, 'selected')}
            />
          </FormGroup>
        </Stack>
      ))}
    </>
  );
}

export default Conjugation;
