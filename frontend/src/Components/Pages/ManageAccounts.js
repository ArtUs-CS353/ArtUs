import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Box } from '@mui/material';
import axios from 'axios';

function ManageAccounts() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    contactInfo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/addNewAdmin', { ...formData, role: 1 });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding new admin:', error);
    }
  };

  return (
    <Container sx={{ pt: 15, pb: 2 }}>
      <Grid container justifyContent="center">
        <Box sx={{ width: '50%' }}>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Surname"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Contact Info"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Add Admin
            </Button>
          </form>
        </Box>
      </Grid>
    </Container>
  );
}

export default ManageAccounts;