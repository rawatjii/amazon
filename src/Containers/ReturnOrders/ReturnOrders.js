import { Component } from "react";
import defaultImage from '../../assets/default.jpg';

class ReturnOrders extends Component{

    state={
        dropdown:false
    }

    render(){
        return(
            <div className='header_item'>
                <a href="#">
                    <div className='main'>
                        <small>Returns</small>
                        <p>& Orders</p>
                    </div>
                </a>
            </div>
        )
    }
}

export default ReturnOrders;