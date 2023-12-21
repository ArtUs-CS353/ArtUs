import React, {useEffect, useState} from 'react';
import axios from "axios";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { Popover, MenuItem, FormControl, InputLabel, Select, TextField, Checkbox, FormControlLabel} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DatePicker from './DatePicker'
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
    const [types, setTypes] = React.useState([]);
    const [materials, setMaterial] = React.useState([]);
    const [rarity, setRarity] = React.useState([]);
    const [status, setStatus] = React.useState([]);
    const [start_date, setStartDate] = React.useState('');
    const [end_date, setEndDate] = React.useState('');
    const [max_price, setMaxPrice] = React.useState(null);
    const [min_price, setMinPrice] = React.useState(null);
    
    const [typeOptions, setTypeOptions] = useState([])
    const [materialOptions, setMaterialOptions] = React.useState([])
    const [rarityOptions, setRarityOptions] = React.useState([])
    const statusOptions = ["sale", "auction", "sold", "waiting"]
    const [movementOptions, setMovementOptions] = React.useState([])
    const [sortByPrice, setSortByPrice] = React.useState(false);

    
    const [anchorEl, setAnchorEl] = React.useState(null);


    console.log("user type: ", userType)
    let pages = [];

switch (userType) {
    case 2:
      pages = ['Explore', 'Upload Artwork', 'Create Event'];
      break;
    case 4:
        pages = ['Explore', 'Upload Artwork', 'BALANCE'];
        break;
    case 3:
        pages = ['Explore', 'BALANCE'];
        break;
    default:
        pages = ['Create Exhibition', 'Requests', 'Manage Accounts', 'Statistics'];
        break;
}
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = React.useState('');

    const handleSearchInputChange = (event) => {
      console.log("search ", event.target.value)
      setSearchInput(event.target.value);
    };

    const handleSortByPriceChange = (event) => {
      setSortByPrice(event.target.checked);
    };

    const handleApplyFilters = () => {
      handleClose();
      navigate('/filteredPage', { state: { types, materials, rarity, status,start_date, end_date,max_price,min_price, sortByPrice} });
    };
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleSearchSubmit = (event) => {
      console.log("came to submit ", searchInput)
      event.preventDefault();
      navigate(`/searchResultPage`, { state: { query: searchInput } });
    };

    const handleMinPriceChange = (event) => {
      setMinPrice(event.target.value);
    }

    const handleMaxPriceChange = (event) => {
      setMaxPrice(event.target.value);
    }

    const handleStartDateSelection = (newDate) =>{
      setStartDate(newDate);
    };

    const handleEndDateSelection = (newDate) =>{
      setEndDate(newDate);
    };

    const handleNavbarTrigger = () => {
        setIsNavbarVisible(!isNavbarVisible);
    };
    const goToProfile = () => {
      if(userType === 2){
        navigate(`/artistProfile`);
      }
      else if (userType === 4) {
        navigate(`/collectorProfile`);
      }
    };

    const navigateToNotifications = () => {
      if (userType === 2 ) {
        navigate('/artistNoti');
      }
      else if (userType === 3 ) {
        navigate('/enthusiastNoti');
      }
      else if (userType === 4 ) {
        navigate('/collectorNoti');
      }
    };

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
        else if ( page === "Statistics") {
          navigate("/adminStatistics")
        }
        else if( page === "Create Event") {
          navigate("/createEvent")
        }
        else{
            const pageRoute = page.toLowerCase();
            navigate(`/${pageRoute}`);
        }
       
    };

    
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesResponse = await axios.get('http://localhost:8080/register/getTypes');
        const materialsResponse = await axios.get('http://localhost:8080/register/getMaterials');
        const raritiesResponse = await axios.get('http://localhost:8080/register/getRarities');
        const movementsResponse = await axios.get('http://localhost:8080/register/getMovements');

        setTypeOptions(typesResponse.data);
        setMaterialOptions(materialsResponse.data);
        setRarityOptions(raritiesResponse.data);
        setMovementOptions(movementsResponse.data);
      } catch (error) {
        console.error('Error fetching preferences data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" 
            sx={{ 
                backgroundColor: isNavbarVisible ? '#03001C' : '#d5d6da00',
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
          <Search component="form" onSubmit={handleSearchSubmit}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchInput}
              onChange={handleSearchInputChange}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleSearchSubmit(event);
                }
              }}
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
            {(userType === 2 || userType === 3 || userType === 4) && (
              <IconButton
                size="large"
                //aria-label="show 17 new notifications"
                color="inherit"
                onClick={navigateToNotifications}
              >
                <NotificationsIcon />
              </IconButton>
            )}
            {(userType === 2 || userType === 4) &&
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
        <IconButton
  size="large"
  aria-label="filter list"
  onClick={handleClick}
  sx={{color: isNavbarVisible ? 'white' : '#d5d6da00', ml: 50}}
>
  <FilterListIcon/>
</IconButton>
<Popover
  id="filter-popover"
  open={Boolean(anchorEl)}
  anchorEl={anchorEl}
  onClose={handleClose}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
>
  <div style={{ padding: '16px' }}>
    {/* Filter Dropdowns */}
     {/* Type */}
    <FormControl fullWidth margin="normal">
      <InputLabel>Type</InputLabel>
      <Select
        multiple
        value={types}
        onChange={(e) => setTypes(e.target.value)}
        renderValue={(selected) => selected.join(', ')}
      >
        {typeOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
     {/* Material */}
    <FormControl fullWidth margin="normal">
      <InputLabel>Material</InputLabel>
      <Select
        multiple
        value={materials}
        onChange={(e) => setMaterial(e.target.value)}
        renderValue={(selected) => selected.join(', ')}
      >
        {materialOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
     {/* Rarity */}
     <FormControl fullWidth margin="normal">
      <InputLabel>Rarity</InputLabel>
      <Select
        multiple
        value={rarity}
        onChange={(e) => setRarity(e.target.value)}
        renderValue={(selected) => selected.join(', ')}
      >
        {rarityOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
     {/* Min Price */}
     <FormControl fullWidth margin="normal">
      <InputLabel>Min Price</InputLabel>
      <TextField onChange={handleMinPriceChange} fullWidth label="" variant="outlined" margin="normal" />
    </FormControl>
     {/* Max Price */}
     <FormControl fullWidth margin="normal">
      <InputLabel>Max Price</InputLabel>
      <TextField onChange={handleMaxPriceChange} fullWidth label="" variant="outlined" margin="normal" />
    </FormControl>
    <FormControlLabel
      control={
        <Checkbox
          checked={sortByPrice}
          onChange={handleSortByPriceChange}
          name="sortByPrice"
        />
      }
      label="Sort by Price"
    />
     {/* Start Date */}
     <FormControl fullWidth margin="normal">
      <Typography>StartDate</Typography>
      <DatePicker handleSelection = {handleStartDateSelection}/>
    </FormControl>
     
     {/* End Date */}
     <FormControl fullWidth margin="normal">
     <Typography>EndDate</Typography>
      <DatePicker handleSelection = {handleEndDateSelection}/>
    </FormControl>

     {/* Status */}
     <FormControl fullWidth margin="normal">
      <InputLabel>Status</InputLabel>
      <Select
        multiple
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        renderValue={(selected) => selected.join(', ')}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    {/* Repeat for other filters... */}

    {/* Apply Button */}
    <Button color="primary" onClick={handleApplyFilters}>Apply Filters</Button>
  </div>
</Popover>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
