import React, { Component } from "react";
import logo from '../../assets/logo-dark.png';
import Image from "../../Components/Image/Image";
import { FormGroup, TextField } from "@mui/material";
import validator from 'validator'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import './Register.css'

class Register extends Component{

    state = {
        emailErr:null,
        passwordErr:null
    }

    emailChangeHandler =(e)=>{
        const email = e.target.value
        this.setState({emailErr:validator.isEmail(email)})
    }

    passwordChangeHandler=(e)=>{
        const password = e.target.value;
        this.setState({passwordErr:validator.isLength(password, {min:6})})
    }

    render(){
        return(
            <div className="register_page">
                <Image src={logo} className="logo w-100" />
                <form className="register_form">
                    <h3 className="form_head">Create Account</h3>
                    <FormGroup>
                        <label>Your name</label>
                        <TextField placeholder="First and last name" />
                    </FormGroup>
                    <FormGroup>
                        <label>Email</label>
                        <TextField placeholder="Your email" type="email" onChange={this.emailChangeHandler} error={this.state.emailErr === false ? true : null} helperText={this.state.emailErr === false ? 'Invalid Email' : ''} />
                    </FormGroup>
                    <FormGroup>
                        <label>Password</label>
                        <TextField placeholder="At lease 6 characters" type="password" onChange={this.passwordChangeHandler} error={this.state.passwordErr === false ? true : null} helperText="" />
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