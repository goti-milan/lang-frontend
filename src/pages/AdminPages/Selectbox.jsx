import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ListItem } from "@mui/material";

export default function SelectListButton() {
    const navigate = useNavigate();
    const [list, setList] = useState([
        { name: "Users", value: "users" },
        { name: "Languages", value: "languages" },
        { name: "Templates", value: "templates" },
    ]);

    const handleList = (data) => {
        navigate(`/admin_dashboard/${data?.value}`);
    }

    return (
        <Box>
            <Stack direction="row" marginBottom="-22%">
                <List
                    sx={{
                        border: "1px solid #d3d3d3",
                        borderRadius: "1rem",
                        height: "100%",
                        mt: "7%"
                    }}
                >
                    {
                        list?.map((item, i) => (
                            <ListItem
                                key={i}
                                onClick={() => handleList(item)}
                                sx={{
                                    backgroundColor:
                                        item?.name.toLowerCase() === window.location.href.split("/").pop() && "#d3d3d3"
                                }}
                            >
                                <ListItemButton>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Stack>
        </Box >
    )
}
