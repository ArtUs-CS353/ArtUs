import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const NavbarWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 6),
    height: '100%',
    width: '90%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none'
  }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar({userType}) {
    const [isNavbarVisible, setIsNavbarVisible] = React.useState(true);

    console.log("user type: ", userType)
    const pages = (userType == 2  || userType == 4)? ['Explore', 'Upload Artwork', 'Create Event']:  (userType == 3 ? ['Explore', 'BALANCE'] : ['Create Exhibition', 'Requests', 'Manage Accounts']);
    const navigate = useNavigate();

    const handleNavbarTrigger = () => {
        setIsNavbarVisible(!isNavbarVisible);
    };
    const goToProfile = () => {
      if(userType == 2){
        navigate(`/artistProfile`);
      }
      // else{
      //   navigate(`/collectorProfile`);
      // }
     
    }

    const handleNavigation = (page) => {
        if(page === "Upload Artwork"){
            navigate(`/uploadArtwork`);
        }
        else if( page === "Create Exhibition"){
          navigate(`/createExhibition`);
        }
        else if( page === "Manage Accounts") {
          navigate("/manageAccounts")
        }
        else if( page === "Create Event") {
          navigate("/createEvent")
        }
        else{
            const pageRoute = page.toLowerCase();
            navigate(`/${pageRoute}`);
        }
       
    };
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" 
            sx={{ 
                backgroundColor: isNavbarVisible ? '#302F4D' : '#FFFBF5',
                boxShadow: isNavbarVisible? 'auto' : 'none'}} >
        <Toolbar>
        <IconButton
            ssize="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: isNavbarVisible ? "inherit": "#302F4D"}}
            onClick={handleNavbarTrigger}
          >
            <MenuIcon
            sx={{ 
                position: 'absolute',
                padding: 0.5
                }}
            />
          </IconButton>
          {
            (
                <NavbarWrapper
                sx={{ 
                    display: 'flex', 
                    opacity: isNavbarVisible ? 1 : 0,
                    visibility: isNavbarVisible ? 'visible' : 'hidden',
                    transition: 'opacity 0.5s ease, visibility 0.5s ease'
                }}
                >
                    <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Art.Us
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 10 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleNavigation(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0.5 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            {(userType == 2 || userType == 4) &&
            <>
                  <IconButton
                  color="inherit">
                  <AccountCircle onClick={goToProfile}/>
                </IconButton>
            </>
            }
            
          </Box>
          </NavbarWrapper>
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
