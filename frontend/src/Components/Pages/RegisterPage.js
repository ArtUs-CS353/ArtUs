import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import image1 from './loginReg2.png';
import logo from './logo.png';

function RegisterPage({ setLoggedIn, setUserType, setUserId }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    userSurname: '',
    email: '',
    password: '',
    contactInfo: '',
    role: '',
    profileDetails: '',
    biography: '',
    address: '',
  });

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'role') {
      setShowAdditionalFields(value === 'artist');
    }
  };

  const handleContinue = async () => {
    if (['collector', 'enthusiast'].includes(formData.role)) {
      navigate('/preferences', { state: { formData } });
    }
    else {
      const postData = {
        userName: formData.userName,
        userSurname: formData.userSurname,
        email: formData.email,
        password: formData.password,
        contactInfo: formData.contactInfo,
        profileDetails: formData.profileDetails,
        biography: formData.biography,
      };
  
      console.log('postData:', postData);
  
      try {
        const response = await axios.post('http://localhost:8080/register/artist', null, {
          params: postData, 
        });     
  
        if (response.status === 200) {
          navigate('/');
        } else {
          console.error('Registration failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleContinue();
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{
          backgroundImage: `url(${image1})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '140%',
        }}
      ></Grid>
      <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={logo} alt="Logo" style={{ width: '100px', height: '55px', marginBottom: '16px' }} />
          <Typography component="h1" variant="h5">
            Create an Account
          </Typography>
          <Grid item>
            <Link to="/" variant="body2" sx={{ fontSize: 'small' }}>
              Already have an account?
            </Link>
          </Grid>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="Name"
              name="userName"
              autoComplete="given-name"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="userSurname"
              autoComplete="family-name"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="contactInfo"
              label="Contact Information"
              name="contactInfo"
              autoComplete="tel"
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="role"
              label="Role"
              name="role"
              select
              autoComplete="role"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="artist">Artist</MenuItem>
              <MenuItem value="collector">Collector</MenuItem>
              <MenuItem value="enthusiast">Enthusiast</MenuItem>
            </TextField>
            {/* Additional fields for artist */}
            {showAdditionalFields && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="profileDetails"
                  label="Profile Details"
                  name="profileDetails"
                  autoComplete="profile-details"
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="biography"
                  label="Biography"
                  name="biography"
                  autoComplete="biography"
                  onChange={handleChange}
                />
              </>
            )}
            {/* Additional fields for enthusiast and collector */}
            {['enthusiast', 'collector'].includes(formData.role) && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                onChange={handleChange}
              />
            )}
            <Button onClick={handleContinue} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RegisterPage;