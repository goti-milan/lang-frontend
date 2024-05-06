import { Button, createTheme, FormLabel, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "../../../utils/axios";
import React from "react";

const defaultFormTheme = createTheme({ marginBottom: 8 });

const SelectedStory = ({ sentences, selectedSentence, setSelectedSentence, fetchStoryData }) => {

	const handleRemoveMedia = async (name) => {
		await axios.patch(`/sentences/${selectedSentence?._id}`, { [name]: "" });
		setSelectedSentence({ ...selectedSentence, [name]: "" });
	};

	const handleMediaChange = (e) => {
		const name = e.target.name;
		const files = e.target.files;
		setSelectedSentence({ ...selectedSentence, [name]: URL.createObjectURL(files[0]) });
		uploadMedia(name, files[0])
	};

	function uploadMedia(name, file) {
		// setLoading(true);
		if (!selectedSentence) { return }
		const data = new FormData();
		data.append(name, file)
		axios.patch(`/sentences/${selectedSentence?._id}`, data).then((res) => {
			fetchStoryData().then((data) => {
				let updatedSentences = data?.sentences
				if (updatedSentences) {
					for (let idx in updatedSentences) {
						let updatedSentence = updatedSentences[idx]
						if (updatedSentence._id === selectedSentence?._id) {
							setSelectedSentence(updatedSentence)
							return;
						}
					}
				}
			})
		})
	}

	if (!selectedSentence)
		return "";
	return (
		<Stack direction="column" justifyContent="center" alignItems="center" sx={{ flex: 1 }}>
			<Typography variant='h5' component='h3' sx={{ mb: 3 }}>{sentences.indexOf(selectedSentence) === -1 ? `Sentance ${sentences.indexOf(selectedSentence) + 2}` : `Sentance ${sentences.indexOf(selectedSentence) + 1}`}</Typography>
			<Box sx={{ width: '100%', height: { lg: "240px" }, flexDirection: 'row', display: { lg: "flex" }, alignItems: 'flex-start', mb: 4 }} theme={defaultFormTheme}>
				<Box sx={{ height: "100%", width: { xs: "100%", md: '50%' } }}>
					<FormLabel theme={defaultFormTheme}>Image</FormLabel>
					{selectedSentence?.image ? (
						<Box display="flex" justifyContent="space-between" flexDirection="column" sx={{ margin: "auto", textAlign: "center", height: "100%" }}>
							<Box sx={{ height: "180px", mx: "auto" }}>
								<img id="image" width="100%" height="100%" style={{ objectFit: 'contain' }} src={selectedSentence?.image} alt="your image" />
							</Box>
							<Button onClick={() => handleRemoveMedia("image")}>
								Remove Image
							</Button>
						</Box>
					) :
						(<TextField sx={{ width: "100%" }} type="file" name="image" inputProps={{ accept: "image/*" }} onChange={handleMediaChange} />)
					}
				</Box>
				<Box sx={{ height: "100%", width: { xs: "100%", md: '50%' }, ml: { lg: 2 } }} >
					<FormLabel sx={{ mt: 2 }} >Audio</FormLabel>
					{selectedSentence?.audio ? (
						<Box display="flex" justifyContent="space-between" flexDirection="column" sx={{ height: "100%", textAlign: "center" }}>
							<Box mt={8}><audio src={selectedSentence?.audio} type="audio/*" controls style={{ width: "100%" }} /></Box>
							<Button onClick={() => handleRemoveMedia("audio")}>
								Remove Audio
							</Button>
						</Box>
					) :
						(<TextField sx={{ width: "100%" }} type="file" inputProps={{ accept: "audio/*" }} name="audio" onChange={handleMediaChange} />)
					}
				</Box>
			</Box>
			<TextField sx={{ width: "100%" }} id="original" name="original" label="Original Text" multiline required value={selectedSentence?.original} disabled rows={4} />
			<TextField sx={{ width: "100%", mt: 5 }} id="translated" name="translated" label="Translated Text" required value={selectedSentence?.translated} disabled multiline rows={4} />
		</Stack>
	)
}

export default SelectedStory;