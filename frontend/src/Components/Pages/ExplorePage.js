import React, {useEffect, useState} from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Container } from '@mui/material';
import Slider from 'react-slick';
import DisplayImages from '../DisplayImages'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { ArtworkData } from '../ArtworkData';
import { ArtistData } from '../ArtistData';
import axios from "axios";
import DisplayEvents from '../DisplayEvents';
import Popup from '../Popup';
import "../../App.css"

function ExplorePage({userId, userType}) {
  const settings = {
    infinite: false,
    speed: 500,
    mr: 2,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true
  };
  const navigate = useNavigate();
  const artworks = ArtworkData;
  const artists = ArtistData;
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [recommendedArtworks, setRecommendedArtworks] = useState([]);
  const [featuringArtists, setFeaturingArtists] = useState([]);
  const [exhibitions, setExhibitions] = useState([]);
  const [events, setEvents] = useState([]);
  const [popupEnabled, setPopupEnabled] = useState(false)
  const [link, setLink] = useState('')
  console.log("user type is ", userType)

  function handleArtworkClick(artwork){
    console.log("here withh ", userType)
    if(userType == 2 ){
      navigate(`/details/${artwork.artwork_id}`);
    }
    else if (artwork.status === "auction"){
      //navigate to auction page
      console.log("GOING TO AUCTION PAGE")
      navigate(`/auction/${artwork.artwork_id}`);
    }
    else if (artwork.status === "sale") {
      //navigate to buy page
      console.log("GOING TO BUY PAGE")
      navigate(`/buy/${artwork.artwork_id}`);
    }
    else{
      //navigate to details page
      navigate(`/details/${artwork.artwork_id}`);
    }

  }
  function handleArtistClick(artist){
    console.log("ARTIST CLICKED ", artist.user_id)
    navigate(`/artistDisplayed/${artist.user_id}`)
  }

  function handleExhibitionClick(exhibition) {
    console.log("cliked exh ", exhibition.exhibition_id)
    navigate(`/exhibition/${exhibition.exhibition_id}`)
  }

  
  function handleEventClick(exhibition) {
    console.log("cliked exh ", exhibition)
    setLink(exhibition.meeting_link)
    setPopupEnabled(true)
  }

  const getArtist = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/artists/${id}`);
      const artist = response.data;
      return artist;
    } catch (error) {
      console.error("Failed to fetch artist: ", error);
      throw error;
    }
  };

  const getArtistUrl = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/artists/${id}/artwork_url`);
      const url = response.data;
      return url;
    } catch (error) {
      console.error("Failed to fetch artist url: ", error);
      throw error;
    }
  };

  useEffect(() => {
    const getRecommendedArtworks = async () => {
      try {
        let response;
        if(userType == 2){
          response = await axios.get(`http://localhost:8080/artwork/explorePage/${userId}`);
        }
        else{
          response = await axios.get(`http://localhost:8080/artwork/explorePage`);
        }
        
        const artworks = response.data;
        console.log("ARTWORKS: ", artworks)
        const artworksWithArtists = await Promise.all(artworks.map(async (artwork) => {
          const artist = await getArtist(artwork.artist_id);
          const year = new Date(artwork.date).getFullYear();
          console.log("year: ", year)
          return {
            ...artwork,
            artist: artist.user_name + " " + artist.user_surname,
            year: year
          };
        }));
        console.log("updated list : ", artworksWithArtists)
        setRecommendedArtworks(artworksWithArtists)
      } catch (error) {
        console.error("Failed to fetch recommended artwork: ", error);
        throw error;
      }
    };
  
    getRecommendedArtworks();
  }, []); 

  useEffect(() => {
    const getFeaturingArtists = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/artists/featuring_artists`);
        const artists = response.data;
        console.log("featuring artists are: ", artists)
        const formattedArtists = await Promise.all(artists.map(async (artist) => {
        const url = await getArtistUrl(artist.user_id);
          return {
            ...artist,
            artist: artist.user_name + " " + artist.user_surname,
            imageURL: url
          };
        }));
        setFeaturingArtists(formattedArtists)
        console.log("featuing artists ", featuringArtists)
      } catch (error) {
        console.error("Failed to fetch featuring artist: ", error);
        throw error;
      }
    };
    getFeaturingArtists()
  }, []); 

  useEffect(() => {
    const getFeaturingArtworks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/artwork/getAllFeatured`);
        const artworks = response.data;
        console.log("ARTWORKS: ", artworks)
        const artworksWithArtists = await Promise.all(artworks.map(async (artwork) => {
          const artist = await getArtist(artwork.artist_id);
          const year = new Date(artwork.date).getFullYear();
          console.log("year: ", year)
          return {
            ...artwork,
            artist: artist.user_name + " " + artist.user_surname,
            year: year
          };
        }));
        console.log("updated list : ", artworksWithArtists)
        setFeaturedArtworks(artworksWithArtists)
      } catch (error) {
        console.error("Failed to fetch featuring artworks: ", error);
        throw error;
      }
    };
  
    getFeaturingArtworks();
  }, []); 

  useEffect(() => {
    const getExhibitions = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/exhibition/getAllExhibitions`);
        const exhibitions = response.data;
        console.log("EXHIBITIONS: ", exhibitions)
        const exhibitionFormatted = await Promise.all(exhibitions.map(async (exhibition) => {
          const date1 = new Date(exhibition.start_date);
          const startDate = date1.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
          const date2 = new Date(exhibition.end_date);
          const endDate = date2.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
          console.log("start ", startDate)
          return {
            ...exhibition,
            startDate: "Starts: " +startDate,
            endDate: "Ends: " + endDate
          };
        }));
        setExhibitions(exhibitionFormatted)
      } catch (error) {
        console.error("Failed to fetch recommended artwork: ", error);
        throw error;
      }
    };
  
    getExhibitions();
  }, []); 

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/event/getAllApprovedFutureEvents`);
        const events = response.data;
        const eventsFormatted = await Promise.all(events.map(async (event) => {
          const date1 = new Date(event.start_date);
          const startDate = date1.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
          const date2 = new Date(event.end_date);
          const endDate = date2.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });
          console.log("start ", startDate)
          return {
            ...event,
            startDate: "Starts: " +startDate,
            endDate: "Ends: " + endDate
          };
        }));
        setEvents(eventsFormatted)
      } catch (error) {
        console.error("Failed to fetch events: ", error);
        throw error;
      }
    };
  
    getEvents();
  }, []); 
  function handleClose() {
    setPopupEnabled(false)
  }
  return (
    <Container sx = {{mb: 3}}>
      {(popupEnabled &&
        <Popup 
        buttonName={"OK"}
        state={popupEnabled}
        textField={<Typography>{link}</Typography>}
        handleClose={handleClose} 
        dialogTitle={"Event takes place at the following link"}  
        handleRequest={handleClose}
        > 
        </Popup>)}
        <Grid sx = {{backgroundColor:"white" , padding: 3 , pt: 0.2, mt: 2.5, borderRadius: 2, boxShadow: 2}}>
        <Typography sx = {{mt: 2}} variant="h5" gutterBottom >
          Featured Artworks
        </Typography>
        <Slider  {...settings}>
        {featuredArtworks.map((artwork, index) => (
           <div key={index}>
            <DisplayImages type = "artwork" artwork={artwork} func = {handleArtworkClick}/>
           </div>
      ))}
       </Slider>

        </Grid>

        <Grid sx = {{backgroundColor:"white" , padding: 3 , pt: 0, borderRadius: 2, boxShadow: 2}}>
        <Typography sx = {{mt: 5, pt: 2}} variant="h5" gutterBottom >
          Featured Artists
        </Typography>
        <Slider {...settings}>
        {featuringArtists.map((artist, index) => (
           <div key={index}>
            <DisplayImages type = "artist" artwork={artist} func = {handleArtistClick}/>
           </div>
      ))}
       </Slider>
        </Grid>

        <Grid sx = {{backgroundColor:"white" , padding: 3 , pt: 0, borderRadius: 2, boxShadow: 2}}>
       <Typography sx = {{mt: 5, pt: 2}} variant="h5" gutterBottom >
          Online Exhibitions
        </Typography>
        {exhibitions.length == 0 && (
          <Typography>There are no available online exhibitions</Typography>
        )}
        <Slider {...settings}>
        {exhibitions.map((exhibition, index) => (
           <div key={index}>
            <DisplayEvents event={exhibition}  type = {"exhibition"} func = {handleExhibitionClick}/>
           </div>
      ))}
       </Slider>
       </Grid>

       <Grid sx = {{backgroundColor:"white" , padding: 3 , pt: 0, borderRadius: 2, boxShadow: 2}}>
       <Typography sx = {{mt: 5, pt: 2}} variant="h5" gutterBottom >
          Events
        </Typography>
        {exhibitions.length == 0 && (
          <Typography>There are no available events</Typography>
        )}
        <Slider {...settings}>
        {events.map((workshops, index) => (
           <div key={index}>
            <DisplayEvents event={workshops} type = {"event"} func = {handleEventClick}/>
           </div>
      ))}
       </Slider>
       </Grid>
      

       <Grid sx = {{backgroundColor:"white" , padding: 3 , pt: 0, borderRadius: 2, boxShadow: 2}}>
        {userType == 2 && (
           <Typography sx = {{mt: 2, pt: 2}} variant="h5" gutterBottom >
           Explore
         </Typography>
        )}
        {(userType == 3 || userType == 4)   && (
          <Typography sx = {{mt: 2, pt: 2}} variant="h5" gutterBottom >
          For You
        </Typography>
        )}
       
        <Grid container spacing={4}>
      {recommendedArtworks.map((artwork, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
           <DisplayImages type = "artwork" artwork={artwork} func = {handleArtworkClick}/>
        </Grid>
      ))}
    </Grid>

       </Grid>
       
    </Container>
  );
}

export default ExplorePage;
