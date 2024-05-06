import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Spinner from "./Spinner";
import axios from "../utils/axios";

function AddMasterStory(props) {
  const [storyName, setStoryName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function onAdd(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    axios
      .post('/master-stories', data).then((res) => {
        props.onComplete?.()
      }).catch((err) => setError(err.response.data.message))
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box component="form" onSubmit={onAdd} sx={{ mt: 1 }}>
        <Typography component="h1" variant="h5">Add Master Story</Typography>
        <TextField sx={{ width: "100%", mt: 2 }} id="original" name="name" label="Master Story name" required value={storyName} onChange={(e) => setStoryName(e.target.value)} />
        {submitting ? (<Spinner />) : (<Button sx={{ width: "100%", mt: 3 }} variant="contained" type="submit">Add</Button>)}
      </Box>
    </Box>
  )
}

export default AddMasterStory;