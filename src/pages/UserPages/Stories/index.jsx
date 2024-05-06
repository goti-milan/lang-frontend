import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import axios from "../../../utils/axios";
import { TextField, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import Spinner from "../../../components/Spinner";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import "./styled.css";
import jwt_decode from "jwt-decode";
import useMasterStories from "../../../hooks/useMasterStories";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 750,
  bgcolor: "background.paper",
  borderRadius: "1rem",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  p: 5,
  '@media(max-width:800px)': {
    width: "95%",
    p: 3
  }
};

export default function Stories() {
  const [translationstories, setTranslationStories] = useState([]);
  const [languages, setLanguages] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState();
  const [title, setNewTitle] = useState();

  const writerData = jwt_decode(Cookie.get('jwt'));
  const { masterStories } = useMasterStories();

  const fetchStories = () => {
    setLoading(false);
    if (selectedLanguage) {
      axios.get(`/stories/sentence/${selectedLanguage._id}`).then((res) => {
        setTranslationStories(res.data.data);
        setLoading(false);
      }).catch((err) => {
        console.log(err)
      })
    }
  };

  useEffect(() => {
    fetchStories();
  }, [selectedLanguage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/stories", { title: title, masterStoryID: select?._id, language: selectedLanguage._id }).then(() => {
      fetchStories();
      setSelect("");
      setSearch("");
      setOpen(false);
    });
  };
  useEffect(() => {
    if (!languages) {
      getLanguages();
    }
  }, []);

  const getLanguages = () => {
    axios.get(`/users/${writerData?.id}`).then((res) => {
      setLanguages(res.data.data.languages);
      if (res?.data?.data?.languages?.length) {
        setSelectedLanguage(res?.data?.data?.languages?.[0]);
      }
      setLoading(false);
    });
  };

  const handleSerchMasterStory = (e) => {
    setSearch(e.target.value);
  }

  const handleNewTitle = (e) => {
    setNewTitle(e.target.value)
  }

  if (loading) return <Spinner />;
  return (
    <>
      {/* {selectedLanguage && */}
      <FormControl sx={{ marginTop: '32px', marginLeft: '32px', width: '160px' }}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedLanguage?.name ? selectedLanguage?.name : ""}
          label="Language"
        >
          {languages && languages.map((lang, i) => (
            <MenuItem key={i} onClick={() => { setSelectedLanguage(lang); Cookie.set('selectedLang', JSON.stringify(lang.name)) }} value={`${lang.name}`} >{lang.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* } */}

      <Stack direction="column" justifyContent="center" alignItems="center">
        {translationstories?.length > 0 && (
          <List
            sx={{
              width: "80%",
              border: "1px solid #d3d3d3",
              borderRadius: "1rem",
              overflow: "hidden",
              mb: 1,
            }}
          >
            {translationstories?.map((story, i) => (
              <Link to={`/stories/${story._id}`} state={{ langId: selectedLanguage?._id }} key={i}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={story.title} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        )}
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add new story
          </Button>
        </Stack>
      </Stack>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box component="form" onSubmit={handleSubmit} sx={style}>
          <Stack direction="row" alignItems="flex-start" spacing={2} sx={{ display: { xs: "block", sm: "flex" }, borderBottom: "1px solid #ddd" }}>
            <Stack direction="column" direction="column" width="100%">
              <Typography justifyContent="left" sx={{ mb: 4 }}>Add Translation</Typography>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography justifyContent="left" mr={3}>Title</Typography>
                <TextField id="outlined-basic" name="title" onChange={(e) => handleNewTitle(e)} variant="outlined" sx={{ width: 530 }} />
              </Box>
              <Typography sx={{ mb: 1, mt: 5 }} >Master Stories</Typography>
              <TextField id="outlined-basic" sx={{ width: "100%", mb: 2 }} placeholder="Type to filter..." variant="outlined" onChange={(e) => handleSerchMasterStory(e)} />
              <List className="story-list">
                {masterStories.filter((item) => item?.name?.toLowerCase()?.includes(search.toLowerCase()))?.map((story, i) => (
                  <ListItem disablePadding key={i} sx={{ backgroundColor: story?._id === select?._id && "#d3d3d3" }}>
                    <ListItemButton ListItemButton onClick={() => setSelect(story)} sx={{ mt: 1, backgroundColor: translationstories.find((item) => item?.masterStoryID === story?._id) && "green" }} className={translationstories.find((item) => item?.masterStoryID === story?._id) && "translation-data"}>
                      <ListItemText primary={translationstories.find((item) => item?.masterStoryID === story?._id) ? `${story?.name} -Already Added` : story?.name} key={i} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            type="submit"
            onClick={() => setOpen(true)}
            disabled={!title || !select}
            style={{ marginTop: "1rem" }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}
