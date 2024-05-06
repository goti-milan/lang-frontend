import React from 'react'
import axios from "../../utils/axios";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Spinner from "../../components/Spinner";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";


export default function SelectLanguages({ setItem }) {

    const [language, setLanguage] = useState(null);
    const [select, setSelect] = useState()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (language === null) {
            getLanguages();
        }
    }, []);
    useEffect(() => {
        setItem(language?.length ? language[0]?._id : "");
    }, [language])

    const getLanguages = () => {
        axios.get("/languages").then((res) => {
            setLanguage(res.data.data);
            setLoading(false);
        });
    };

    const selectLanguage = (lang) => {
        setSelect(lang)
        setItem(lang._id);
    }

    if (loading) return <Spinner />;
    return (
        <Box sx={{ maxWidth: 110, ml: "auto" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Language"
                    value={select ? select?.name : language?.length ? language[0]?.name : ""}
                >
                    {language?.map((lang, i) => (
                        <MenuItem key={i} onClick={() => selectLanguage(lang)} value={`${lang.name}`} >{lang.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    )
}
