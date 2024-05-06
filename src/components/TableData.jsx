import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button } from "@mui/material";
import { IconButton, Stack, TextField } from "@mui/material";
import RichTextItem from "./RichTextItem";
import TableItem from "./TableItem";
import { ContentState, convertFromHTML, EditorState } from "draft-js";

const myTheme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#3f51b5",
        },
        secondary: {
            main: "#f50057",
        },
        background: {
            paper: "white",
            default: "white",
        },
    },
});

const TableData = (props) => {
    const { setTable, table, setItemUpdated, deleteItem, setLoading } = props;
    const [rowColNum, setRowColNum] = useState({
        row: table[0]?.length,
        column: table?.length,
    });

    const updateCell = (index, row, col, type, text) => {
        const newTable = [...table];
        newTable[row][col] = { type, index, rich_text: text };
        setTable(newTable);
        typeof setItemUpdated === "function" && setItemUpdated(true); //making the save button active
    };
    const onAddRemoveColumns = () => {
        const { row, column } = rowColNum;
        let tableClone = table;
        if (tableClone.length > column) {
            tableClone = [...tableClone.splice(0, column)];
        } else if (tableClone.length < column) {
            const colTable = Array.from({ length: column - tableClone.length }).map(
                (_, i) =>
                    Array.from({ length: tableClone[0].length }).map(() => ({
                        type: "rich_text",
                        index: 0,
                        rich_text: "",
                    }))
            );
            tableClone = [...tableClone, ...colTable];
        }
        if (tableClone[0].length > row) {
            tableClone = [...tableClone.map((colData) => colData.splice(0, row))];
        } else if (tableClone[0].length < row) {
            tableClone = [
                ...tableClone.map((colData) => [
                    ...colData,
                    ...Array.from({ length: row - tableClone[0].length }).map(() => ({
                        type: "rich_text",
                        index: 0,
                        rich_text: "",
                    })),
                ]),
            ];
        }
        setTable([...tableClone]);
    };

    return (
        <Box className='tableinput' sx={{ backgroundColor: '#f7f7f7' }} >
            <ThemeProvider theme={myTheme}>
                <Box sx={{ margin: "10px 0", display: "flex", justifyContent: "space-evenly", }} >
                    <TextField id="outlined-name" name="row" label="Row" value={rowColNum.row} onChange={({ target }) => setRowColNum({ ...rowColNum, [target.name]: target.value })} />
                    <TextField id="outlined-name" name="column" label="Column" value={rowColNum.column} onChange={({ target }) => setRowColNum({ ...rowColNum, [target.name]: target.value })} />
                    <Button onClick={onAddRemoveColumns} variant="contained">Add</Button>
                </Box>
                <Stack direction="row" alignItems="center" spacing={5}>
                    <TableContainer component={Paper}>
                        <Table sx={{ border: "1px solid #d3d3d3", minWidth: 650 }} aria-label="simple table">
                            <TableBody>
                                {table.map((value, i) => (
                                    <TableRow key={i} sx={{ display: "flex" }}>
                                        {table[i].map((value, j) => {
                                            return (
                                                <TableCell key={j} width={`${100 / table[i].length}%`} align="center">
                                                    <RichTextItem key={`${i}${j}`} deleteItem={() => deleteItem} richText={value.rich_text} setItemUpdated={setItemUpdated} setValue={(state) => updateCell(value.index, i, j, value.type, state)} hideDeleteBtn={true} />
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableItem deleteItem={deleteItem} />
                </Stack>
            </ThemeProvider>
        </Box>
    );
};

export default TableData;