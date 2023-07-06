import { Component } from "react";
import CartIcon from '../../../assets/icons/cart.png'
import './CartLink.css'

class CartLink extends Component{
    render(){
        return(
            <div className="header_item cart_item">
                <a href="#">
                    <div className="main">
                        <span className="icon">
                            <p className="count">0</p>
                            <img src={CartIcon} />
                        </span>
                        <p>Cart</p>
                    </div>
                </a>
            </div>
        )
    }
}

export default CartLink;