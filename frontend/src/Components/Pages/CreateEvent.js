import React, {useEffect, useState} from 'react';
import { Grid, Container, Typography, IconButton, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import axios from "axios";
import Popup from '../Popup';
import DateTimePicker from '../DateTimePicker'
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
function CreateEvent({userId}) {
  const [id, setId] = useState(userId)
  const [title, setTitle] = useState('')
  const [link, setLink] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [popupEnabled, setPopupEnabled] = useState(false)

  const sendRequest = async () =>  {
    console.log("send ", id)
    const formData = new FormData();
    formData.append('title', title); 
    formData.append('user_id', id);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('posterURL', '');
    formData.append('event link', link);
    try {
        const response = await axios.post(`http://localhost:8080/event/create`, formData);
        console.log(response.data);
      } catch (error) {
        console.error('Error creating exhibition', error);
      }
    handleClose()
    setTitle('')
    setStartDate(null)
    setEndDate(null)
    setLink('')
  }
  const submit = () => {
    console.log("submit")
    setPopupEnabled(true)
  }

  function handleClose() {
    setPopupEnabled(false)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)

  }
  const handleStartDateChange = (newDate) => {
    setStartDate(newDate)
  }
  const handleEndDateChange = (newDate) => {
    setEndDate(newDate)
  }

  const handleLinkChange = (event) => {
    setLink(event.target.value)
  }
  const isSubmitDisabled = !title || !startDate || !endDate || !link;

  return (
    <Container sx={{ mr: 2, ml:8, mt: 5 }}>
      {(popupEnabled &&
        <Popup 
        state={popupEnabled}
        handleClose={handleClose} 
        dialogTitle={"Are you sure to create an exhibition with these data? Please be sure that the information is correct."} 
        handleRequest={sendRequest}
        > 
        </Popup>)}
    
        <Grid container justifyContent="center" alignItems="center" sx={{ padding: 2 }}>
        <Grid item xs={12} md={6}> {/* Adjust the size as needed */}
          <Typography variant="h5" gutterBottom>Create Event</Typography>
          <br></br>
          <Typography variant="h6">Title</Typography>
          <TextField onChange={handleTitleChange} value={title} fullWidth label="Name" variant="outlined" margin="normal" />
          <br></br>
          <br></br>
          <Typography gutterTop variant="h6">Link</Typography>
          <TextField onChange={handleLinkChange} value={link} fullWidth label="Event Link" variant="outlined" margin="normal" />
          <Grid item container spacing={2} sx = {{mt: 1}}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>Start Date</Typography>
            <DateTimePicker handleSelection={handleStartDateChange} minDate={dayjs()}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>End Date</Typography>
            <DateTimePicker handleSelection={handleEndDateChange} />
          </Grid>
        </Grid>
        <br></br>
          <Button onClick={submit} sx={{ mt: 2, backgroundColor: isSubmitDisabled ? "#65647a" : "#302F4D" }} variant="contained" color="primary" disabled={isSubmitDisabled}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CreateEvent;
