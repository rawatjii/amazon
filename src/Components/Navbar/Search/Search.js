import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector, useDispatch } from "react-redux";
import { setSearchKeyword } from "../../../store/reducers/searchReducer";
import {setSearchedProducts} from '../../../store/reducers/productsReducer'


const Search = ()=>{

    var FilteredProductsAll = [];
    const [age, setAge] = useState('')
    const [searchInput, setSearchInput] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    // const [allProducts, setAllProducts] = useState([]);

    const dispatch = useDispatch();

    const allProducts = useSelector((state)=>{
        return state.products.allProducts;
    })

    useEffect(()=>{
        const searchParams = new URLSearchParams(window.location.search);
        const searchInput = searchParams.get('product');
        setSearchInput(searchInput)
        console.log('searchInput',searchInput);
        // const searchParams = new URLSearchParams(window.location.search);
        // const productCatg = searchParams.get('cat');
        // console.log('productCatg',productCatg);
    }, [])

    const navigate = useNavigate();

    const handleChange = (event)=>{
        this.setState({
            age:event.target.value
        })
    }

    const searchInputChange = (e)=>{
        setSearchInput(e.target.value)
    }

    const searchProduct = (e)=>{
        e.preventDefault();

        if(searchInput.trim() == ''){
            return;
        }else{
            // allProducts.filter((singleProd)=>{
            //     return singleProd.product_title.toLowerCase().includes(searchInput.toLowerCase())
            //     // if(singleProd.name.includes(searchInput)){
            //     //     FilteredProductsAll.push(singleProd)
            //     //     // return ;
            //     // }else{
            //     //     FilteredProductsAll = []
            //     // }
            // })
            // .map((filteredProduct)=>{
            //     FilteredProductsAll.push(filteredProduct)
            // })
            
            // console.log('FilteredProductsAll',FilteredProductsAll);
            // dispatch(setSearchedProducts(FilteredProductsAll));
            dispatch(setSearchKeyword(searchInput))
            navigate(`/result?product=${searchInput}`);
        }

        
        // .map(filteredProd =>{
        //     FilteredProductsAll.push(filteredProd)
        // });

        // setFilteredProducts(FilteredProductsAll)
    }

    return(
        <div className='header_item search_card'>
            <form onSubmit={(e)=>searchProduct(e)}>
                <FormControl className='category_input no-fieldset' color='secondary'>
                    <Select
                        value={age}
                        onChange={handleChange}
                        displayEmpty
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        <MenuItem value={10}>Electronics</MenuItem>
                        <MenuItem value={20}>Mobile</MenuItem>
                        <MenuItem value={30}>Others</MenuItem>
                    </Select>
                </FormControl>
                
                <TextField className='search_input no-fieldset' placeholder="Search Amazon.in" id="outlined-basic" onChange={searchInputChange} value={searchInput} />

                <Button variant="contained" color='secondary' className='search_btn no-fieldset' type="submit">
                    <SearchIcon />
                </Button>
            </form>
        </div>
    )
}

export default Search;