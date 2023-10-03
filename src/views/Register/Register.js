import React, { Component } from "react";
import logo from '../../assets/logo-dark.png';
import Image from "../../Components/Image/Image";
import { FormGroup, TextField } from "@mui/material";
import validator from 'validator'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import './Register.css'
import axios from "axios";

class Register extends Component{

    constructor(props){
        super(props);
        this.nameInputRef = React.createRef();
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
    }

    state = {
        emailErr:null,
        passwordErr:null,
    }

    emailChangeHandler =(e)=>{
        const email = e.target.value;
        this.setState({emailErr:validator.isEmail(email)});
    }

    passwordChangeHandler=(e)=>{
        const password = e.target.value;
        this.setState({passwordErr:validator.isLength(password, {min:6})});
    }

    userSignupHandler = (e)=>{
        e.preventDefault();
        console.log('passwordInputRef',this.passwordInputRef.current.value);



        // axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXTJ933M80KhdZHsq9RI235eatTkCoaWQ', {email:'test@gmail.com', password:'test123',returnSecureToken:true})
        // .then(res=>{
        //     console.log('user authenticated successfully');
        // })
        // .catch(error=>{
        //     console.log('There is an error while user register');
        // })
    }

    render(){
        return(
            <div className="register_page">
                <Image src={logo} className="logo" />
                <form className="register_form" onSubmit={this.userSignupHandler}>
                    <h3 className="form_head">Create Account</h3>
                    <FormGroup>
                        <label>Your name</label>
                        <input placeholder="First and last name" ref={this.nameInputRef} />
                    </FormGroup>
                    <FormGroup>
                        <label>Email</label>
                        <input placeholder="Your email" type="email" ref={this.emailInputRef} />
                        {/* onChange={this.emailChangeHandler} error={this.state.emailErr === false ? true : null} helperText={this.state.emailErr === false ? 'Invalid Email' : ''}  */}
                    </FormGroup>
                    <FormGroup>
                        <label>Password</label>
                        {/* onChange={this.passwordChangeHandler} error={this.state.passwordErr === false ? true : null} helperText="" */}
                        <input placeholder="At lease 6 characters" type="password" ref={this.passwordInputRef}  />
                        <span className="infoLine">
                            <InfoOutlinedIcon className="icon"/>
                            Passwords must be at least 6 characters.
                        </span>
                    </FormGroup>
                    <Button variant="contained" color="secondary" className="signup_btn" type="submit">Sign Up</Button>
                </form>
            </div>
        )
    }
}

export default Register;