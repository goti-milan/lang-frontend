import AdminHeader from "../../components/AdminHeader";
import Box from "@mui/material/Box";
import SelectListButton from "./Selectbox";

export default function AdminDashboard() {
  return (
    <>
      <AdminHeader />
      <Box sx={{ mr: "20%" }}>
        <SelectListButton />
      </Box>
    </>
  );
}
