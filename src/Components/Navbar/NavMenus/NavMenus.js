import { Component } from "react";
import ReactDOM from 'react-dom';
import MenuUser from '../../../assets/icons/menu_user.svg';
import './NavMenus.css'
import Image from "../../Image/Image";

const Backdrop = (props)=>{
    return(
        <div className={`backdrop ${props.className}`} onClick={props.hideMenu}></div>
    );
}

class NavMenus extends Component{
    render(){
        return(
            <>
            <span className={`navMenuClose ${this.props.show ? 'show' : null}`} onClick={this.props.hideMenus}>
                &times;
            </span>
            <div className={`menus ${this.props.show ? 'show' : null}`}>
                <div className="user_top">
                    <Image src={MenuUser} className="user" />
                    <h4>Hello, sign in</h4>
                </div>
                <div className="menu_bottom">
                    <div className="single_category">
                        <h4>Trending</h4>
                        <ul>
                            <li>
                                <a href="#">Best Seller</a>
                            </li>
                            <li>
                                <a href="#">New Releases</a>
                            </li>
                            <li>
                                <a href="#">Movers and Shakers</a>
                            </li>
                        </ul>
                    </div>

                    <div className="single_category">
                        <h4>Digital Content And Devices</h4>
                        <ul>
                            <li>
                                <a href="#">Echo & Alexa</a>
                            </li>
                            <li>
                                <a href="#">Fire TV</a>
                            </li>
                            <li>
                                <a href="#">Kindle E-Readers & eBooks</a>
                            </li>
                            <li>
                                <a href="#">Audible Audiobooks</a>
                            </li>
                            <li>
                                <a href="#">Amazon Prime Video</a>
                            </li>
                            <li>
                                <a href="#">Amazon Prime Music</a>
                            </li>
                        </ul>
                    </div>

                    <div className="single_category">
                        <h4>Shop By Category</h4>
                        <ul>
                            <li>
                                <a href="#">Mobiles, Computers</a>
                            </li>
                            <li>
                                <a href="#">TV, Appliances, Electronics</a>
                            </li>
                            <li>
                                <a href="#">Men's Fashion</a>
                            </li>
                            <li>
                                <a href="#">Women's Fashion</a>
                            </li>
                        </ul>
                    </div>

                    <div className="single_category">
                        <h4>Programs & Features</h4>
                        <ul>
                            <li>
                                <a href="#">Gift Cards & Mobile Recharges</a>
                            </li>
                            <li>
                                <a href="#">Amazon Launchpad</a>
                            </li>
                            <li>
                                <a href="#">Flight Tickets</a>
                            </li>
                            <li>
                                <a href="#">Clearance store</a>
                            </li>
                        </ul>
                    </div>

                    <div className="single_category">
                        <h4>Help & Settings</h4>
                        <ul>
                            <li>
                                <a href="#">Your Account</a>
                            </li>
                            <li>
                                <a href="#">Customer Service</a>
                            </li>
                            <li>
                                <a href="#">Flight Tickets</a>
                            </li>
                            <li>
                                <a href="#">Sign in</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>

            {ReactDOM.createPortal(
                <Backdrop className={this.props.show ? 'show':''} hideMenu={this.props.hideMenus} />,
                document.getElementById('backdrop')
            )}
            </>
        )
    }
}

export default NavMenus;