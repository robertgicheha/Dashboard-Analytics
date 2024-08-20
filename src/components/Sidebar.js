// src/components/Sidebar.js
import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, BarChart as BarChartIcon, PieChart as PieChartIcon, CalendarToday as CalendarTodayIcon } from '@mui/icons-material';

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 240 : 60,
          transition: 'width 0.3s',
        },
      }}
    >
      <IconButton onClick={() => setOpen(!open)}>
        <MenuIcon />
      </IconButton>
      <List>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={open ? 'Home' : ''} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary={open ? 'Charts' : ''} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary={open ? 'Reports' : ''} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary={open ? 'Calendar' : ''} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={open ? 'Users' : ''} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary={open ? 'Tables' : ''} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary={open ? 'Tasks' : ''} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary={open ? 'Map' : ''} />
        </ListItem><ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={open ? 'Messages' : ''} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary={open ? 'Profile' : ''} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PieChartIcon />
          </ListItemIcon>
          <ListItemText primary={open ? 'Settings' : ''} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary={open ? 'Log Out' : ''} />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
