import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Popup from '../Popup';
import { Typography } from '@mui/material';
const ArtistNotificationPage = ({ userId }) => {
  const [artistNotifications, setArtistNotifications] = useState([]);
  const [activityHistory, setActivityHistory] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const [enablePopup, setPopup] = useState(false)
  const [bidId, setBidId] = useState(-1)
  const [highestBid, setHighestBid] = useState(0)
  useEffect(() => {
    // Fetch artist notifications for the given userId and type 'Artist'
    const fetchArtistNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notification/${userId}`);
        console.log("notif are ", response.data)
        
        setArtistNotifications(response.data);
      } catch (error) {
        console.error('Error fetching artist notifications:', error);
      }
    };

    // Fetch activity history for the given userId
    const fetchActivityHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notification/activityHistory/${userId}`);
        setActivityHistory(response.data);
      } catch (error) {
        console.error('Error fetching activity history:', error);
      }
    };

    // Call the fetchArtistNotifications and fetchActivityHistory functions
    fetchArtistNotifications();
    fetchActivityHistory();
  }, [userId]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  function extractAuctionDetails(text) {
    const match = text.match(/bidId:(\d+) bid:(\d+)/);
    if (match) {
      const bidId = parseInt(match[1], 10);
      const bid = parseInt(match[2], 10);
      return { bidId, bid };
    } else {
      return null;
    }
  }

  const notificationClick = (index) => {
    console.log("clicked notif " , artistNotifications[index])
    if (artistNotifications[index].type === "Auction End") {
      console.log("here as end")
        const details = extractAuctionDetails(artistNotifications[index].content)
        console.log("extracted bid ", details)
        setBidId(details.bidId)
        setHighestBid(details.bid)
        setPopup(true)
    }
  }

  const handleClose = async () => {
    //set as rejected
    try {
      const response = await axios.put(`http://localhost:8080/bid/rejectBid/${bidId}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error accepting auction:', error);
    } 
    setPopup(false)
  }

  const handleApprove = async () =>  {
    console.log("HERE AS REQUEST")
    try {
      const response = await axios.put(`http://localhost:8080/bid/acceptBid/${bidId}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error accepting auction:', error);
    } 
    setPopup(false)
  }
      

  return (
    <Box>
      {(enablePopup &&
        <Popup 
        buttonName={"YES"}
        buttonNameCancel={"NO"}
        state={enablePopup}
        textField={<Typography>{highestBid}</Typography>}
        handleClose={handleClose} 
        dialogTitle={"Do you want to accept this bid"}  
        handleRequest={handleApprove}
        > 
        </Popup>)}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        sx={{ '& .MuiTab-root': { minWidth: '50%' } }}
      >
        <Tab label="Notifications" />
        <Tab label="Activity History" />
      </Tabs>

      {selectedTab === 0 && (
        <Box>
          {artistNotifications.length > 0 && (
            artistNotifications.map((notification, index) => (
              <Box onClick = {() => notificationClick(index)} key={notification.notification_id} sx={{ border: '2px solid #ccc', padding: '10px', width: '98%' }}>
                {notification.content}
              </Box>
            ))
          )}
        </Box>
      )}

    {selectedTab === 1 && (
      <Box>
        {Object.entries(activityHistory).map(([activityType, activities]) => (
          <div key={activityType}>
            <h3>{activityType} Activities:</h3>
            {activities.map((activity, index) => (
              <Box key={index} sx={{ border: '2px solid #ccc', padding: '10px', width: '98%' }}>
                {activity}
              </Box>
            ))}
          </div>
        ))}
      </Box>
    )}
    </Box>
  );
};

export default ArtistNotificationPage;