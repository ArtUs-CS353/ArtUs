import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const EnthusiastNotificationPage = ({ userId }) => {
  const [enthusiastNotifications, setEnthusiastNotifications] = useState([]);
  const [activityHistory, setActivityHistory] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const fetchEnthusiastNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notification/${userId}/3`);
        setEnthusiastNotifications(response.data);
      } catch (error) {
        console.error('Error fetching enthusiast notifications:', error);
      }
    };

    const fetchActivityHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/activityHistory/${userId}`);
        setActivityHistory(response.data);
      } catch (error) {
        console.error('Error fetching activity history:', error);
      }
    };

    fetchEnthusiastNotifications();
    fetchActivityHistory();
  }, [userId]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
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
          {enthusiastNotifications.map((notification) => (
            <Box key={notification.notification_id} sx={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
              <strong>{notification.type}:</strong> {notification.content}
            </Box>
          ))}
        </Box>
      )}

      {selectedTab === 1 && (
        <Box>
          {Object.entries(activityHistory).map(([key, value]) => (
            <Box key={key} sx={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
              <strong>{key}:</strong> {value.join(', ')}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default EnthusiastNotificationPage;