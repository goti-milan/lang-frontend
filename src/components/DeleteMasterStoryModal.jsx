import Modal from '@mui/material/Modal';
import { Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from '../utils/axios';

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
  p: 5,
};

function DeleteMasterStory({
  setOpen,
  open,
  title,
  onComplete
}) {
  const deleteMasterStory = (e) => {
    e.preventDefault();
    setOpen(false);
    onComplete();
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box component='form' onSubmit={deleteMasterStory} sx={style}>
        <Typography component='h6' variant='h6' sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Are you sure you want to delete master story "{title}"?
        </Typography>
        <Stack direction='row' spacing={3} sx={{ margin: '1rem auto 0 auto' }}>
          <Button variant='contained' type='submit'>Yes</Button>
          <Button variant='contained' onClick={() => setOpen(false)} color='error'>No</Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default DeleteMasterStory;
