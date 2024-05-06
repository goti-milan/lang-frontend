import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import Spinner from "./Spinner";
import axios from "../utils/axios";

function AddSentence(props) {
  const [originalText, setOriginalText] = useState("");
  const [translation, setTranslation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function onAdd(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.append("storyId", props.storyID)
    axios
      .post('/sentences', data).then((res) => {
        props.onComplete?.()
      }).catch((err) => setError(err.response.data.message))
      .finally(() => {
        setSubmitting(false)
      })
  }

  return (
    <>
      {props.storyID &&
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box component="form" onSubmit={onAdd} sx={{ mt: 1 }}>
            <Typography component="h1" variant="h5">Add Sentence</Typography>
            <TextField sx={{ width: "100%", mt: 2 }} id="original" name="original" label="Original Text" multiline required value={originalText} onChange={(e) => setOriginalText(e.target.value)} rows={4} />
            <TextField sx={{ width: "100%", mt: 2 }} id="translated" name="translated" label="Translated Text" required value={translation} onChange={(e) => setTranslation(e.target.value)} multiline rows={4} />
            <Typography component="p" variant="body1" sx={{ color: 'red', mt: 1, mb: 1 }}>
              Check your spelling. You won't be able to edit the text after submitting.
            </Typography>
            {submitting ? (<Spinner />) : (<Button sx={{ width: "100%" }} variant="contained" type="submit">Add</Button>)}
          </Box>
        </Box>
      }
    </>
  )
}

export default AddSentence;