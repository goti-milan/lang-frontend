import React, { useContext } from 'react'
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import Spinner from "../../components/Spinner";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import AdminDashboard from './AdminDashboard';
import { NotifyContext } from "../../context/NotifyContext"

export default function User() {
    const [loadData] = useState(true);
    const [loading, setLoading] = useState(true);
    const [writers, setWriters] = useState(null);
    const [languages, setLanguages] = useState(null);
    const { toast } = useContext(NotifyContext)

    useEffect(() => {
        Promise.all([getWriters(), getLanguages()]).then(() => {
            setLoading(false);
        });
    }, [loadData]);

    const getLanguages = () => {
        return axios.get("/languages").then((res) => {
            setLanguages(res.data.data);
        });
    };

    const getWriters = () => {
        return axios.get("/users/writers").then((res) => {
            setWriters(res.data.data);
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        axios.post("/users/writers/add", data).then((res) => {
            getWriters();
        });
    };

    const removeDuplicateItems = (arrayOfObject) => {
        const ids = arrayOfObject.map((o) => o._id);
        return arrayOfObject.filter(
            ({ _id }, index) => !ids.includes(_id, index + 1)
        ).map((writer) => ({ ...writer, languages: writer.languages.map(({ _id }) => _id) }));
    };

    const updateUsersLanguages = () => {
        const uniqueArray = removeDuplicateItems(writers);
        axios
            .put(`/users/language-bulk-update`, uniqueArray)
            .then((result) => {
                console.log(result)
                toast({ message: "Successfully update languages", type: "success" })
            })
            .catch((err) => {
                console.log(err);
                toast({ message: "error to update languages", type: "error" })
            });
    };

    const onUserLangUpdate = (event, uid) => {
        const { target: { value }, } = event;
        const newWriters = writers.map((writer) => writer._id.toString() === uid.toString() ? ({ ...writer, languages: languages.filter(({ _id }) => value.includes(_id)) }) : writer)
        setWriters([...newWriters]);
    }

    if (loading) return <Spinner />;
    return (
        <Stack direction="column">
            <AdminDashboard />
            <Box mx="20%" mt="6%" sx={{ border: '1px solid #d3d3d3', borderRadius: "1rem", p: 3 }}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="caption table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Languages</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {writers?.map((writer, i) => (
                                <TableRow key={writer._id}>
                                    <TableCell>{writer.username}</TableCell>
                                    <TableCell>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" multiple value={writer.languages.map(({ _id }) => _id)} onChange={(e) => onUserLangUpdate(e, writer._id)} label="Selected Words">
                                            {languages?.map((lang, i) => (
                                                <MenuItem key={i} value={lang._id}>
                                                    {lang.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button
                    onClick={updateUsersLanguages}
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Update Users
                </Button>

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    Add User
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">
                                Username
                            </InputLabel>
                            <FilledInput
                                id="filled-adornment-password"
                                name="username"
                                type="text"
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">
                                Password
                            </InputLabel>
                            <FilledInput
                                id="filled-adornment-password"
                                name="password"
                                type="password"
                            />
                        </FormControl>

                        <FormControl sx={{ m: 1, width: "25ch" }} variant="filled">
                            <InputLabel htmlFor="filled-adornment-password">
                                Confirm Password
                            </InputLabel>
                            <FilledInput
                                id="filled-adornment-password"
                                name="passwordConfirm"
                                type="password"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Stack>
    )
}
