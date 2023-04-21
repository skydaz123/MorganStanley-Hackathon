import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {

    
    function send(url) {
        fetch(url)
        .then((response) => console.log(response.json()))
    }
    const address = '1600 Pennsylvania Avenue NW, Washington, DC 20500';
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(address) + "&key=AIzaSyCAI3WTDKH75l6S7XDVRLMV-BvAGtxMdM4";
    const handleEnter = (event) => {
        //Line below prevents refresh on enter
        event.preventDefault();
        console.log("GOT here");
        if(event.key === 'Enter') {
            console.log("send message to google");
            send(url);
        }
    }
    function handleSearch() {
        console.log("send message to GOOGLE");
    }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
        onKeyDown={handleEnter}
      />
      <IconButton type="button" 
        sx={{ p: '10px' }} 
        aria-label="search" 
        onClick={handleSearch}
        >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}