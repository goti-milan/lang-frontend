import React, { useEffect, useState } from "react";
import axios from "utils/axios";

const useMasterStories = () => {

    const [masterStories, setMasterStories] = useState([]);

    const getMasterStories = async () => {
        try {
            const res = await axios.get("/master-stories");
            setMasterStories([...res.data.data]);
        } catch (error) { }
    }

    const onUpdateMasterStory = async (masterStoryId, data) => {
        await axios.patch(`/master-stories/${masterStoryId}`, data);
        await getMasterStories();
    }

    const deleteMasterStory = async (masterStoryId) => {
        await axios.delete(`/master-stories/${masterStoryId}`);
        await getMasterStories();
    }

    useEffect(() => {
        getMasterStories();
    }, []);

    return { masterStories, getMasterStories, onUpdateMasterStory, deleteMasterStory }

}

export default useMasterStories;