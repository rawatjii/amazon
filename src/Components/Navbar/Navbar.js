import * as React from 'react';
import {useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactDOM from 'react-dom';
import AppBar from '@mui/material/AppBar';
import { ToastContainer, toast } from 'react-toastify';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import Image from '../Image/Image'
import Location from './Location/Location';
import LanguageComponent from '../../Containers/Language/Language'
import SignIn from '../../Containers/SignIn/SignIn'
import ReturnOrders from '../../Containers/ReturnOrders/ReturnOrders';
import CartLink from './CartLink/CartLink'
import Search from './Search/Search';
import NavMenus from './NavMenus/NavMenus';
import { authActions } from '../../store/reducers/authReducer';

// logo
import logo from '../../assets/logo.png';
import './Navbar.css'

const Navbar = (props) => {
  
  const [showSidebarMenu, setShowSidebarMenu] = useState(false);
  const CategoryMenus = ["Aazon miniTV", "Sell","Best Seller","Mobiles","Today's Deals","Customer Service","New Releases","Prime","Electronics","Home & Kitchen","Amazon Pay","Gift Ideas","Fashion","Computers","Books","Coupons","Beauty & Personal Care","Toys & Games"];

  const dispatch = useDispatch();
  
  const notify = (msg) => toast(msg);

  const showSideMenu = ()=>{
    setShowSidebarMenu(true)
  }

  const hideSideMenu = ()=>{
    setShowSidebarMenu(false)
  }
  
  const logoutHandler = ()=>{
    localStorage.removeItem('isUserSignin');
    localStorage.removeItem('userEmail');
    dispatch(authActions.setLogout());
    notify('User logout successfully');
  }

  return (
    <>
      <AppBar className='header' position="static" color="primary">
            <Container maxWidth='false'>
              <Toolbar className='header_bar' disableGutters>
                
                <Image src={logo} className="header_item mainLogo" maxWidth="97" objectFit="contain" />
                <Location />
                <Search />
                <LanguageComponent />
                <SignIn />
                <ReturnOrders />
                <CartLink />

                <button onClick={logoutHandler}>Logout</button>

              </Toolbar>
            </Container>
      </AppBar> 

      <div className='mini_bar'>
        <Container maxWidth='false'>
          <ul className="all_items">
            <li className='all'>
              <a href='#' onClick={showSideMenu}>
                <div className='bars'>
                  <span></span>
                </div>
                All
              </a>
            </li>

            {CategoryMenus.map(item=>{
              return <li className='item' key={item}>
                <a href="#">{item}</a>
              </li>
            })}
          </ul>
        </Container>
      </div>

      {ReactDOM.createPortal(
        <NavMenus show={showSidebarMenu} hideMenus={hideSideMenu} />,
        document.getElementById('sidebarMenu')
      )}
    </>
    
  );
}



export default Navbar;
