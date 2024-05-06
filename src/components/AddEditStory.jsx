import { Box, FormControl, InputLabel, Select, MenuItem, Button, Stack, List, ListItem, ListItemButton, ListItemText, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";

export default function AddEditStory(props) {
  const [originalText, setOriginalText] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [level, setLevel] = useState("a1");
  const [imageURL, setImageURL] = useState(null);
  const [audioURL, setAudioURL] = useState(null);

  function handleLevelChanged(event) {
    setLevel(event.target.value)
  }

  function handleImageChange(event) {

  }

  function handleAudioChange(event) {

  }

  return (
    <>
      <Box sx={{

        marginTop: '32px'
      }}>
        <FormControl sx={{
          width: "80px"
        }}>
          <InputLabel id="demo-simple-select-label">Level</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Level"
            defaultValue="a1"
            value={
              level
            }
            onChange={handleLevelChanged}
          >
            <MenuItem value="a1">a1</MenuItem>
            <MenuItem value="a2">a2</MenuItem>
            <MenuItem value="b1">b1</MenuItem>
            <MenuItem value="b2">b2</MenuItem>
            <MenuItem value="c1">c1</MenuItem>
            <MenuItem value="c2">c2</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ width: "100%", mt: 2 }}
          id="original"
          name="original"
          label="Original Text"
          multiline
          required
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
          rows={4}
        />
        <TextField
          sx={{ width: "100%", mt: 2 }}
          id="translated"
          name="translated"
          label="Translated Text"
          required
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          multiline
          rows={4}
        />
      </Box>
      {/* <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        sx={{ padding: "5px 20%", borderBottom: "1px solid #ddd" }}
      >

        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ flex: 1 }}
        >
          <Box
            component="form"
            onSubmit={updateSentence}
            sx={{ width: "100%" }}
          >

            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={3}
              sx={{ display: { lg: "flex", xs: "block" }, mb: 5 }}
            >
              <Box className="d-flex">
                <Box>
                  {mediaUpload.image !== null ? (
                    <Box>
                      <img
                        id="image"
                        width={"35%"}
                        src={mediaUpload.image}
                        alt="your image"
                      />
                      <Button onClick={() => handleRemoveMedia("image")}>
                        Remove Image
                      </Button>
                    </Box>
                  ) : (
                    ""
                  )}
                  <TextField
                    sx={{ width: "100%" }}
                    type="file"
                    name="image"
                    inputProps={{ accept: "image/*" }}
                    onChange={(e) => handleMediaChange(e)}
                  />
                </Box>
              </Box>
              <Box className="d-flex" sx={{ marginTop: "20px !important" }}>
                <Box>
                  {mediaUpload.audio !== null ? (
                    <Box>
                      <Box>
                        <audio
                          src={mediaUpload.audio}
                          type="audio/*"
                          controls
                        />
                      </Box>
                      <Button onClick={() => handleRemoveMedia("audio")}>
                        Remove Audio
                      </Button>
                    </Box>
                  ) : (
                    ""
                  )}
                  <TextField
                    sx={{ width: "100%" }}
                    type="file"
                    inputProps={{ accept: "audio/*" }}
                    name="audio"
                    onChange={(e) => handleMediaChange(e)}
                  />
                </Box>
              </Box>
            </Stack>

            <TextField
              sx={{ width: "100%" }}
              id="original"
              name="original"
              label="Original Text"
              multiline
              required
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              rows={4}
            />
            <TextField
              sx={{ width: "100%", mt: 5 }}
              id="translated"
              name="translated"
              label="Translated Text"
              required
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              multiline
              rows={4}
            />
            <Button
              variant="contained"
              type="submit"
              style={{
                margin: "4rem auto 0 auto",
                width: "fit-content",
                display: "block",
              }}
            >
              Save
            </Button>
          </Box>
        </Stack>


      </Stack> */}
    </>
  )
}