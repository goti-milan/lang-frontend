import Modal from '@mui/material/Modal';
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import axios from '../utils/axios';
import React from 'react';
import { useEffect } from 'react';
import { findSelectedWordClassName } from 'lib/findSelectedWordClassName';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '1rem',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  p: 4,
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

function AddItemModal({
  setOpen,
  storyId,
  open,
  original,
  items,
  words,
  sentenceId,
  fetchItemsData,
  setError,
}) {

  const [selectedWords, setSelectedWords] = useState([])
  const [selectedAllWords, setSelectedAllWords] = useState([]);

  const createSentence = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append('storyId', storyId);
    axios
      .post(`/items`, {
        selectedWords,
        items: [],
        sentenceId,
        storyId,
      })
      .then(async () => {
        await fetchItemsData()
        setOpen(false);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  useEffect(() => {
    setSelectedAllWords(items.reduce((selectedWords, item) => ([...selectedWords, ...item.selectedWords]), []));
  }, [items])

  const handleChange = (position) => {
    const isExist = selectedWords?.find(
      ({ index, length }) => index === position.index && length === position.length
    );
    if (isExist) {
      setSelectedWords(
        selectedWords.filter(
          ({ index, length }) =>
            !(index === position.index && length === position.length)
        )
      );
    } else {
      setSelectedWords([...selectedWords, { ...position }]);
    }
  }
  useEffect(() => {
    if (!open)
      setSelectedWords([]);
  }, [open])

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box component='form' onSubmit={createSentence} sx={style}>
        <Typography variant="p" sx={{ textAlign: "center", mb: 3 }}>Select Words</Typography>
        <Box display="flex" alignItems="center" flexWrap="wrap">
          {words?.map(({ word, ...p }, i) =>
            <Box
              key={i}
              onClick={() => handleChange(p)}
              className={`words-items words-clickable ${findSelectedWordClassName(selectedAllWords, selectedWords, p)}`}
            >
              {word}
            </Box>
          )}
        </Box>
        <Box align="center">
          <Button type="submit" disabled={selectedAllWords?.length === words?.length || !selectedWords.length} variant="outlined" sx={{ mt: 5 }}>Select</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddItemModal;
