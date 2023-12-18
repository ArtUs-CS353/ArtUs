import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import image1 from './loginReg1.png';
import logo from './logo.png';

function LoginPage({ setLoggedIn, setUserType, setUserId }) {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await axios.post(
        'http://localhost:8080/login',
        {
          email: data.get('email'),
          password: data.get('password'),
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      console.log(response.data);

      if (response) {
        setLoggedIn(true);
        setUserType(response.data.role);
        setUserId(response.data.userId);
        if(response.data.role == 1){
          console.log("navigate admin")
          navigate('/requests')
        }
        else{
          navigate('/explore');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid email or password. Please try again.'); // Set the error message
    }
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
          padding: 4,
          height: '100%',
        }}
      >
      </Grid>
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
          {error && (
            <Typography variant="body2" color="error" mb={2}>
              {error}
            </Typography>
          )}
          <br />
          <br />
          <img src={logo} alt="Logo" style={{ width: '100px', height: '55px', marginBottom: '16px' }} />
          <br />
          <Typography component="h1" variant="h5">
            Login to your Account
          </Typography>
          <Grid item>
            <Link to="/register" variant="body2" sx={{ fontSize: 'small' }}>
              Don't have an account?
            </Link>
          </Grid>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;