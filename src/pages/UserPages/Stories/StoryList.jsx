import React, { useContext } from "react";
import { Checkbox, FormControl, IconButton, InputLabel, Link, MenuItem, Modal, Select, Stack, Typography, Grid } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";
import axios, { url } from "../../../utils/axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import AddItemModal from "../../../components/AddItemModal";
import DeleteModal from "../../../components/DeleteModal";
import Items from "../../../components/Items";
import AddSentence from "components/AddSentence";
import SelectedStory from "./SelectedStory";
import { NotifyContext } from "../../../context/NotifyContext"


const iconButtonSx = {
  p: 1,
  backgroundColor: "#ececec",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: "1rem",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  p: 5,
};

function Story(props) {
  const { id } = useParams();
  const { state: { langId } } = useLocation();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sentences, setSentences] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSentence, setSelectedSentence] = useState(null);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const [words, setWords] = useState([]);
  const { toast } = useContext(NotifyContext);


  const [addSentenceMode, setAddSentenceMode] = useState(false)

  useEffect(() => {
    if (selectedSentence == null || !sentences.length) {
      selectFirstSentence()
    }
  }, [sentences])

  useEffect(() => {
    if (selectedSentence) {
      fetchItemsData()
    } else {
      selectFirstSentence()
    }
  }, [selectedSentence])

  function selectFirstSentence() {
    setSelectedSentence(sentences?.length ? sentences[0] : null)
  }

  const handleManageLevel = async (e) => {
    await axios.patch(`/stories/${story._id}`, { level: e.target.value }).then((res) => {
      fetchStoryData();
      toast({ message: "Successfully update stories level", type: "success" })

    }).catch((err) => {
      toast({ message: "error to update stories level", type: "error" })
    })
  }

  useEffect(() => {
    setWords(
      selectedSentence?.original?.split(" ").reduce((newVal, word, i) => {
        return [
          ...newVal,
          {
            length: word.length,
            word,
            index:
              i === 0 ? 0 : newVal[i - 1]?.index + 1 + newVal[i - 1]?.length,
          },
        ];
      }, [])
    );
  }, [selectedSentence]);

  function onSelectedSentenceDeleted() {
    setSelectedSentence("")
  }

  const fetchStoryData = () =>
    axios
      .get(`/stories/${id}`)
      .then((res) => {
        setStory(res.data.data.story);
        setSentences(res.data.data.sentences);
        setSelectedSentence(res.data.data.sentences?.[0])
        return res.data.data
      })
      .catch((err) => setError(err.response.data.message))
      .finally(() => {
        setLoading(false);
      })

  const fetchItemsData = () => {
    axios
      .get(`/items/${selectedSentence?._id}`)
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((err) => {
        setError(err.response.data.message)
      })
      .finally(() => setLoading(false));
  };

  function selectedSentenceTitle() {
    if (selectedSentence && sentences) {
      for (let idx in sentences) {
        let sentence = sentences[idx]
        if (sentence._id === selectedSentence._id) {
          let index = 1 + Number(idx)
          return "Sentence " + index
        }
      }
    } else {
      return null
    }
  }
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/stories/${id}`)
      .then((res) => {
        setStory(res.data.data.story);
        setSentences(res.data.data.sentences);
      })
      .catch((err) => setError(err.response.data.message))
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;


  function onSentenceCreated() {
    setAddSentenceMode(false)
    setError(null)
    fetchStoryData().then((data) => {
      if (data?.sentences) {
        let lastSentence = data.sentences[data.sentences.length - 1]
        setSelectedSentence(lastSentence)
      }
    })
  }
  const createSentence = () => {
    setAddSentenceMode(true)
  };

  return (
    <Box sx={{ width: { lg: "70%" } }} mx='auto'>
      <Grid container p={2}>
        <Grid item xs={12} sm={3}>
          <Box sx={{ width: { md: "20%" } }}>
            <Typography>Language:{story?.language?.name}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box sx={{ borderBottom: "1px solid" }} pb={2}>
            <Box sx={{ textAlign: "center", borderBottom: "1px solid", pt: { sm: 0, xs: 4 } }}>
              <Typography>Master Story Name</Typography>
              <Typography>{story?.masterStoryID?.name}</Typography>
            </Box>
            <Box sx={{ display: { sm: "flex" } }} justifyContent="space-between" alignItems="flex-start" pt={2}>
              <Box>
                <Box sx={{ display: "flex" }}>
                  <Typography sx={{ display: "flex", alignItems: "center" }} component='h3'>Active</Typography>
                  <Checkbox />
                </Box>
                <Box sx={{ display: "flex", mb: { sm: 0, xs: 1 } }}>
                  <Typography sx={{ display: "flex", alignItems: "center" }} component='h3'>Level:{story?.masterStoryID?.level}</Typography>
                </Box>
              </Box>
              <Box>
                <Box width={"300px"} height={"200px"}>
                  {story?.masterStoryID?.image ?
                    <img id="image" width="100%" height="100%" style={{ objectFit: 'contain' }} src={story?.masterStoryID?.image} alt="your image" />
                    :
                    <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: "300px", height: "200px", border: "1px solid black" }}>Master story Image</Box>
                  }
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Grid container p={2} justifyContent={!selectedSentence?._id && "flex-end"}>
        <Grid item xs={12} md={3} lg={!selectedSentence?._id ? "9" : "3"}>
          <Stack direction="column" justifyContent="center" sx={{ width: !selectedSentence?._id ? "100%" : "initial", height: "600px" }}>
            <Box>
              <Typography>Story Name: {story?.title}</Typography>
              <FormControl sx={{ my: 3, width: "80px" }}>
                <InputLabel id="demo-simple-select-label">Level</InputLabel>
                <Select labelId="demo-simple-select-label" id="demo-simple-select" label="Level" defaultValue="a1" value={story?.level} onChange={handleManageLevel}>
                  <MenuItem value="a1">a1</MenuItem>
                  <MenuItem value="a2">a2</MenuItem>
                  <MenuItem value="b1">b1</MenuItem>
                  <MenuItem value="b2">b2</MenuItem>
                  <MenuItem value="c1">c1</MenuItem>
                  <MenuItem value="c2">c2</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* <Button variant="contained" type="submit" style={{ margin: "-3rem auto 0px 100px", width: "fit-content", display: "block", }} onClick={handleManageLevel}>
              Update
            </Button> */}
            <List className="story-list">
              {sentences?.map((sentence, i) => (
                <ListItem disablePadding key={i} onClick={() => setSelectedSentence(sentence)} sx={{ backgroundColor: sentence?._id === selectedSentence?._id && "#d3d3d3" }}>
                  <ListItemButton>
                    <ListItemText primary={`Sentence ${i + 1}`} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Stack direction="row" spacing={1} sx={{ mx: "auto", mt: 4 }}>
              <IconButton aria-label="add sentence" onClick={createSentence} color="primary" sx={iconButtonSx}>
                <AddIcon />
              </IconButton>
              <IconButton aria-label="remove sentence" disabled={selectedSentence ? false : true} onClick={() => setOpen("delete")} color="error" sx={iconButtonSx}>
                <ClearIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} md={9}>
          <Box pt={2} pl={selectedSentence?._id ? 5 : 0}>
            <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2} sx={{ position: "relative", display: { xs: "block", sm: "flex" }, borderBottom: "1px solid #ddd" }}>

              <SelectedStory selectedSentence={selectedSentence} sentences={sentences} fetchStoryData={fetchStoryData} setSelectedSentence={setSelectedSentence} />
            </Stack>
            {
              words &&
              selectedSentence?._id &&
              items.map((item, i) => (
                <Items key={i} item={item} items={items} original={selectedSentence?.original} words={words} langId={langId} setError={setError} setLoading={setLoading} fetchItemsData={fetchItemsData} />
              ))
            }
            {error && (<Typography component="p" color="red" sx={{ mt: 2, textAlign: "center" }}>{error}</Typography>)}
            <Box sx={{ width: "100%" }} mt={10}>
              {selectedSentence?._id ? <Typography component="div" color="red" sx={{ mt: 2, textAlign: "center" }}>
                <Button className="addbtn" onClick={() => setOpen("add")}>Add Item</Button>
              </Typography> : ""}
              <Link href={`${url}stories/json/${id}`}>
                <Typography textAlign="center">Get JSON</Typography>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <AddItemModal setOpen={setOpen} open={open === "add"} story={story?._id} sentences={sentences} items={items} original={selectedSentence?.original} words={words} fetchItemsData={fetchItemsData} setError={setError} sentenceId={selectedSentence?._id} setLoading={setLoading} />
      <DeleteModal setOpen={setOpen} open={open === "delete"} sentence={selectedSentence} title={selectedSentenceTitle()} fetchStoryData={fetchStoryData} setError={setError} onComplete={onSelectedSentenceDeleted} />
      <Modal open={addSentenceMode} onClose={() => setAddSentenceMode(false)}>
        <Box sx={modalStyle}>
          <AddSentence storyID={id} onComplete={onSentenceCreated} />
        </Box>
      </Modal>
    </Box >
  );
}

export default Story;
