import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useState, useEffect } from "react";
import axios from "../utils/axios";
import TextItem from "./TextItem";
import UrlItem from "./UrlItem";
import RichTextItem from "./RichTextItem";
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Grid from '@mui/material/Grid';
import TableData from "./TableData";
import { findWordClassName } from "lib/findSelectedWordClassName";
import { NotifyContext } from "../context/NotifyContext"
import { useContext } from 'react';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function Items({
  setLoading,
  setError,
  words,
  items,
  item,
  langId,
  fetchItemsData
}) {
  const [type, setType] = useState("");
  const [itemsList, setItemsList] = useState(item?.items);
  const [selectedWords, setSelectedWords] = useState(item?.selectedWords);
  const [itemUpdated, setItemUpdated] = useState(false);
  const [template, setTemplates] = useState();
  const [select, setSelect] = useState(false);
  const [selectedAllWords, setSelectedAllWords] = useState([]);
  const { toast } = useContext(NotifyContext);


  useEffect(() => setSelectedWords(item?.selectedWords), [item?.selectedWords]);

  useEffect(() => {
    setSelectedAllWords(items.reduce((selectedWords, item) => ([...selectedWords, ...item.selectedWords]), []));
    setItemsList(item?.items);
  }, [items])

  const fetchTemplate = () => {
    axios.get(`/template/${langId}`).then((res) => {
      setTemplates(res.data.data.template);
      setLoading(false);
    });
  };

  const updateItem = (e, temp) => {
    if (e) e?.preventDefault();
    axios
      .patch(`/items/${item._id}`, {
        items: temp || itemsList,
      })
      .then(fetchItemsData, toast({ message: "Successfully update items", type: "success" }))
      .catch((err) => {
        setError(err.response.data.message);
        toast({ message: "error to update items", type: "error" })
      });

  }

  useEffect(() => {
    fetchTemplate();
  }, [langId]);

  const addItemHandler = () => {
    let list = [];
    if (type === "text") {
      list = [...itemsList, { type, index: itemsList.length, indent: 1, text: "" }]
    } else if (type === "rich_text") {
      list = [...itemsList, { type, index: itemsList.length, rich_text: "" }]
    } else if (type === "table") {
      list = [...itemsList, {
        type, index: itemsList.length, table: select ? select?.data : [
          [{ type: "text", index: 0, indent: 1, rich_text: "" }, { type: "rich_text", index: 1, indent: 1, rich_text: "" }],
          [{ type: "text", index: 0, indent: 1, rich_text: "" }, { type: "rich_text", index: 1, indent: 1, rich_text: "" }],
        ]
      }]
    } else {
      list = [...itemsList, { type, index: itemsList.length }];
    }
    updateItem("", list);
    setType("")
  };

  const deleteItem = (index) => {
    updateItem("", itemsList.filter((item) => item.index !== index));
  };

  const setValue = (index, value, type) => {
    const listObj = [...itemsList];
    const itemIndex = listObj.findIndex((item) => item.index === index);
    listObj[itemIndex][type] = value;

    setItemsList(listObj);
    setItemUpdated(true);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const isExist = selectedWords?.find(
      ({ index, length }) => index === value.index && length === value.length
    );
    if (isExist) {
      setSelectedWords(
        selectedWords.filter(
          ({ index, length }) =>
            !(index === value.index && length === value.length)
        )
      );
    } else {
      setSelectedWords([...selectedWords, value]);
    }
    setItemUpdated(true);
  };

  const handleEnd = (result) => {
    let temp = [...itemsList];
    let [selectRow] = temp.splice(result.source.index, 1)
    temp.splice(result.destination.index, 0, selectRow);
    updateItem("", temp);
    setItemsList(temp)
  }

  const setTemplateType = ({ target }) => {
    setSelect(target.value);
  }
  return (
    <Box sx={{ margin: "20px auto", border: "1px solid #ddd", backgroundColor: "#f7f7f7", p: 2 }}>
      <Box sx={{ border: "1px solid #ddd", backgroundColor: "white", borderRadius: "8px", mb: 2, p: 2 }} className="selectbox">
        {words?.map(({ word, ...p }, i) => <Box key={i} className={`words-items ${findWordClassName(selectedAllWords, selectedWords, p)}`}>{word}</Box>)}
      </Box>
      <Box sx={{ border: "1px solid #ddd", backgroundColor: "white", borderRadius: "8px", pt: 2, pb: 4 }} className="selectbox">
        <Typography sx={{ textAlign: "center", mb: 2 }}>Add New Item</Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", px: 4, gap: "1rem", }}>
          <Grid container sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Grid item xs={10} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ mr: 2 }}>Choose Type</Typography>
                <FormControl fullWidth sx={{ minWidth: "200px", maxWidth: "200px" }}>
                  <InputLabel>Type</InputLabel>
                  <Select value={type} label="Type" onChange={(e) => setType(e.target.value)} >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="rich_text">Rich Text</MenuItem>
                    <MenuItem value="url">URL</MenuItem>
                    <MenuItem value="table">Table</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {type === "table" ?
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ mr: 2, ml: 5 }}>Choose Template</Typography>
                  <FormControl fullWidth sx={{ minWidth: "200px", maxWidth: "200px" }}>
                    <InputLabel>Type</InputLabel>
                    <Select label="Type" onChange={setTemplateType} value={select}>
                      <MenuItem key={0} value={false}>{"-"}</MenuItem>
                      {template?.map((item, i) => (
                        <MenuItem key={i + 1} value={item ? item : ""}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box> : ""}
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              <Button variant="contained" onClick={addItemHandler} disabled={type ? false : true} sx={{ ml: 2 }}>Add</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {
        itemsList.length ?
          <Box sx={{ my: 2, p: 1 }}>
            <Box component="form" onSubmit={updateItem} sx={{ p: 2, backgroundColor: "#fff", border: "1px solid #ddd" }}>
              <DragDropContext onDragEnd={(result) => handleEnd(result)}  >
                <Droppable droppableId={`${itemsList.length}`}>
                  {
                    (provided) => (
                      <div ref={provided.innerRef}{...provided.droppableProps}>
                        {itemsList.map((item, index) => {
                          return <Draggable key={`index${index}`} draggableId={index.toString()} index={index}>
                            {
                              (provided) => {
                                return <div key={item.type} index={index} ref={provided.innerRef} {...provided.draggableProps}>
                                  {
                                    item.type === 'text' ?
                                      <div className="texteeditor">
                                        <Button
                                          className="dragbtn"
                                          sx={{ ml: 2 }}
                                          {...provided.dragHandleProps}
                                        >
                                          <DensitySmallIcon />
                                        </Button>

                                        <TextItem
                                          key={item.index}
                                          setIndent={(value) =>
                                            setValue(item.index, Number(value), "indent")
                                          }
                                          setText={(value) => setValue(item.index, value, "text")}
                                          deleteItem={() => deleteItem(item.index)}
                                          text={item.text}
                                          indent={item.indent}
                                        />
                                      </div> : ""
                                  }
                                  {
                                    item.type === "url" ?
                                      <div className="texteeditor">
                                        <Button
                                          className="dragbtn"
                                          {...provided.dragHandleProps}
                                          sx={{ ml: 2 }}
                                        >
                                          <DensitySmallIcon />
                                        </Button>
                                        <UrlItem
                                          item={item}
                                          key={item.index}
                                          deleteItem={() => deleteItem(item.index)}
                                          url={item.url}
                                          term={item.term}
                                          setValue={(value, type) => setValue(item.index, value, type)}
                                          setItemUpdated={setItemUpdated}
                                          setItemsList={setItemsList}
                                          itemsList={itemsList}
                                        />

                                      </div> : ""
                                  }
                                  {
                                    item.type === "rich_text" ?
                                      <div className="texteeditor" >
                                        <Button
                                          className="dragbtn"
                                          {...provided.dragHandleProps}
                                          sx={{ ml: 2 }}
                                        >
                                          <DensitySmallIcon />
                                        </Button>
                                        <RichTextItem
                                          key={item.index}
                                          deleteItem={() => deleteItem(item.index)}
                                          richText={item.rich_text}
                                          setItemUpdated={setItemUpdated}
                                          setValue={(value) => setValue(item.index, value, "rich_text")}
                                        />

                                      </div> : ""
                                  }
                                  {
                                    item.type === "table" ?
                                      <div className="texteeditor">
                                        <Button
                                          className="dragbtn"
                                          {...provided.dragHandleProps}
                                          sx={{ ml: 2 }}
                                        >
                                          <DensitySmallIcon />
                                        </Button>
                                        <TableData
                                          key={item.index}
                                          setTable={(value) => setValue(item.index, value, "table")}
                                          setItemUpdated={setItemUpdated}
                                          deleteItem={() => deleteItem(item.index)}
                                          table={item?.table}
                                        />
                                      </div> : ""
                                  }
                                </div>
                              }}
                          </Draggable>
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                </Droppable>
              </DragDropContext>
              <Button variant="contained" sx={{ m: "auto", display: "block", my: 3, fontWeight: "bold" }} type="submit" disabled={itemUpdated ? false : true}>
                Save
              </Button>
            </Box>
          </Box> : ""
      }
    </Box>
  );
}

export default Items;
