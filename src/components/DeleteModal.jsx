import Modal from "@mui/material/Modal";
import { Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "../utils/axios";
import { NotifyContext } from "../context/NotifyContext";
import { useContext } from "react";

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

function DeleteModal({
  setOpen,
  sentence,
  open,
  fetchStoryData,
  setError,
  title,
  onComplete,
}) {
  const { toast } = useContext(NotifyContext);
  const deleteSentence = (e) => {
    e.preventDefault();
    axios
      .delete(`/sentences/${sentence._id}`)
      .then((res) => {
        try {
          fetchStoryData();
          setError(null);
          onComplete();
          toast({ message: "Successfully deleted sentences", type: "success" });
        } catch (error) {
          console.log("error", error);
          toast({ message: "error to delete sentences", type: "error" });
        }
      })
      .catch((err) => {
        toast({ message: "error to delete sentences", type: "error" });
        setError(err.response.data.message);
      })
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box component="form" onSubmit={deleteSentence} sx={style}>
        ``
        <Typography
          component="h6"
          variant="h6"
          sx={{ textAlign: "center", fontWeight: "bold" }}
        >
          Are you sure you want to delete sentence "{title}"?
        </Typography>
        <Stack direction="row" spacing={3} sx={{ margin: "1rem auto 0 auto" }}>
          <Button variant="contained" type="submit">
            Yes
          </Button>
          <Button
            variant="contained"
            onClick={() => setOpen(false)}
            color="error"
          >
            No
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
