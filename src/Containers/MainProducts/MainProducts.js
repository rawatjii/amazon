import { Component } from "react";
import { Container } from "@mui/material";
import ProductsByOffer from './ProductsByOffer/ProductsByOffer'
import TodayDeals from "../TodayDeals/TodayDeals";
import RelatedItems from "../RelatedItems/RelatedItems";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import './MainProducts.css'

class MainProducts extends Component{
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    state={
        cookieName:''
    }

    componentDidMount(){
        const { cookies } = this.props;
        this.setState({
            cookieName:cookies.get('relatedItemsCategory')
        })
    }

    render(){
        return(
            <div className="main_products bg-gray">
                <Container maxWidth='xl'>
                    {/* <h2>Main Products</h2>*/}
                    {/* <ProductsByOffer /> */}
                    <TodayDeals />
                    {this.state.cookieName !== undefined ? 
                        <RelatedItems productByCategory={this.state.cookieName} /> :
                        null
                    }
                </Container>
            </div>
        )
    }
}

export default withCookies(MainProducts);