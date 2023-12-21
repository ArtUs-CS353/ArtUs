import React, { useState, useEffect }  from 'react';
import {Typography, Container, TextField, Select, MenuItem, Button, Grid, Card, ThemeProvider, createTheme, InputLabel, FormControl, Box } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DatePicker from '../DatePicker'
import dayjs from 'dayjs';
import axios from "axios";
import AWS from 'aws-sdk';
import Popup from '../Popup';
import { useNavigate } from 'react-router-dom';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

function UploadArtworkPage({userId, userType}) {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [material, setMaterial] = useState('');
  const [movement, setMovement] = useState('');
  const [rarity, setRarity] = useState('');
  const [date, setDate] = useState('');
  const [file, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('')
  const [size, setSize] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [artistId, setArtistId] = useState(userId)
  const [selectedArtist, setArtist] = useState('')
  const [artists, setArtists] = useState([])
  const [createNewVisible, setVisible] = useState(false);
  const [materialChoices, setMaterials] = useState([])
  const [movementChoices, setMovements] = useState([])
  const [typeChoices, setTypes] = useState([])
  const [rarityChoices, setRarities] = useState([])
  const isSubmitDisabled = !type || !material || !movement || !rarity || !date || !file || !title || !size || !description || (userType == 4 ? (!selectedArtist || selectedArtist == 'Other'): (false)) ; 
  const fileUrl = file ? URL.createObjectURL(file) : '';
  function handleClose() {
    console.log("CLOSE IS SEND")
    setVisible(false)
  }
  function goToArtistCreationPage(){

    console.log("sending  request ")
    navigate(`/createArtist`);
    handleClose()
  }

  //insert access keys here
  AWS.config.update({
    region: 'eu-north-1',
    accessKeyId: 'AKIAZU7ICXJIF7NVZ5MO',
    secretAccessKey: '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'
  });

  const s3 = new AWS.S3();

  async function uploadImageToAWS(file) {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: 'artusb',
        Key: `images/${file.name}`,
        Body: file
      };
  
      s3.upload(params, function(err, data) {
        if (err) {
          console.error("Error FROM AWS", err);
          reject(err);
        } else {
          console.log("Upload Success", data.Location);
          resolve(data.Location);
        }
      });
    });
  }

  const handleFileChange = (event) => {
    console.log("image is ", event.target.files[0])
    setSelectedFile(event.target.files[0])
  };

  const handleImageSelection = () => {
    document.getElementById('image-upload-input').click();
  };

  const handleTypeSelection = (event) => {
    setType(event.target.value);
  };
  
  const handleMaterialSelection = (event) => {
    setMaterial(event.target.value);
  };
  const handleMovementSelection = (event) => {
    setMovement(event.target.value);
  };
  const handleRaritySelection = (event) => {
    setRarity(event.target.value);
  };
  const handleDateSelection = (newDate) =>{
    setDate(newDate);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleArtistChange = (event) => {
    const artistName = event.target.value
    console.log("artist ", event.target.value)
    setArtist(event.target.value)
    if(artistName === "Other"){
      console.log("create nex")
      setVisible(true)
    }
    else{
      const artist = artists.find(artist => (artist.user_name + " " + artist.user_surname) === artistName);
      if (artist) {
        setArtistId(artist.user_id)
      }
    }
    
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const uploadArtwork = async () => {
      let fileUrl = ''
      try {
        fileUrl = await uploadImageToAWS(file);
        // Set state or do something with the fileUrl
      } catch (error) {
        console.log("error: ", error)
        return
        // Handle the error, possibly setting an error message in state
      }
      console.log("file is ", fileUrl)
      const availability = "available"
      const Status = "uploaded"

      const formData = new FormData();
      if(userType == 2){
        console.log("here with ", userId)
        setArtistId(userId)
      }
      // else the selected artist's id , it is already set 

      formData.append('artistId', artistId); 
      formData.append('title', title);
      formData.append('type', type);
      formData.append('size', size);
      formData.append('movement', movement);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('material', material);
      formData.append('rarity', rarity);
      formData.append('imageURL', fileUrl);
      formData.append('date', date);
      formData.append('availability', availability);
      formData.append('Status', Status);

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      setTitle('')
      setType('')
      setMovement('')
      setPrice('')
      setRarity('')
      setMovement('')
      setSize('')
      setDescription('')

      try {
        const response = await axios.post('http://localhost:8080/artwork/upload', formData);
        console.log(response.data);
      } catch (error) {
        console.error('Error uploading artwork:', error);
      }
  }
  useEffect(() => {
    const getArtists = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/artists/allArtists`);
        const artists = response.data;
        console.log("ARTISTS ARE: ", artists)
        setArtists(artists)
      } catch (error) {
        console.error("Failed to fetch recommended artwork: ", error);
        throw error;
      }
    };
  
    getArtists();
  }, []); 

  useEffect(() => {
    const getChoices = async () => {
      try {
        const typesResponse = await axios.get('http://localhost:8080/register/getTypes');
        const materialsResponse = await axios.get('http://localhost:8080/register/getMaterials');
        const raritiesResponse = await axios.get('http://localhost:8080/register/getRarities');
        const movementsResponse = await axios.get('http://localhost:8080/register/getMovements');

        setTypes(typesResponse.data);
        setMaterials(materialsResponse.data);
        setRarities(raritiesResponse.data);
        setMovements(movementsResponse.data);
      } catch (error) {
        console.error('Error fetching preferences data:', error);
      }
    };

    getChoices();
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#302F4D',
      },
      background: {
        default: '#FFFBF5'
      },
      window: {
        default: "#FFFBF5"
      }
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#FFFBF5'
          }
        }
      }
    }
  });
  return (
    <ThemeProvider theme={theme}>
        <Container sx={{pt: 5, pb: 2}}>
          {(createNewVisible === true &&
             <Popup state={createNewVisible}
             handleClose={handleClose} 
             handleRequest={goToArtistCreationPage}
             dialogTitle={"WARNING"} 
             buttonName={"YES"}
             textField= 
             {<>
              <Typography sx={{color:"red"}} variant="h5">You cannot upload an artwork with Other option!</Typography>
              <br></br>
             <Typography variant='h6' >Do you want to send a request to create a new artist?</Typography>
              </>}>

             </Popup>)}
          
      <Card variant="outlined" sx={{ marginTop: 2, padding: 2, backgroundColor: theme.palette.window.default, boxShadow: 1}}>
        <Typography variant="h5" gutterBottom>
          Upload Artwork
        </Typography>
       <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField onChange={handleTitleChange} fullWidth label="Title" variant="outlined" margin="normal" />
            <FormControl fullWidth margin="normal">
                <InputLabel id="type-select-label">Type</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select"
                  value={type}
                  label="Type"
                  onChange={handleTypeSelection}
                >
                   {typeChoices.map((mov, index) => (
                    <MenuItem key={index} value={mov}>{mov}</MenuItem>
                ))}
                  {/* ...other types */}
                </Select>
              </FormControl>
            <TextField onChange={handleSizeChange} fullWidth label="Size" variant="outlined" margin="normal" />
            <FormControl fullWidth margin="normal">
                <InputLabel id="movement-select-label">Movement</InputLabel>
                <Select
                  labelId="movement-select-label"
                  id="movement-select"
                  value={movement}
                  label="Movement"
                  onChange={handleMovementSelection}
                >
               {movementChoices.map((mov, index) => (
                    <MenuItem key={index} value={mov}>{mov}</MenuItem>
                ))}
                </Select>
              </FormControl>
            <TextField onChange={handlePriceChange} fullWidth label="Price" variant="outlined" margin="normal" />
            <Grid container spacing={2}>
              <Grid item xs={6}><DatePicker handleSelection = {handleDateSelection} maxDate={dayjs()} /></Grid>
              <Grid item xs={6}>
              <input
                  accept="image/*" 
                  type="file"
                  id="image-upload-input"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <Button onClick={handleImageSelection} sx = {{mt:1, ml: 4, pt: 1.8, pb: 1.8, pl: 4, pr: 7.5}}  variant="outlined" component="span" margin="normal" startIcon={<PhotoCamera />}>
                Choose Image
              </Button></Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            {(userType == 4 &&
            <>
              <FormControl fullWidth margin="normal">
              <InputLabel id="artist-select-label">Artists</InputLabel>
              <Select
                labelId="artist-select-label"
                id="artist-select"
                value={selectedArtist}
                label="Artist"
                onChange={handleArtistChange}
              >
                {artists.map((artist, index) => (
                <MenuItem value={artist.user_name + " " + artist.user_surname}>{artist.user_name + " " + artist.user_surname}</MenuItem>))}
                 <MenuItem value="Other">
                    <em>Other</em>
                  </MenuItem>
              </Select>
            </FormControl>
           
            </>
              )}
            <FormControl fullWidth margin="normal">
                <InputLabel id="material-select-label">Material</InputLabel>
                <Select
                  labelId="material-select-label"
                  id="material-select"
                  value={material}
                  label="material"
                  onChange={handleMaterialSelection}
                >
                   {materialChoices.map((mov, index) => (
                    <MenuItem key={index} value={mov}>{mov}</MenuItem>
                ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="material-select-label">Rarity</InputLabel>
                <Select
                  labelId="rarity-select-label"
                  id="rarity-select"
                  value={rarity}
                  label="rarity"
                  onChange={handleRaritySelection}
                >
                  {rarityChoices.map((mov, index) => (
                    <MenuItem key={index} value={mov}>{mov}</MenuItem>
                ))}
                </Select>
              </FormControl>
              <TextField onChange={handleDescriptionChange} fullWidth label="Description" variant="outlined" margin="normal" multiline rows={4.5} />
             <Grid container spacing={2}>
             <Grid  item xs={6}>
              {(file &&
              <>
                  <Typography gutterTop>Uploaded image: {file ? file.name : 'No file uploaded'}</Typography>
                  {file && (
                    <Button
                      variant="contained"
                      color="primary"
                      href={fileUrl}
                      download={file.name}
                      startIcon={<CloudDownloadIcon />}
                    >
                      Download Image
                    </Button>
                  )}
                  </>)}
              </Grid>
             <Grid  item xs={6}>
             <Button onClick={uploadArtwork} sx =  {{mt: 3, ml: 12}} variant="contained" color="primary" disabled={isSubmitDisabled}>
              Submit Artwork
            </Button>
             </Grid>
             </Grid>
            
          </Grid>
        </Grid>
      </Card>
    </Container>
    </ThemeProvider>
  );
}

export default UploadArtworkPage;