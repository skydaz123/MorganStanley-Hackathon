import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {useEffect} from "react";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const drawerWidth = 500;

//make copy of locations
var locationCopy = null;
//Modified Drawer Template
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));


export default function TableDrawer({map, locationList}) {
    useEffect(() => { 
        if(!map || !locationList)
        {
            return;
        }

        console.log("useeffect ", map);
        console.log("location ", locationList);
        for(let i = 0; i < locationList.length; i++)
        {
          if(locationList[i].isBank)
          {
            locationList.splice(i, 1);
          }
        }
        locationCopy = locationList;

        locationCopy.sort(function(a, b) {
          return b.score - a.score;
        });
        console.log("location is now", locationCopy)
    }, [map])

    //console.log(props.map);
    //console.log("Prop is " + props.map);
    //props.map.flyTo([33.753746,-1], 12);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if(!map || !locationList)
  {
    return <></>;
  }

  function handleClick(key) {
    console.log("key is ", key);
    console.log(locationList);
    map.flyTo([locationList[key].lat, locationList[key].lng], 15)    
  }



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <ArrowBackIosIcon style={{fontSize: '200%', color: 'rgba(0, 0, 0, 0.54)'}}/>
          </IconButton>
        </Toolbar>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
            <List>
            {locationList.map((text, index) => (
                    <ListItem key={index} disablePadding>
                    <ListItemButton onClick={() => {
                          console.log("Clicked item with key:", index);
                          handleClick(index);
                        }}>
                        <ListItemIcon>
                          <LeaderboardIcon/>
                        </ListItemIcon>
                        <ListItemText primary={text.score} />
                        <ListItemText primary={text.name}/>
                    </ListItemButton>
                    </ListItem>
                ))}
            </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
/*
      <ListItemIcon>
      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
      </ListItemIcon>
      */