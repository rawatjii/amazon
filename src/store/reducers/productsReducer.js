import { createSlice } from '@reduxjs/toolkit';
// import axios from '../../axios';
import axios from 'axios';

const initialState1 = {
    allProducts: [],
    relatedItemsCategory:'',
};

const productsSlice = createSlice({
    name:'products',
    initialState:initialState1,
    reducers:{
        fetchAllProducts:(state, action)=>{
            state.allProducts = action.payload
        },
        setRelatedItemsCategory:(state, action)=>{
            state.relatedItemsCategory = action.payload;
        }
    }
})

export const fetchProducts = ()=>{
    return async (dispatch)=>{
        try{
            const dataArr = [];
            const response = await axios.get('https://clone-17e54-default-rtdb.firebaseio.com/products.json');
            if (response.status >= 200 && response.status < 300) {
                Object.entries(response.data).map((entry)=>{
                    dataArr.push(entry[1])
                });
                console.log('products thunk', dataArr);
    
                dispatch(fetchAllProducts(dataArr))
            }else{
                throw new Error('Failed to fetch products')
            }
            
        }catch(err){
            return console.error('Error While Fetching Projects');
        }
    }
}

export const productClickFunc = ()=>{
    return async ()=>{

    }
}

export const {fetchAllProducts, testFunc} = productsSlice.actions;

export default productsSlice.reducer;