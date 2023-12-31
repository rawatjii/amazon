import React, { Component } from "react";
import { redirect } from 'react-router-dom';
import logo from '../../assets/logo-dark.png';
import Image from "../../Components/Image/Image";
import { FormGroup, TextField } from "@mui/material";
import validator from 'validator'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Button from '@mui/material/Button';
import axios from "axios";
import { withNavigate } from "../../Components/hoc/withNavigate/withNavigate";
import { writeUserData } from "../../firebase-config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Register.css'

class Register extends Component{

    constructor(props){
        super(props);
        this.nameInputRef = React.createRef();
        this.emailInputRef = React.createRef();
        this.passwordInputRef = React.createRef();
        this.confirmPasswordInputRef = React.createRef();
    }

    notify = (msg) => toast(msg);
    auth = getAuth();

    
    // handleRedirect = ()=>{
    //     const navigate = useNavigate()
    //     return navigate('/')
    // }

    // state = {
    //     email:{
    //         value:'',
    //         isValid:null,
    //     },
    //     password:{
    //         value:'',
    //         isValid:null,
    //     },
    //     emailErr:null,
    //     passwordErr:null,
    // }

    state = {
        nameValidationErr : null,
        emailValidationErr : null,
        passwordValidationErr : null,
        confirmPasswordValidationErr : null,
    }

    inputChangeHandler =(e)=>{
        // var errValidation;
        // if(e.target.name === 'email'){
        //     errValidation = validator.isEmail(e.target.value);
        // }
        // // this.setState({emailErr:validator.isEmail(email)});
        // this.setState((prevstate)=>{
        //     return {
        //         ...prevstate,
        //         [e.target.name]:{
        //             ...prevstate[e.target.name],
        //             value:e.target.value,
        //             isValid:errValidation
        //         },
        //     }
        // })
    }

    // passwordChangeHandler=(e)=>{
    //     const password = e.target.value;
    //     this.setState({passwordErr:validator.isLength(password, {min:6})});
    // }

    userSignupHandler = (e)=>{
        e.preventDefault();
        const nameInputValue = this.nameInputRef.current.value;
        const emailInputValue = this.emailInputRef.current.value;
        const passwordInputValue = this.passwordInputRef.current.value;
        const confirmPasswordInputValue = this.confirmPasswordInputRef.current.value;
        
        const nameValidation = validator.isEmpty(nameInputValue);
        const emailValidation = validator.isEmail(emailInputValue);
        const passwordValidation = validator.isLength(passwordInputValue, {min: 6, max: undefined});
        const confirmPasswordValidation = passwordInputValue === confirmPasswordInputValue ? true : false;

        this.setState({
            nameValidationErr:nameValidation,
            emailValidationErr:emailValidation,
            passwordValidationErr:passwordValidation,
            confirmPasswordValidationErr:confirmPasswordValidation,
        })

        if(emailValidation && passwordValidation && !nameValidation && confirmPasswordValidation === true){
            createUserWithEmailAndPassword(this.auth, emailInputValue, passwordInputValue)
            .then((userCredential)=>{
                // const user = userCredential;
                writeUserData(userCredential.user.uid, nameInputValue, emailInputValue,'https://cdn.pixabay.com/photo/2017/01/30/23/52/female-2022387_640.png');
                this.notify("User Sign Up Successfully");
                return this.props.navigate('/signin');
            })
            .catch(({err}) => {
                console.log('error',err);
                // this.notify(error);
            });
            // axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXTJ933M80KhdZHsq9RI235eatTkCoaWQ', {email:emailInputValue, password:passwordInputValue,returnSecureToken:true})
            // .then(res=>{
            //     alert('user authenticated successfully');
            //     // return this.props.navigate('/signin');
            // })
            // .catch(error=>{
            //     alert(error);
            // })
        }

    }

    render(){
        return(
            <div className="register_page">
                <Image src={logo} className="logo" />
                <form className="register_form" onSubmit={this.userSignupHandler}>
                    <h3 className="form_head">Create Account</h3>
                    <FormGroup>
                        <label>Your name</label>
                        <input className={this.state.nameValidationErr && this.state.nameValidationErr != null ? 'err':null} placeholder="First and last name" ref={this.nameInputRef} />
                        {this.state.nameValidationErr && this.state.nameValidationErr != null ? <span className="error">Please enter your name</span> : null}
                    </FormGroup>
                    <FormGroup>
                        <label>Email</label>
                        <input className={!this.state.emailValidationErr && this.state.emailValidationErr != null ? 'err':null} placeholder="Your email" type="email" name="email" ref={this.emailInputRef} /*onChange={this.inputChangeHandler}*/ /*value={this.state.email.value}*/ />
                        {!this.state.emailValidationErr && this.state.emailValidationErr != null ? <span className="error">Invalid Email</span> : null}
                        {/* onChange={this.emailChangeHandler} error={this.state.emailErr === false ? true : null} helperText={this.state.emailErr === false ? 'Invalid Email' : ''}  */}
                    </FormGroup>
                    <FormGroup>
                        <label>Password</label>
                        {/* onChange={this.passwordChangeHandler} error={this.state.passwordErr === false ? true : null} helperText="" */}
                        <input className={!this.state.passwordValidationErr && this.state.passwordValidationErr != null ? 'err':null} placeholder="At lease 6 characters" name="password" type="password" ref={this.passwordInputRef}  />
                        <span className={!this.state.passwordValidationErr && this.state.passwordValidationErr != null ? 'infoLine err':'infoLine'}>
                            <InfoOutlinedIcon className="icon"/>
                            Passwords must be at least 6 characters.
                        </span>
                    </FormGroup>
                    <FormGroup>
                        <label>Confirm Password</label>
                        {/* onChange={this.passwordChangeHandler} error={this.state.passwordErr === false ? true : null} helperText="" */}
                        <input placeholder="Enter Confirm Password" type="password" ref={this.confirmPasswordInputRef}  />
                        {!this.state.confirmPasswordValidationErr && this.state.confirmPasswordValidationErr != null ? <span className="error">Confirm password should match with password</span> : null}
                        
                    </FormGroup>
                    <Button variant="contained" color="secondary" className="signup_btn" type="submit">Sign Up</Button>
                </form>
            </div>
        )
    }
}

export default withNavigate(Register);