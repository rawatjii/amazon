import React, { useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { ThemeProvider } from '@mui/material/styles';
import axios from './axios';
import { useDispatch, useSelector } from 'react-redux';
import colorTheme from './Components/ColorTheme/ColorTheme';
import Home from './views/Home';
import Register from './views/Register/Register';
import Today_Deals from './views/Today-Deals/Today-Deals';
import Result from './views/Result/Result';
import Dashboard from './admin/Components/Dashboard/Dashboard';
import AddProduct from './admin/Components/AddProduct/AddProduct';
import SingleProductDetail from './views/SingleProductDetail/SingleProductDetail';
import { fetchProducts } from './store/reducers/productsReducer';
import { authActions } from './store/reducers/authReducer';
import CreateReview from './views/CreateReview/CreateReview';
import PrivateRoute from './views/Auth/PrivateRoute';
import CryptoJS from "crypto-js";
import SignIn from './views/Auth/SignIn/SignIn';
// css
import './App.css';

function App() {

  var userLoginDecryptedStatus = '';

  useEffect(()=>{
    // Get the current pathname
    const currentPath = window.location.pathname;

    // Check if the pathname starts with "/admin"
    if(currentPath.startsWith('/admin')){
      document.body.classList.add('admin');
    }
  })

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());

    try{
      
      var userLoginEncryptedStatus = localStorage.getItem('isUserSignin');
      var bytes = CryptoJS.AES.decrypt(userLoginEncryptedStatus, `${process.env.REACT_APP_SECRET_KEY}`);
      var data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      if(data){
      
          if(data == 'true'){
            dispatch(authActions.setLogin());
          }else{
            dispatch(authActions.setLogout());
          }

      }else{
        console.error("Data could not be decrypted or is not valid JSON.");
        dispatch(authActions.setLogout());
      }

    }catch(err){
      console.error('An error occurred during decryption or parsing:',err);
      dispatch(authActions.setLogout());
    }

    

    
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={colorTheme}>
          <Routes>
            <Route exact path='/signin' element={<SignIn />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/today-deals' element={<Today_Deals />} />
            <Route exact path='/result' element={<Result />} />
            <Route exact path='/admin' element={<Dashboard />} />
            <Route exact path='/admin/add-products' element={<AddProduct />} />
            <Route exact path='/:productId' element={<SingleProductDetail />} />
            <Route exact path='/create-review/:productId' element={<PrivateRoute><CreateReview /></PrivateRoute>} />
            {/* <PrivateRoute exact path='/create-review/:productId' loggedIn="false" element={<CreateReview />} /> */}
            <Route exact path='/' element={<Home />} />
          </Routes>
        </ThemeProvider>

        <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
