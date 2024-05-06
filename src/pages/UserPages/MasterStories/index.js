import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemText, Typography, IconButton, Modal, TextField } from "@mui/material";
import { Box, Stack } from "@mui/system";
import useMasterStories from "hooks/useMasterStories";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import SelectedMasterStory from "./SelectedMasterStory";
import AddMasterStory from "components/AddMasterStory";
import DeleteMasterStoryModal from "components/DeleteMasterStoryModal";

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
    backgroundColor: "white",
    borderRadius: "1rem",
    boxShadow: 24,
    display: "flex",
    flexDirection: "column",
    p: 5,
};


const MasterStories = () => {
    const { masterStories, getMasterStories, onUpdateMasterStory, deleteMasterStory } = useMasterStories();
    const navigate = useNavigate();
    const { masterStoryId } = useParams();

    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [selectedMasterStory, setSelectedMasterStory] = useState();
    const [addMasterStoryMode, setAddMasterStoryMode] = useState(false);

    useEffect(() => {
        setSelectedMasterStory({ ...(masterStories.find((story) => String(story._id) === masterStoryId) || masterStories[0]) })
    }, [masterStoryId, masterStories]);

    useEffect(() => {
        if (masterStories.length && !masterStories.find((story) => String(story._id) === masterStoryId)) {
            selectFirstSentence();
        }
    }, [masterStories])

    function selectFirstSentence() {
        navigate(`/master-stories/${masterStories[0]?._id}`)
        setSelectedMasterStory(masterStories?.length ? masterStories[0] : null)
    }

    const createMasterStory = () => {
        setAddMasterStoryMode(true)
    };

    const onSelectedSentenceDeleted = async () => {
        deleteMasterStory(selectedMasterStory?._id);
        getMasterStories();
    }

    function onMasterStoryCreated() {
        setAddMasterStoryMode(false)
        setError(null)
        getMasterStories()
    }

    return (
        <>
            <Stack direction="row" justifyContent="center" alignItems="flex-start" spacing={2} sx={{ display: { xs: "block", sm: "flex" }, p: { xs: "5px 5%", lg: "5px 10%", xl: "5px 20%" }, borderBottom: "1px solid #ddd" }}>
                <Stack direction="column" justifyContent="center" sx={{ width: !selectedMasterStory?._id ? "100%" : "initial", minWidth: "300px", height: "600px" }}>
                    <Typography>Master Stories</Typography>
                    <List className="story-list">
                        {
                            masterStories.map((story, i) => (
                                <Link style={{ textDecoration: "none" }} key={i} to={`/master-stories/${story?._id}`}>
                                    <ListItem disablePadding key={i} sx={{ backgroundColor: story?._id === selectedMasterStory?._id && "#d3d3d3" }}>
                                        <ListItemButton>
                                            <ListItemText primary={story.name} />
                                        </ListItemButton>
                                    </ListItem>
                                </Link>
                            ))}
                    </List>
                    <Stack direction="row" spacing={1} sx={{ margin: "auto" }}>
                        <IconButton aria-label="add sentence" onClick={createMasterStory} color="primary" sx={iconButtonSx}>
                            <AddIcon />
                        </IconButton>
                        <IconButton aria-label="remove sentence" disabled={selectedMasterStory ? false : true} onClick={() => setOpen("delete")} color="error" sx={iconButtonSx}>
                            <ClearIcon />
                        </IconButton>
                    </Stack>
                </Stack>
                {selectedMasterStory?._id && <SelectedMasterStory selectedMasterStory={selectedMasterStory} setSelectedMasterStory={setSelectedMasterStory} onUpdateMasterStory={onUpdateMasterStory} getMasterStories={getMasterStories} />}
            </Stack>
            <DeleteMasterStoryModal setOpen={setOpen} open={open === "delete"} title={selectedMasterStory?.name} onComplete={onSelectedSentenceDeleted} />
            <Modal open={addMasterStoryMode} onClose={() => setAddMasterStoryMode(false)}>
                <Box sx={modalStyle}>
                    <AddMasterStory onComplete={onMasterStoryCreated} />
                </Box>
            </Modal>
        </>
    );
}

export default MasterStories;
