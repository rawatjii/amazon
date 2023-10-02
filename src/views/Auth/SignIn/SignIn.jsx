import React from 'react';
import Button from '@mui/material/Button';
// logo
import logoDark from '../../../assets/logo-dark.png';


const SignIn = ()=>{
    return(
        <>
            <section className='auth_section signin_section'>
                <div className="container">
                    <div className="contents">
                        <img src={logoDark} className='img-fluid logo' />

                        <div className="form_card">
                            <h4 className='title'>Sign in</h4>

                            <form action="">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" name='email' className='form-control' />
                                </div>

                                <div className="form-group">
                                    <div className="label_row">
                                        <label>Password</label>
                                        <a href='' className='forgot_pass'>Forgot Password?</a>
                                    </div>
                                    <input type="password" name='password' className='form-control' />
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

                            <a href="" className='btn create_account_btn'>Create your Amazon account</a>
                            
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SignIn