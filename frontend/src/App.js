import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import BuyArtwork from './Components/Pages/BuyArtworkPage';
import Explore from './Components/Pages/ExplorePage';
import UploadArtwork from './Components/Pages/UploadArtworkPage';
import Requests from './Components/Pages/Requests';
import DetailsPage from './Components/Pages/DetailsPage';
import AuctionPage from './Components/Pages/AuctionPage';
import ArtistProfile from './Components/Pages/ArtistProfilePage';
import DetailsArtistPage from './Components/Pages/DetailsArtistPage';
import LoginPage from './Components/Pages/LoginPage';
import RegisterPage from './Components/Pages/RegisterPage';
import PreferencesPage from './Components/Pages/PreferencesPage';
import CreateArtist from './Components/Pages/CreateArtist';
import ManageAccounts from './Components/Pages/ManageAccounts';
import CreateExhibition from './Components/Pages/CreateExhibition';
import Exhibition from './Components/Pages/Exhibition';
import CreateEvent from './Components/Pages/CreateEvent';
import Balance from './Components/Pages/Balance';
import ArtistNotificationPage from './Components/Pages/ArtistNotificationPage';
import CollectorNotificationPage from './Components/Pages/CollectorNotificationPage';
import EnthusiastNotificationPage from './Components/Pages/EnthusiastNotificationPage';
import DetailsExhibition from './Components/Pages/DetailsExhibition';
import DetailsCollectorPage from './Components/Pages/DetailsCollectorPage';
import CollectorProfilePage from './Components/Pages/CollectorProfilePage';
import ArtistDisplayedProfile from './Components/Pages/ArtistDisplayedProfile';
import SearchResultPage from './Components/Pages/SearchResultPage';
import FilteredArtworkPage from './Components/Pages/FilteredArtworkPage';
import AdminStatisticsPage from './Components/Pages/AdminStatisticsPage';

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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/explore" element={<Explore userId = {userId} userType={userType}/>} />
        <Route path="/buy/:id" element={<BuyArtwork userId = {userId}/>} />
        <Route path="/uploadArtwork" element={<UploadArtwork userId = {userId} userType={userType}/>} />
        <Route path="/details/:id" element={<DetailsPage userId = {userId} userType = {userType}/>} />
        <Route path="/auction/:id" element={<AuctionPage userId = {userId} />} />
        <Route path="/artistProfile" element={<ArtistProfile userId = {userId}/>} />
        <Route path="/artistDisplayed/:artistId" element={<ArtistDisplayedProfile userId = {userId} userType={userType} />} />
        <Route path="/detailsArtist/:id" element={<DetailsArtistPage userId = {userId}/>} />
        <Route path="/requests" element={<Requests userId = {userId}/>} />
        <Route path="/manageAccounts" element={<ManageAccounts />} />
        <Route path="/createExhibition" element={<CreateExhibition/>} />
        <Route path="/createEvent" element={<CreateEvent userId = {userId}/>} />
        <Route path="/exhibition/:id" element={<Exhibition/>} />
        <Route path="/createArtist" element={<CreateArtist userId = {userId} userType={userType} />} />
        <Route path="/balance" element={<Balance userId = {userId} userType={userType} />} />
        <Route path="/exhibitionDetails/:exhibitionId/:artworkId" element={<DetailsExhibition userId = {userId} userType={userType} />} />
        <Route path="/artistNoti" element={<ArtistNotificationPage userId = {userId} />} />
        <Route path="/collectorNoti" element={<CollectorNotificationPage userId = {userId} />} />
        <Route path="/enthusiastNoti" element={<EnthusiastNotificationPage userId = {userId} />} />
        <Route path="/searchResultPage" element={<SearchResultPage userId = {userId} userType={userType}/>} />
        <Route path="/detailsCollector/:id" element={<DetailsCollectorPage userId = {userId}/>} />
        <Route path="/collectorProfile" element={<CollectorProfilePage userId = {userId}/>} />
        <Route path="/filteredPage" element={<FilteredArtworkPage userId = {userId} userType={userType}/>} />
        <Route path="/adminStatistics" element={<AdminStatisticsPage userId = {userId}/>} />
      </Routes>
    </Router>
  );
}

export default App;