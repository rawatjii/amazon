import React, { Component } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import Button from '../../Components/UI/Button/Button'
import './SignIn.css';
import defaultImage from '../../assets/default.jpg';
import { connect } from 'react-redux';
import { authActions } from '../../store/reducers/authReducer';

const Backdrop = (props)=>{
    return(
        <div className={`backdrop ${props.className}`}></div>
    );
}

const SignIn = (props)=>{
    const [dropdown, setDropdown] = useState(false)
    const isAuth = useSelector((state)=>state.auths.UserLogin)

    const showDropdown = () => {
        setDropdown(true)
    }

    const hideDropdown = () => {
        setDropdown(false)
    }

    return(
        <>
            <div className='signIn header_item dropdown_menu' onMouseEnter={showDropdown} onMouseLeave={hideDropdown}>
                <div className='main'>
                    <small>Hello, sign in</small>
                    <p>Account & Lists</p>
                </div>

                <div className={`dropdown_items ${dropdown ? 'active' : ''} ${isAuth ? 'user_in':'no_user'}`}>
                    <div className='top'>
                        <Button variant="contained" color="secondary">Sign in</Button>
                        <p><small>New Customer? <a href='#'>Start here.</a></small></p>
                    </div>
                    <div className='bottom'>
                        {isAuth? (
                            <div className='history'>
                                <div className='headings'>
                                    <h3>Buy it again</h3>
                                    <a href='#' className='a-base-size'>View All & Manage</a>
                                </div>
                                <ul className='products'>
                                    <li className='product'>
                                        <div className='thumbnail'>
                                            <img src={defaultImage} className='' />
                                        </div>
                                        <div className='details'>
                                            <a href=''>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p> 
                                                <span className='price'>₹ 100.00</span>
                                            </a>
                                            <Button variant="contained" color='secondary' className="cart_btn">Add To Cart</Button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        ):null}
                        
                        
                        <div className='account_menus'>
                            <div className='menus'>
                                <h3>Your Lists</h3>
                                {isAuth ? (
                                    <ul>
                                        <li>
                                            <a href="" className='list-item'>Shopping List</a>
                                        </li>
                                        <hr />
                                    </ul>
                                ) : null}
                                
                                <ul>
                                    <li>
                                        <a href="" className='list-item'>Create a Wish List</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Wish from Any Website</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Baby Wishlist</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Discover Your Style</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Explore Showroom</a>
                                    </li>
                                </ul>
                            </div>

                            <div className='menus'>
                                <h3>Your Account</h3>
                                <ul>
                                    <li>
                                        <a href="" className='list-item'>Your Account</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Your Orders</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Your Wish List</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Your Recommendations</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Your Prime Membership</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Your Prime Video</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Your Subscribe & Save Items</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Membership & Subscriptions</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Your Seller Account</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Manage Your Content and Devices</a>
                                    </li>
                                    <li>
                                        <a href="" className='list-item'>Your Free Amazon Business Account</a>
                                    </li>
                                </ul>
                                {isAuth ? (
                                    <div>
                                        <hr />
                                        <ul>
                                            <li>
                                                <a href="" className='list-item'>Switch Accounts</a>
                                            </li>
                                            <li>
                                                <a href="" className='list-item'>Sign Out</a>
                                            </li>
                                        </ul>
                                    </div>
                                ) : null}
                                
                            </div>

                        </div>
                    </div>
                </div>
                
                {/* <button onClick={props.onAuthLogin}>{props.UserStatus}</button> */}
            </div>
            {ReactDOM.createPortal(
                dropdown ? <Backdrop className={dropdown ? 'show':''} /> : null,
                document.getElementById('backdrop')
            )}
        </>
    )
}

export default SignIn;