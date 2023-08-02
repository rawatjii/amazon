import { Component } from "react";
import { Container } from "@mui/material";
import ProductsByHistory from "./ProductsByHistory/ProductsByHistory";
import TodayDeals from "../TodayDeals/TodayDeals";
import RelatedItems from "../RelatedItems/RelatedItems";
import './MainProducts.css'

class MainProducts extends Component{
    render(){
        return(
            <div className="main_products bg-gray">
                <Container maxWidth='xl'>
                    <h2>Main Products</h2>
                    <div className="row">
                        <ProductsByHistory />
                    </div>
                    <TodayDeals />
                    <RelatedItems />
                </Container>
            </div>
        )
    }
}

export default MainProducts;