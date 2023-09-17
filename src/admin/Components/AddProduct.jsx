import React, { useState } from 'react';
import axios from '../../axios'

const AddProduct = ()=>{
    const [postData, setPostData] = useState({
        name:'',
        price:'',
    })

    const handleInputChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setPostData({
            ...postData,
            [name]:value,
        })
    }

    const submitFunc = (e)=>{
        e.preventDefault();
        
        const data = {
            name:postData.name,
            price:postData.price,
        }

        axios.post('/products.json', data)
        .then(response => {
            console.log('POST request successful', response.data);
        })
        .catch(error=>{
            console.error('POST request error', error);
        })
    }

    return(
        <>
            <form onSubmit={submitFunc}>
                <div class="form-group">
                    <label for="exampleInputEmail1">Images</label>
                    <input type="file" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                </div>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" name="name" value={postData.name} onChange={handleInputChange} />
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <input type="number" class="form-control" name='price' value={postData.price} onChange={handleInputChange} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default AddProduct;