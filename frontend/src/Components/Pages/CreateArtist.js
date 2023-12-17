import React, {useEffect, useState} from 'react';
import { Grid, Container, Typography, IconButton, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";
import Popup from '../Popup';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
function CreateArtist({userId,userType}) {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [details, setDetails] = useState('')
  const [biography, setBiography] = useState('')
  const [popupEnabled, setPopupEnabled] = useState(false)
  const [id,setId] = useState(-1)
  const navigate = useNavigate();

  const getArtwork = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/artwork/${id}`);
      console.log("ARTWORK: ", response.data)
      const artwork = response.data;
      return artwork;
    } catch (error) {
      console.error("Failed to fetch artist: ", error);
      throw error;
    }

  }
  const sendRequest = async () =>  {
    console.log("send ")
    const formData = new FormData();
    formData.append('user_name', name); 
    formData.append('user_surname', surname);
    formData.append('profile_details', details);
    formData.append('biography', biography);
    try {
        const response = await axios.post(`http://localhost:8080/artist_request/createRequest`, formData);
        console.log(response.data);
      } catch (error) {
        console.error('Error sending artist request:', error);
      }
    handleClose()
    setName('')
    setSurname('')
    setDetails('')
    setBiography('')
  }
  const submit = () => {
    console.log("submit")
    setPopupEnabled(true)
  }

  function handleClose() {
    setPopupEnabled(false)
  }
  function handleGoBack(){
    navigate(`/uploadArtwork`);
  }

  const handleNameChange = (event) => {
    setName(event.target.value)

  }
  const handleSurnameChange = (event) => {
    setSurname(event.target.value)
  }
  const handleDetailsChange = (event) => {
    setDetails(event.target.value)
  }
  const handleBiographyChange = (event) => {
    setBiography(event.target.value)
  }
  const isSubmitDisabled = !name || !surname || !details || !biography;

  return (
    <Container sx={{ mr: 2, ml:8, mt: 5 }}>
        <IconButton
        size="medium"
        aria-label="back"
        sx={{mt:2}}
        onClick={handleGoBack}
      >
        <ArrowBackIcon />
      </IconButton>
      {(popupEnabled &&
        <Popup 
        state={popupEnabled}
        handleClose={handleClose} 
        dialogTitle={"Are you sure to send artist request to admin? Please be sure that the information is correct."} 
        handleRequest={sendRequest}
        > 
        </Popup>)}
    
              <Grid container direction="column" justifyContent="center" sx={{ padding: 2 }}>
                <Typography  variant="h5" gutterBottom>Create Artist</Typography>
                <TextField onChange={handleNameChange} value = {name} fullWidth label="Name" variant="outlined" margin="normal" />
                <TextField onChange={handleSurnameChange} value = {surname} fullWidth label="Surname" variant="outlined" margin="normal" />
                <TextField onChange={handleDetailsChange} value = {details} fullWidth label="Details" variant="outlined" margin="normal" />
                <TextField onChange={handleBiographyChange} value = {biography} multiline rows={4.5} fullWidth label="Biograpghy" variant="outlined" margin="normal" />
                <Button  onClick={submit} sx={{ mt: 2, backgroundColor: isSubmitDisabled ? "#65647a" : "#302F4D" }} variant="contained" color="primary" disabled={isSubmitDisabled}>
              Submit
            </Button>
              </Grid>
              <Grid container sx = {{mt:8,ml:15}}>
              </Grid>
    </Container>
  );
}

export default CreateArtist;
