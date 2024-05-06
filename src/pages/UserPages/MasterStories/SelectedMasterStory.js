import React from "react";
import { Checkbox, Box, Select, Stack, MenuItem, Button, TextField, Typography } from "@mui/material";
import axios from "../../../utils/axios";

const SelectedMasterStory = ({ selectedMasterStory, onUpdateMasterStory, setSelectedMasterStory, getMasterStories }) => {

    const handleMediaChange = (e) => {
        const name = e.target.name;
        const files = e.target.files;
        setSelectedMasterStory({ ...selectedMasterStory, [name]: URL.createObjectURL(files[0]) });
        uploadMedia(name, files[0])
    };

    function uploadMedia(name, file) {
        // setLoading(true);
        if (!selectedMasterStory) { return }
        const data = new FormData();
        data.append(name, file)
        axios.patch(`/master-stories/${selectedMasterStory?._id}`, data).then((res) => {
            getMasterStories()
        });
    }

    const handleRemoveMedia = async (name) => {
        await axios.patch(`/master-stories/${selectedMasterStory?._id}`, { [name]: "" });
        getMasterStories()
    };

    const handleOnSubmitMasterStory = async (e) => {
        e.preventDefault();
        let data = { ...selectedMasterStory, free: !!selectedMasterStory.free };
        await onUpdateMasterStory(selectedMasterStory._id, data);
    }

    return (
        <Stack sx={{ flex: 1, mx: "16px !important" }}>
            <Typography variant='h5' component='h3' sx={{ my: 3, border: "1px solid gray", width: "100%", textAlign: "center", py: 1, borderRadius: "10px" }}>{"Story Information"}</Typography>
            <Box sx={{ display: { xs: "block", sm: "flex" }, width: "100%", mx: 2, justifyContent: "space-between" }}>
                <Box component="form" onSubmit={handleOnSubmitMasterStory}>
                    <Box sx={{ mt: 3 }}>
                        <Typography component='h3'>Name</Typography>
                        <TextField value={selectedMasterStory?.name} onChange={({ target: { value } }) => setSelectedMasterStory({ ...selectedMasterStory, name: value })} required />
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography component='h3'>Level</Typography>
                        <Select value={selectedMasterStory?.level} onChange={({ target: { name, value } }) => setSelectedMasterStory({ ...selectedMasterStory, level: value })}>
                            <MenuItem value="a1">a1</MenuItem>
                            <MenuItem value="a2">a2</MenuItem>
                            <MenuItem value="b1">b1</MenuItem>
                            <MenuItem value="b2">b2</MenuItem>
                            <MenuItem value="c1">c1</MenuItem>
                            <MenuItem value="c2">c2</MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: "flex", mt: 3 }}>
                        <Typography sx={{ display: "flex", alignItems: "center" }} component='h3'>Free</Typography>
                        <Checkbox name="free" checked={selectedMasterStory.free} onChange={({ target: { name, checked } }) => setSelectedMasterStory({ ...selectedMasterStory, [name]: checked })} />
                    </Box>
                    <Button sx={{ mt: 2 }} type="submit" variant="contained">Save</Button>
                </Box>
                <Box>
                    <Box sx={{ margin: "auto", textAlign: "left" }}>
                        <Typography>Image :   {selectedMasterStory?.image ? <Button onClick={() => handleRemoveMedia("image")}>Remove</Button> : ""}</Typography>
                        {selectedMasterStory?.image ? (
                            <Box width={"300px"} height={"200px"}>
                                <img id="image" width="100%" height="100%" style={{ objectFit: 'contain' }} src={selectedMasterStory?.image} alt="your image" />
                            </Box>
                        ) :
                            (<TextField sx={{ width: "100%" }} type="file" name="image" inputProps={{ accept: "image/*" }} onChange={handleMediaChange} />)
                        }
                    </Box>
                </Box>
            </Box>
        </Stack>
    )
}

export default SelectedMasterStory;