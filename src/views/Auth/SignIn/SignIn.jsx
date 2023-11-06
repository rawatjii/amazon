import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from "crypto-js";
import { withNavigate } from '../../../Components/hoc/withNavigate/withNavigate';
import { authActions } from '../../../store/reducers/authReducer';
import Button from '@mui/material/Button';
import axios from 'axios';
// logo
import logoDark from '../../../assets/logo-dark.png';


const SignIn = (props)=>{

    const [text, setText] = useState("");
    const [encrptedData, setEncrptedData] = useState("");
    const [decrptedData, setDecrptedData] = useState("");
    const [emailErr, setEmailErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();

    const dispatch = useDispatch();

    const notify = (msg) => toast(msg);
    const successNotify = (msg) => toast.success(msg);

    const userLoginHandler = (e)=>{
        e.preventDefault();
        const emailInputValue = emailRef.current.value;
        const passwordInputValue = passwordRef.current.value;

        if(emailInputValue == ''){
            setEmailErr(true);
        }else{
            setEmailErr(false);
        }

        if(passwordInputValue == ''){
            setPasswordErr(true);
        }else{
            setPasswordErr(false);
        }

        if((emailInputValue && passwordInputValue) !== ''){
            axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`, {email:emailInputValue, password:passwordInputValue,returnSecureToken:true})
            .then(res=>{
                const now = new Date();
                const data = CryptoJS.AES.encrypt(
                    JSON.stringify('true'),
                    `${process.env.REACT_APP_SECRET_KEY}`
                ).toString();
                const item = {
                    value:data,
                    expiration:now.getTime() + (`${process.env.REACT_APP_AUTH_EXPIRE_TIME}` * 60000)
                }
                localStorage.setItem('isUserSignin', JSON.stringify(item));

                dispatch(authActions.setLogin({email:emailInputValue}));
                successNotify('User signin successfully');
                return props.navigate('/');
            })
            .catch(err=>{
                debugger;
                dispatch(authActions.setLogout());
                return notify('User not found');
            })
        }
    };

    return(
        <>
            <section className='auth_section signin_section'>
                <div className="container">
                    <div className="contents">
                        <img src={logoDark} className='img-fluid logo' />

                        <div className="form_card">
                            <h4 className='title'>Sign in</h4>

                            <form onSubmit={userLoginHandler}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name='email' ref={emailRef} className='form-control' />
                                    {emailErr ? <span className="error">Please enter email</span> : null}
                                </div>

                                <div className="form-group">
                                    <div className="label_row">
                                        <label>Password</label>
                                        <a href='' className='forgot_pass'>Forgot Password?</a>
                                    </div>
                                    <input type="password" name='password' ref={passwordRef} className='form-control' />
                                    {passwordErr ? <span className="error">Please enter password</span> : null}
                                </div>

                                <Button variant="contained" color='secondary' className='search_btn no-fieldset signinBtn' type="submit">
                                    Sign in
                                </Button>

                                <small className='terms_condition'>By continuing, you agree to Amazon's <a href=''>Conditions of Use</a> and <a href=''>Privacy Notice.</a></small>

                                <p className='keepSignin'>
                                    <input type='checkbox' name='keep_signin' /> 
                                    Keep me signed in. 
                                    <a href="javascript:void(0)">Details</a>
                                </p>
                            </form>

                            <div className="divider">
                                <small>New to Amazon?</small>
                            </div>
                            <Link to={`${process.env.REACT_APP_BASE_URL}register`} className='btn create_account_btn'>Create your Amazon account</Link>
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default withNavigate(SignIn);