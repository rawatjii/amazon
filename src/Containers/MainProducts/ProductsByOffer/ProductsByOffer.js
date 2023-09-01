import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ProductsByOffer.css';
import mensFootwear from '../../../assets/offers/footwear-mens.webp';
import { ConstructionOutlined } from '@mui/icons-material';

// import 

const allProductsCategory = ['Mens Clothing & Accessories', 'Womens Clothing & Accessories', 'Kitchen & Home Appliances', 'Home & Kitchen'];
var MaxNumber = 0;

const ProductsByOffer = ()=>{

    const [productsCategory, setProductsCategory] = useState([]);

    const AllProducts = useSelector((state)=>{
        return state.products.allProducts; 
    })

    useEffect(()=>{
        allProductsCategory.map((singleCategories, index)=>{
            var newSingleCategory = singleCategories.toLowerCase();
            const discountNumbers = [];
            
            AllProducts.map((product)=>{
                // get maximum discount
                var newProductCategory = product.category.toLowerCase();
                
                if(newSingleCategory.includes('mens') && !newSingleCategory.includes('womens') && newProductCategory.includes('men') && !newProductCategory.includes('women')){
                    // console.log('isMensTrue', product.category);
                    // const discountNumbers = [];
                    // var discountAmt = 0;

                    if(product.price.discount > MaxNumber){
                        MaxNumber = product.price.discount;
                    };

                    const text = 'Styles for men';

                    if(product.category.toLowerCase().includes('footwear')){
                        // const test= []; 
                        const newObj = {
                            title:text,
                            category:'mens style',
                            products:[
                                {
                                    thumbnail:mensFootwear,
                                    name:'Footwear'
                                }
                            ]
                        }

                        productsCategory.map((singleCatg)=>{
                            // console.log('testing', singleCatg);
                            if(singleCatg.category == 'mens style'){
                                console.log('testing');
                                singleCatg.products.map((singleItem, singleItemNo)=>{
                                    console.log('singleItem',singleItem);
                                    const newProdArray = [singleItem, newObj];
                                    // console.log('newProdArray',newProdArray);
                                    setProductsCategory([
                                        ...productsCategory,
                                        newProdArray
                                    ])
                                })
                            }else{
                                setProductsCategory([
                                    ...productsCategory,
                                    newObj
                                ])
                            }
                        })

                        // setProductsCategory([
                        //     ...productsCategory,
                        //     newObj
                        // ])

                        // if(productsCategory){}
                        // const newProductsArray = [
                        //     ...productsCategory,
                        //     // products:test
                        // ]
                        
                    }
                    
                    // discountNumbers.push(product.price.discount);
                    // const title = 'Up to ' + MaxNumber + '% off | Styles for men';
                    // const newObj = {
                    //     title:title,
                    // }
                    // setProductsCategory([newObj])
                    // console.log('productsCategory',productsCategory);
                }else if(product.category.includes(singleCategories)){
                    // console.log('isMensTrue', 'false');
                    // discountNumbers.push(product.price.discount)
                }
                
                // MaxNumber = Math.max(...discountNumbers);
                // console.log('MaxNumber',MaxNumber);
            })
            
        })
    }, [AllProducts])

    console.log('productsCategory',productsCategory)

    return(
        <div className="products_by_offer">
            <div className="row">
                {/* {allProductsCategory.map((singleCategories, index)=>{
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
                })} */}

                {productsCategory.map((product, index)=>{
                    return(
                        <div className="col_3 single_col" key={index}>
                            <div className="card">
                                <h3>{product.title}</h3>
                            </div>
                        </div>
                    )
                })}
                
            </div>
        </div>
    )
}

export default ProductsByOffer