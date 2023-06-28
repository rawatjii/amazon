import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import AspectRatio from '@mui/joy/AspectRatio';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';  
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Image from '../Image/Image'
import ModalComponent from '../Modal/ModalComponent';
import LanguageComponent from '../../Containers/Language/Language'

// logo
import logo from '../../assets/logo.png';
import locationIcon from '../../assets/icons/location.svg';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const rootPath = process.env.PUBLIC_URL;

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const showModal = () => {
    setOpenModal(true)
  }

  const hideModal = () => {
    setOpenModal(false)
  }

  return (
    <div>
      <AppBar className='header' position="static" color="primary">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                
                <Image src={logo} className="mainLogo" maxWidth="128" objectFit="contain" />

                <div className='location' onClick={showModal}>
                  <div className='icon'>
                    <Image src={locationIcon} />
                  </div>
                  <div className='text'>
                    <small>Hello</small>
                    <p>Select your address</p>
                  </div>
                </div>

                <div className='search_card'>
                  <FormControl className='category_input no-fieldset' color='secondary'>
                    <Select
                      value={age}
                      onChange={handleChange}
                      displayEmpty
                    >
                      <MenuItem value="">All Categories</MenuItem>
                      <MenuItem value={10}>Electronics</MenuItem>
                      <MenuItem value={20}>Mobile</MenuItem>
                      <MenuItem value={30}>Others</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <TextField className='search_input no-fieldset' placeholder="Search Amazon.in" id="outlined-basic"  />

                  <Button variant="contained" color='secondary' className='search_btn no-fieldset'>
                    <SearchIcon />
                  </Button>
                </div>

                <div>
                  <LanguageComponent /> 
                </div>

                
              </Toolbar>
            </Container>
      </AppBar> 

      {/* modal */}
      <ModalComponent modalStatus={openModal} hideModal={hideModal} width="375" className="location_modal">
        <div className='modal-header'>
          <h6 className='title'>Choose your location</h6>
        </div>
        <div className='modal-body'>
          <p>Delivery options and delivery speeds may vary for different locations</p>
          <Button variant="contained" className='btn btn_fill' color="secondary">Sign in to update your location</Button>
          {/* <button className='btn btn_fill'>Sign in to update your location</button> */}
        </div>
      </ModalComponent>
    </div>
    
  );
}
export default Navbar;
