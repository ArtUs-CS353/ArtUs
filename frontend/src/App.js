// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import BuyArtwork from './Components/Pages/BuyArtworkPage';
import Explore from './Components/Pages/ExplorePage';
import UploadArtwork from './Components/Pages/UploadArtworkPage';
import HomePage from './Components/Pages/HomePage';
import DetailsPage from './Components/Pages/DetailsPage';
import AuctionPage from './Components/Pages/AuctionPage';
import ArtistProfile from './Components/Pages/ArtistProfilePage';
import DetailsArtistPage from './Components/Pages/DetailsArtistPage';
import LoginPage from './Components/Pages/LoginPage';

function App() {
  //const showNavbar = !['/login'].includes(window.location.pathname);
  const [loggedIn, setLoggedIn] = useState(false)
  const [userType, setUserType] = useState(0)
  const [userId, setUserId] = useState(-1)
  return (
    <Router>
      {(loggedIn && <Navbar userType = {userType}/>)}
      <Routes>
        <Route path="/" element={<LoginPage setLoggedIn = {setLoggedIn} setUserType={setUserType} setUserId={setUserId} />} />
        <Route path="/explore" element={<Explore userId = {userId}/>} />
        <Route path="/buy" element={<BuyArtwork userId = {userId}/>} />
        <Route path="/uploadArtwork" element={<UploadArtwork userId = {userId} userType={userType}/>} />
        <Route path="/details" element={<DetailsPage userId = {userId}/>} />
        <Route path="/auction" element={<AuctionPage userId = {userId} />} />
        <Route path="/artistProfile" element={<ArtistProfile userId = {userId}/>} />
        <Route path="/detailsArtist" element={<DetailsArtistPage userId = {userId}/>} />
        <Route path="/request" element={<HomePage userId = {userId}/>} />
      </Routes>
    </Router>
  );
}

export default App;