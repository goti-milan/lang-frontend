// import Modal from '@mui/material/Modal';
// import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
// import Box from '@mui/material/Box';
// import { useState } from 'react';
// import axios from '../utils/axios';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   borderRadius: '1rem',
//   boxShadow: 24,
//   display: 'flex',
//   flexDirection: 'column',
//   p: 5,
// };
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function AddStoryModal({
//   setOpen,
//   storyId,
//   open,
//   original,
//   words,
//   sentenceId,
//   fetchItemsData,
//   setError,
// }) {

//   const [selectedWords, setSelectedWords] = useState([])

//   const handleChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     const isExist = selectedWords?.find(
//       ({ index, length }) => index === value.index && length === value.length
//     );
//     console.log("isExist==>", isExist)
//     if (isExist) {
//       setSelectedWords(
//         selectedWords.filter(
//           ({ index, length }) =>
//             !(index === value.index && length === value.length)
//         )
//       );
//     } else {
//       setSelectedWords([...selectedWords, value]);
//     }
//   }

//   const createSentence = (e) => {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);
//     data.append('storyId', storyId);
//     axios
//       .post(`/items`, {
//         selectedWords,
//         items: [],
//         sentenceId,
//         storyId,
//       })
//       .then(async () => {
//         await fetchItemsData()
//         setOpen(false);
//       })
//       .catch((err) => {
//         setError(err.response.data.message);
//       });
//   };

//   return (
//     <Modal open={open} onClose={() => setOpen(false)}>
//       <Box component='form' onSubmit={createSentence} sx={style}>
//         <FormControl sx={{ m: 1, width: 300 }}>
//           <InputLabel id="demo-multiple-checkbox-label">
//             Selected Words
//           </InputLabel>
//           <Select
//             multipl="true"
//             value={selectedWords}
//             onChange={handleChange}
//             label="Selected Words"
//             renderValue={(selected) =>
//               selected
//                 .map(({ index, length }) => original?.substr(index, length))
//                 .sort()
//                 .join(", ")
//             }
//             MenuProps={MenuProps}
//           >
//             {words?.map(({ word, ...p }, i) => (
//               <MenuItem key={i} value={p}>
//                 <Checkbox
//                   checked={!!selectedWords.find(
//                     (selectedWord) =>
//                       selectedWord.index === p.index &&
//                       selectedWord.length === p.length
//                   )}
//                 />
//                 <ListItemText primary={word} />
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <Button type="submit">Save</Button>
//       </Box>
//     </Modal>
//   );
// }

// export default AddStoryModal;
