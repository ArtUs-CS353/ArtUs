import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import BuyArtwork from './Components/Pages/BuyArtworkPage'; 
import Explore from './Components/Pages/ExplorePage'; 
import UploadArtwork from './Components/Pages/UploadArtworkPage'; 
import HomePage from './Components/Pages/HomePage'; 
import './App.css'
import DetailsPage from './Components/Pages/DetailsPage';
import AuctionPage from './Components/Pages/AuctionPage';

function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/buy" element={<BuyArtwork />} />
        <Route path="/uploadArtwork" element={<UploadArtwork />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/auction" element={<AuctionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
