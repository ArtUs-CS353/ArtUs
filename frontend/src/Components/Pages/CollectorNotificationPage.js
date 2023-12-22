import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

const CollectorNotificationPage = ({ userId }) => {
  const [collectorNotifications, setCollectorNotifications] = useState([]);
  const [activityHistory, setActivityHistory] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const fetchCollectorNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notification/${userId}`);
        setCollectorNotifications(response.data);
      } catch (error) {
        console.error('Error fetching collector notifications:', error);
      }
    };

    const fetchActivityHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/notification/activityHistory/${userId}`);
        setActivityHistory(response.data);
      } catch (error) {
        console.error('Error fetching activity history:', error);
      }
    };

    fetchCollectorNotifications();
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
          {collectorNotifications.length > 0 && (
            collectorNotifications.map((notification) => (
              <Box key={notification.notification_id} sx={{ border: '2px solid #ccc', padding: '10px', width: '98%' }}>
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

export default CollectorNotificationPage;