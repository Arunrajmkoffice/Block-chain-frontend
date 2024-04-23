import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import ProductForm from '../pages/Addproduct'
import Productdata from '../pages/Productdata'
import Sidebar2 from '../pages/Sidebar2'
import Bulkproduct from '../pages/Bulkproduct'
import Demo from '../pages/demo'
import Updateproductpage from '../pages/Updateproductpage'
import Productpage from '../pages/Productpage'
import QRScanner from '../pages/QRScanner'
import { Menu } from '@mui/material'
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
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Editproduct from '../pages/Editproduct'
import Ai from '../pages/Ai'
import AssignmentIcon from '@mui/icons-material/Assignment';
const drawerWidth = 240;
function PrivateRoutes() {
  let role = JSON.parse(localStorage.getItem('bcUserData'))
  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flex: '1 1 8%' }}>
        <ContentSidebar />
      </Box>
      <Box sx={{ flex: '1 1 90%' }}>
        <Routes>
          {role && (
            <>
              {role && role.role !== 'Medorna Office' && role.role !== 'IGO Office' && role.role !== 'Amazon Office' && (
                <>
                  <Route path="/qrcode1" element={<Dashboard />} />
                  <Route path="/addproduct" element={<ProductForm />} />
                  <Route path='/productdata' element={<Productdata />} />
                  <Route path='/bulkproduct' element={<Bulkproduct />} />
                  <Route path='edit/:id' element={<Updateproductpage />} />
                  <Route path='/demo' element={<Demo />} />
                  <Route path='/' element={<QRScanner />} />
                  <Route path='/ai' element={<Ai />} />
                </>
              )}
            </>
          )}
          <Route path='productpage/:id' element={<Productpage />} />
          <Route path='/' element={<QRScanner />} />
          <Route path='/edit' element={<Editproduct />} />
          <Route path='/sidebar' element={<Sidebar2 />} />
        </Routes>
      </Box>
    </Box>
  )
}
function ContentSidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [clickedLink, setClickedLink] = React.useState(false);
  let userData = localStorage.getItem('bcUserData');
  let role = userData ? JSON.parse(userData) : null;
  const navigate = useNavigate();
  const data = useSelector((store) => store.auth.siginAuth);
  const [logOut, setlogOut]= React.useState('')

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
  const handleLogout = () => {
    localStorage.removeItem('bcToken');
    localStorage.removeItem('bcUserData');
    navigate('/', { replace: true })
  };
  const handleLinkClick = (link) => {
    setClickedLink(link);
  };
  
  const handleChange = (event) => {
    setlogOut(event.target.value);
  };


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List sx={{ paddingLeft: { sm: '10px' } }}>
        <Link style={{ textDecoration: 'none', color: clickedLink === 'dashboard' ? '#124BF2' : '#474749' }} onClick={() => handleLinkClick('dashboard')} to="/" >
          <ListItem disablePadding>
            <ListItemIcon>
              <HomeIcon style={{ color: clickedLink === 'dashboard' ? '#124BF2' : '#474749' }} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List sx={{ paddingLeft: { sm: '10px' } }}>
        <Link style={{ textDecoration: 'none', color: clickedLink === 'edit' ? '#124BF2' : '#474749' }} onClick={() => handleLinkClick('edit')} to="/edit"  >
          <ListItem disablePadding>
            <ListItemIcon>
              <ArchiveIcon style={{ color: clickedLink === 'edit' ? '#124BF2' : '#474749' }} />
            </ListItemIcon>
            <ListItemText primary="All Products" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      {role && role.role !== 'Medorna Office' && role.role !== 'IGO Office' && role.role !== 'Amazon Office' && (
        <List sx={{ paddingLeft: { sm: '10px' } }}>
          <Link style={{ textDecoration: 'none', color: clickedLink === 'addproduct' ? '#124BF2' : '#474749' }} onClick={() => handleLinkClick('addproduct')} to="/addproduct">
            <ListItem disablePadding>
              <ListItemIcon>
                <CategoryIcon style={{ color: clickedLink === 'addproduct' ? '#124BF2' : '#474749' }} />
              </ListItemIcon>
              <ListItemText primary="Add Product" />
            </ListItem>
          </Link>
        </List>
      )}
      <Divider />
      {role && role.role !== 'Medorna Office' && role.role !== 'IGO Office' && role.role !== 'Amazon Office' && (
        <List sx={{ paddingLeft: { sm: '10px' } }}>
          <Link style={{ textDecoration: 'none', color: clickedLink === 'ai' ? '#124BF2' : '#474749' }} onClick={() => handleLinkClick('ai')} to="/ai">
            <ListItem disablePadding>
              <ListItemIcon>
                <AssignmentIcon style={{ color: clickedLink === 'ai' ? '#124BF2' : '#474749' }} />
              </ListItemIcon>
              <ListItemText primary="Ai" />
            </ListItem>
          </Link>
        </List>
      )}
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Menu items={[
        { Label: "Dashboard" },
        { lable: "All Products" },
        { label: "Add Product" }
      ]}>

      </Menu>
      <Box>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px`, color: 'red' },
          }}
        >
          <Toolbar sx={{ justifyContent: { xs: 'flex-start', sm: 'flex-end' }, backgroundColor: '#ffffff' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Divider />
            <List>
              <ListItem>
                <ListItemIcon><NotificationsIcon sx={{ color: '#124BF2' }} /></ListItemIcon>
              </ListItem>
            </List>
            <FormControl  id="admin-logout" sx={{ width: { xs: '30%', sm: '25%',md:'10%' }, backgroundColor: '#124BF2', borderRadius: '10px', color: '#ffffff', border: 'none', marginLeft: { sm: '0%' } }}>
              <Select
                value={logOut}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value="">
                  <em style={{ color: '#ffffff',fontSize:{xs:'10px',sm:'16px',md:'16px'} }}>Admin</em>
                </MenuItem>
                <MenuItem sx={{ color: '#000000' }} onClick={handleLogout}>Log Out</MenuItem>
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
        </Box>

      </Box>
    </>


  )
}


export default PrivateRoutes