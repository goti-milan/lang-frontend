import React, { useEffect, useState } from 'react';
import { IconButton, Stack } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';

const myTheme = createTheme({
    alette: {
        type: "light",
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
    },
});

const RichTextItem = (props) => {
    const { deleteItem, richText, setValue, setItemUpdated, hideDeleteBtn } = props;
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorChange = (event) => {
        if (typeof setItemUpdated === "function") setItemUpdated(true);
        setEditorState(event);
    };

    useEffect(() => {
        try {
            if (richText) {
                setEditorState(EditorState.createWithContent(convertFromRaw({ ...richText, entityMap: richText?.entityMap || {} })));
            }
        } catch (error) { }
    }, [richText]);

    return (
        <ThemeProvider theme={myTheme}>
            <Stack sx={{ backgroundColor: '#f7f7f7', margin: "10px 0", padding: "5px" }} direction='row' alignItems='center' spacing={5} justifyContent='space-between' className='textinput'>
                <Editor
                    editorStyle={{ padding: "5px", fontSize: "16px", height: "150px" }}
                    wrapperStyle={{ border: "1px solid #d3d3d3", width: "100%", backgroundColor: "white" }}
                    editorState={editorState}
                    placeholder="Type something here..."
                    onEditorStateChange={onEditorChange}
                    toolbar={{ options: ['inline', 'textAlign', 'history', 'fontSize'], fontSize: { options: [12, 16, 24, 30] } }}
                    onBlur={() => setValue(convertToRaw(editorState?.getCurrentContent()))}
                />
                {!hideDeleteBtn &&
                    <Stack direction='row' alignItems='center' spacing={5}>
                        <IconButton aria-label='delete item' color='error' sx={{ p: 1, backgroundColor: '#ececec' }} onClick={deleteItem}>
                            <ClearIcon />
                        </IconButton>
                    </Stack>
                }
            </Stack>
        </ThemeProvider>
    );
};

export default RichTextItem;