import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import axios from "../../utils/axios";
import { TextField } from "@mui/material";
import Spinner from "../../components/Spinner";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AdminHeader from "../../components/AdminHeader";
import Box from "@mui/material/Box";
import SelectListButton from "../AdminPages/Selectbox";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "1rem",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  p: 5,
};

export default function Languages() {
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState(null);

  const getLanguages = () => {
    axios.get("/languages").then((res) => {
      setLanguages(res.data.data);
      setLoading(false);
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios.post("/languages/add", data).then((res) => {
      getLanguages();
    });
  };

  useEffect(() => {
    if (languages == null) {
      getLanguages();
    }
  });

  if (loading) return <Spinner />;

  return (
    <>
      <AdminHeader />
      <SelectListButton />
      <Stack direction="row" mt="10%" justifyContent="center" alignItems="center">
        <Stack mx="20%" width="100%">
          <Box component="form" onSubmit={handleSubmit} display="flex" alignItems="center" mb={3}>
            Add Language
            <TextField required id="name" label="Name" name="name" sx={{ mx: 3 }} />
            <Button type="submit" variant="contained">Add</Button>
          </Box>
          {languages.length ? <List sx={{ width: "100%", border: "1px solid #d3d3d3", borderRadius: "1rem" }}>
            {languages?.map((lang, i) => (
              <ListItem disablePadding key={lang.name} sx={{ padding: "8px 16px" }}>
                <ListItemText primary={lang.name} />
              </ListItem>
            ))}
          </List> : <Box>No languages...</Box>}
        </Stack>
      </Stack>
    </>
  );
}
