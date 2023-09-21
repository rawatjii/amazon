import { createSlice } from '@reduxjs/toolkit';
import { useCookies } from 'react-cookie';
import axios from '../../axios';
// import axios from 'axios';

const initialState1 = {
    loading:false,
    allProducts: [],
    relatedItemsCategory:'',
    searchedProducts:[],
};

const productsSlice = createSlice({
    name:'products',
    initialState:initialState1,
    reducers:{
        fetchProductsStart:(state)=>{
            state.loading = true;
        },
        // fetchAllProducts:(state, action)=>{
        //     state.allProducts = action.payload;
        //     state.loading = false;
        // },
        fetchProductsSuccess:(state, action)=>{
            state.allProducts = action.payload;
            state.loading = false;
        },
        fetchProductsFailure:(state)=>{
            state.loading = false;
        },
        setRelatedItemsCategory:(state, action)=>{
            state.relatedItemsCategory = action.payload;
        },
        setSearchedProducts:(state, action)=>{
            state.searchedProducts = [...action.payload];
        }
    }
})

export const fetchProducts = ()=>{
    return async (dispatch)=>{
        dispatch(fetchProductsStart());
        try{
            const dataArr = [];
            const response = await axios.get('/products.json');
            if (response.status >= 200 && response.status < 300) {
                Object.entries(response.data).map((entry)=>{
                    dataArr.push(entry[1])
                });
                // console.log('products thunk', dataArr);
    
                // dispatch(fetchAllProducts(dataArr))
                dispatch(fetchProductsSuccess(dataArr)); 
            }else{
                throw new Error('Failed to fetch products')
            }
            
        }catch(err){
            dispatch(fetchProductsFailure());
            return console.error('Error While Fetching Projects');
        }
    }
}

// export const addRelatedItemCategory = (data)=>{

//     return async (dispatch)=>{
//         dispatch(setRelatedItemsCategory(data))
//     }
// }

export const {fetchProductsStart, fetchAllProducts, fetchProductsSuccess, fetchProductsFailure, setRelatedItemsCategory, setSearchedProducts} = productsSlice.actions;

export default productsSlice.reducer;