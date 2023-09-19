import React, {useState} from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import axios from '../../../axios';
import { v4 as uuidv4 } from 'uuid';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { uploadCloudinary } from '../../../upload';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        // width: 250,
      },
    },
  };
  
  const names = [
      'Oliver Hansen',
      'Van Henry',
      'April Tucker',
      'Ralph Hubbard',
      'Omar Alexander',
      'Carlos Abbott',
      'Miriam Wagner',
      'Bradley Wilkerson',
      'Virginia Andrews',
      'Kelly Snyder',
  ];

const AddProduct = ()=>{

    const [images, setImages] = useState([])
    const [links, setLinks] = useState([])

    const [postData, setPostData] = useState({
        id:'',
        product_title:'',
        product_category:[],
        images:[],
    })

    const handleInputChange = (e)=>{
        const inputName = e.target.name;
        const value = e.target.value;

        setPostData({
            ...postData,
            [inputName]:value,
        })
    }

    const categoryInputChange = (event) => {
        const {
          target: { value },
        } = event;

        setPostData({
            ...postData,
            product_category:typeof value === 'string' ? value.split(',') : value,
        })

        // setPersonName(
        //   // On autofill we get a stringified value.
        //   typeof value === 'string' ? value.split(',') : value,
        // );
    };

    const productImageHandler = (e)=>{
        setPostData({
            ...postData,
            images:e.target.files
        })

        // setImages(e.target.files)
    }

    const submitFunc = async(e)=>{
        e.preventDefault();
        let arr = [];
        const selectedImages = Object.values(postData.images);

        // selectedImages.map(singlePostData => {
        //     console.log('singlePostData',singlePostData.name);
        // })

        // console.log('postData.images',);

        // return;

        try{
            for(let i = 0; i < selectedImages.length; i++){
                const res = await uploadCloudinary(selectedImages[i]);
                arr.push(res);
                // setPostData({...postData, images:[...postData.images, res]});
            }
        }catch(error){
            console.log('error',error);
        }

        setPostData({...postData, images:arr});

        debugger;
        
        const data = {
            id:uuidv4(),
            product_title:postData.product_title,
            categories:postData.product_category,
            images:arr,
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
            <Sidebar />
            <Header />

            <div className="page-wrapper">
			<div className="page-content">

				{/* breadcrumb */}
				<div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
					<div className="breadcrumb-title pe-3">eCommerce</div>
					<div className="ps-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb mb-0 p-0">
								<li className="breadcrumb-item"><a href="#"><i className="bx bx-home-alt"></i></a>
								</li>
								<li className="breadcrumb-item active" aria-current="page">Add New Product</li>
							</ol>
						</nav>
					</div>
					<div className="ms-auto">
						<div className="btn-group">
							<button type="button" className="btn btn-primary">Settings</button>
							<button type="button" className="btn btn-primary split-bg-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">	<span className="visually-hidden">Toggle Dropdown</span>
							</button>
							<div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-end">	<a className="dropdown-item" href="#">Action</a>
								<a className="dropdown-item" href="#">Another action</a>
								<a className="dropdown-item" href="#">Something else here</a>
								<div className="dropdown-divider"></div>	<a className="dropdown-item" href="#">Separated link</a>
							</div>
						</div>
					</div>
				</div>
				{/* end breadcrumb */}

                <div className="card">
				  <div className="card-body p-4">
					  <h5 className="card-title">Add New Product</h5>
					  <hr/>
                        <form onSubmit={submitFunc}>
                            <div className="form-body mt-4">
                                <div className="row">
                                    <div className="col-lg-8">
                                        <div className="border border-3 p-4 rounded">
                                            <div className="mb-3">
                                                <label htmlFor="inputProductTitle" className="form-label">Product Title</label>
                                                <input type="text" className="form-control" name='product_title' id="inputProductTitle" onChange={handleInputChange} value={postData.product_title} placeholder="Enter product title" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="inputProductDescription" className="form-label">Description</label>
                                                <textarea className="form-control" id="inputProductDescription" rows="3"></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="inputProductDescription" className="form-label">Product Images</label>
                                                <input id="image-uploadify" type="file" accept="image/*" onChange={productImageHandler} multiple />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="border border-3 p-4 rounded">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label htmlFor="inputPrice" className="form-label">Price</label>
                                                <input type="email" className="form-control" id="inputPrice" placeholder="00.00" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inputCompareatprice" className="form-label">Compare at Price</label>
                                                <input type="password" className="form-control" id="inputCompareatprice" placeholder="00.00" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inputCostPerPrice" className="form-label">Cost Per Price</label>
                                                <input type="email" className="form-control" id="inputCostPerPrice" placeholder="00.00" />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="inputStarPoints" className="form-label">Star Points</label>
                                                <input type="password" className="form-control" id="inputStarPoints" placeholder="00.00" />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="inputProductType" className="form-label">Product Type</label>
                                                <select className="form-select" id="inputProductType">
                                                    <option></option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="inputProductType" className="form-label">Product Category</label>
                                                <FormControl sx={{ width: '100%' }}>
                                                    {/* <InputLabel id="demo-multiple-checkbox-label">Product Category</InputLabel> */}
                                                    <Select
                                                    labelId="demo-multiple-checkbox-label"
                                                    id="demo-multiple-checkbox"
                                                    multiple
                                                    displayEmpty
                                                    name="product_category"
                                                    value={postData.product_category}
                                                    onChange={categoryInputChange}
                                                    // input={<OutlinedInput label="Tag" />}
                                                    renderValue={(selected) => selected.join(', ')}
                                                    MenuProps={MenuProps}
                                                    >
                                                    {names.map((name) => (
                                                        <MenuItem key={name} value={name}>
                                                        <Checkbox checked={postData.product_category.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                        </MenuItem>
                                                    ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="inputVendor" className="form-label">Vendor</label>
                                                <select className="form-select" id="inputVendor">
                                                    <option></option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="inputCollection" className="form-label">Collection</label>
                                                <select className="form-select" id="inputCollection">
                                                    <option></option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="inputProductTags" className="form-label">Product Tags</label>
                                                <input type="text" className="form-control" id="inputProductTags" placeholder="Enter Product Tags" />
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid">
                                                    <button type="submit" className="btn btn-primary">Save Product</button>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                    </div>
                                </div>
                                {/* end row */}
                            </div>
                        </form>

                        {links && links.length > 0 && links.map(link =>{
                            return(
                                <div key={link?.publicId}>
                                    <p>publicId: {link?.publicId}</p>
                                    <p>url: {link?.url}</p>
                                    <img width={300} src={link?.url} alt='' />
                                </div>
                            )
                        })}
				  </div>
			  </div>

			</div>
		</div>
        </>
    )
}

export default AddProduct;