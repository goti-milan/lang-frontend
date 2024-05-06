import { Box, Button, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material'
import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react'
import AdminDashboard from './AdminDashboard'
import TableData from '../../components/TableData';
import SelectLanguages from './SelectLanguages';
import List from "@mui/material/List";

function Template() {
    const [templates, setTemplates] = useState([]);
    const [selectTemplate, setSelectTemplate] = useState();
    const [loading, setLoading] = useState(true)
    const [item, setItem] = useState();
    const [name, setName] = useState("");

    const setUpdateTemplate = () => {
        axios.patch(`/template/${selectTemplate?._id}`, { data: selectTemplate?.data, });
    }

    const fetchTemplate = () => {
        if (item) {
            axios.get(`/template/${item}`).then((res) => {
                setTemplates(res.data.data.template);
                let selectedTemp = {};
                if (name)
                    selectedTemp = res.data.data.template.find((template) => name.trim() === template.name);
                else if (selectTemplate?.name)
                    selectedTemp = res.data.data.template.find((template) => selectTemplate.name === template.name) || res.data.data.template?.[0];
                else
                    selectedTemp = res.data.data.template?.[0] || {};
                setSelectTemplate(selectedTemp);
                setLoading(false);
            });
        }
    };

    const selectSentence = (template) => {
        setSelectTemplate(template)
    }

    useEffect(() => {
        if (item) {
            fetchTemplate();
        }
    }, [item]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name) {
            let data = [[{ type: 'rich_text', index: 0, rich_text: { blocks: [], entityMap: {} } }, { type: 'rich_text', index: 0, rich_text: { blocks: [], entityMap: {} } }], [{ type: 'rich_text', index: 0, rich_text: { blocks: [], entityMap: {} } }, { type: 'rich_text', index: 0, rich_text: { blocks: [], entityMap: {} } }]]
            axios.post("/template", { name: name.trim(), language: item, data }).then((res) => {
                fetchTemplate();
                setName("");
            }).catch((err) => {
                console.log(err)
            })
        }
    }

    const setTableValue = (index, value) => {
        let listObj = [...templates];
        const itemIndex = templates.findIndex((item) => item._id === index);
        listObj[itemIndex].data = value;
        setTemplates(listObj);
    }

    return (
        <Box>
            <AdminDashboard />
            <Box mx="20%" mt="5%">
                <Box mb={3} display="flex" alignItems="center">
                    <TextField id="name" label="Template Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} required />
                    <Button variant="contained" type="submit" onClick={handleSubmit} sx={{ ml: 3 }}>ADD</Button>
                    <SelectLanguages setItem={setItem} />
                </Box>
                <Box>
                    {templates.length ?
                        <Box sx={{ border: "1px solid #d3d3d3", borderRadius: "1rem", overflow: "auto", height: "340px", mb: 5 }}>
                            {templates?.map((template, i) => (
                                <ListItem disablePadding key={i} onClick={() => selectSentence(template)} sx={{ backgroundColor: template?._id === selectTemplate?._id && "#d3d3d3", }}>
                                    <ListItemButton>
                                        <ListItemText primary={template.name} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </Box> : ""
                    }
                </Box>
                {templates?.length ?
                    <Box sx={{ border: "1px solid #d3d3d3", overflow: "hidden", mb: 1, p: 2 }}>
                        {selectTemplate?._id ?
                            <List sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableData table={selectTemplate?.data} setTable={(value) => setTableValue(selectTemplate?._id, value)} />
                            </List> : ""
                        }
                        <Button variant="contained" sx={{ m: "auto", display: "block", my: 3, fontWeight: "bold" }} onClick={setUpdateTemplate}>
                            Save
                        </Button>
                    </Box> : "No template selected"
                }
            </Box>
        </Box>
    )
}

export default Template;