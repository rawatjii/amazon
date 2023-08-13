import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ProductsByOffer.css';

const allProductsCategory = ['Mens Clothing & Accessories', 'Womens Clothing & Accessories', 'Kitchen & Home Appliances', 'Home & Kitchen'];

const ProductsByOffer = ()=>{

    const [] = useState([]);

    const AllProducts = useSelector((state)=>{
        return state.products.allProducts
    })

    useEffect(()=>{
        allProductsCategory.map((singleCategories, index)=>{

            // get maximum discount
            var MaxNumber = null;
            const discountNumbers = [];
            AllProducts.map((product)=>{

                if(singleCategories.includes('mens') && product.category.includes('men')){
                    console.log('isMensTrue', product.category);
                }else if(product.category.includes(singleCategories)){
                    console.log('isMensTrue', 'false');
                    discountNumbers.push(product.price.discount)
                }
            })
            MaxNumber = Math.max(...discountNumbers);
            console.log('singleCategories',singleCategories);


        })
    }, [])

    return(
        <div className="products_by_offer">
            <div className="row">
                {allProductsCategory.map((singleCategories, index)=>{
                    const discountNumbers = [];
                    AllProducts.map((product)=>{
                        if(product.category.includes(singleCategories)){
                            discountNumbers.push(product.price.discount)
                        }
                    })

                    const largestNumber = Math.max(...discountNumbers)

                    return(
                        <div className="col_3 single_col" key={index}>
                            <div className="card">
                                <h3>Up to {largestNumber}% off</h3>
                            </div>
                        </div>
                    )
                })}
                
            </div>
        </div>
    )
}

export default ProductsByOffer