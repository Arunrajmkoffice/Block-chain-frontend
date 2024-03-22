import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import ArchiveIcon from '@mui/icons-material/Archive';
import CategoryIcon from '@mui/icons-material/Category';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Addproduct from './Addproduct';
import { Link } from 'react-router-dom';

const drawerWidth = 240;



export default function Sidebar2(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
      <Link href="/">
        <ListItem disablePadding>
            <ListItemIcon>
                <HomeIcon/>
            </ListItemIcon>
            
            <ListItemText primary="Dashboard"/>
        </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link href="/edit">
        <ListItem disablePadding>
            <ListItemIcon>
                <ArchiveIcon/>
            </ListItemIcon>
            <ListItemText primary="All Products"/>
        </ListItem>
        </Link>
      </List>
      <Divider/>
      <List>
        <Link href="/addproduct">
        <ListItem disablePadding>
            <ListItemIcon>
                <CategoryIcon/>
            </ListItemIcon>
            <ListItemText primary="Add Product"/>
        </ListItem>
        </Link>
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px`, color:'red' },
        }}
      >
        <Toolbar sx={{ justifyContent: { xs: 'flex-start', sm: 'flex-end' },backgroundColor:'#ffffff'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Divider/>
          <List>
            <ListItem>
                <ListItemIcon><NotificationsIcon sx={{color:'#124BF2'}}/></ListItemIcon>
            </ListItem>
          </List>
          <FormControl  sx={{width:{ xs: '100%', sm: '10%' }, backgroundColor:'#124BF2',borderRadius:'10px', color:'#ffffff',border:'none'}}>
  <InputLabel id="demo-simple-select-label" sx={{color:'#ffffff'}}>Admin</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select" 
  >
    <MenuItem sx={{color:'#000000'}}>Admin</MenuItem>
    <MenuItem sx={{color:'#000000'}}>Profile</MenuItem>
    <MenuItem sx={{color:'#000000'}}>Log Out</MenuItem>
  </Select>
</FormControl>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Addproduct/>
      </Box>

    </Box>
  );
}