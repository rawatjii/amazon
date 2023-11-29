import React, {useRef, useState, useEffect} from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import validator from 'validator';
import { getAllBrands, getAllCategories, getCategoryById } from '../../../firebase-config';
import { uploadCloudinary } from '../../../upload';
import { addProduct } from '../../../firebase-config';

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
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [validationError, setValidationError] = useState({
        product_title:null,
        images:null
    })

    const [postData, setPostData] = useState({
        id:'',
        product_title:'',
        product_category:[],
        product_subCategory:[],
        price:{
            offerPrice:'',
            originalPrice:''
        },
        images:[],
        brand:'',
    })

    const notify = (msg) => toast(msg);

    const originalPrice = useRef('');
    const offerPrice = useRef('');

    const fetchProductCategories = async()=>{
        try{
            const allCategoryData = await getAllCategories();
            const allCategoriesArray = Object.values(allCategoryData).map(data=>{
                return {
                    value:data.category.toLowerCase(),
                    label:data.category,
                    id:data.id,
                }
            })
            setCategories(allCategoriesArray)
        }catch(err){
            console.log(err);
        }
    }

    const fetchProductSubCategories = async(id)=>{
        try{
            const allCategoryData = await getCategoryById(id);
            console.log('allCategoryData',allCategoryData);
            if(allCategoryData){
                if(allCategoryData.hasOwnProperty('subCategories')){
					const categoryRowsData = Object.values(allCategoryData.subCategories).map(category=>{
						return {
                            value:category.category.toLowerCase(),
                            label:category.category
                        }
					})
                    console.log('categoryRowsData',categoryRowsData );
					setSubCategories(categoryRowsData)
				}
                else{
					setSubCategories([])
				}
            }
            // else{
            //     setSubCategories([])
            // }


            // const allCategoriesArray = Object.values(allCategoryData).map(data=>{
            //     if(data.hasOwnProperty('subCategories')){
            //         return Object.values(data.subCategories).map(data=>{
            //             return {
            //                 value:data.category.toLowerCase(),
            //                 label:data.category
            //             } 
            //         })
            //         setSubCategories(allCategoriesArray)
                       
            //     }else{
            //         setSubCategories([])
            //     }
                
            // })
            // console.log('allCategoriesArray',allCategoriesArray);
        }catch(err){
            console.log(err);
        }
    }

    const fetchBrandData = async()=>{
        try{
            const allBrandsData = await getAllBrands()
            const allBrandsArray = Object.values(allBrandsData).map(data=>{
                return {
                    value:data.brand.toLowerCase(),
                    label:data.brand
                }
            })
            setBrands(allBrandsArray)
        }catch(error){
            console.error('Error from edit products: ', error.message);
        }
    }

    useEffect(()=>{
        fetchBrandData();
        fetchProductCategories();
    }, [])

    const handleInputChange = (e)=>{
        const inputName = e.target.name;
        const value = e.target.value;

        setPostData({
            ...postData,
            [inputName]:value,
        })
    }

    const categoryInputChange = async(event) => {
        try{
            
            const {
                target: { value },
            } = event;

            const allCategoryData = await getCategoryById(value);
            const selectedCategory = allCategoryData.category;

            setPostData({
                ...postData,
                product_category:typeof selectedCategory === 'string' ? {value:selectedCategory.split(',')} : {value:selectedCategory},
            })

            fetchProductSubCategories(value);
        }catch(err){

        }
        
        // setPersonName(
        //   // On autofill we get a stringified value.
        //   typeof value === 'string' ? value.split(',') : value,
        // );
    };

    const subCategoryInputChange = (event)=>{
        console.log('event',event);

        const {
            target: { value },
          } = event;

        setPostData({
            ...postData,
            product_subCategory:value
        })
    }

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

        setValidationError({
            ...validationError,
            product_title: validator.isEmpty(postData.product_title),
            images:postData.images.length === 0 ? true : false,
            offerPrice:validator.isEmpty(offerPrice.current.value),
            brand:validator.isEmpty(postData.brand)
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
                                                {validationError.product_title ? <span className="error">Please enter Product Title</span> : null}
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="inputProductDescription" className="form-label">Description</label>
                                                <textarea className="form-control" id="inputProductDescription" rows="3"></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="inputProductDescription" className="form-label">Product Images</label>
                                                <input className='form-control' id="image-uploadify" type="file" accept="image/*" onChange={productImageHandler} multiple />
                                                {validationError.images ? <span className="error">Please select product images</span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="border border-3 p-4 rounded">
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label htmlFor="inputCompareatprice" className="form-label">Offer Price</label>
                                                <input type="number" className="form-control" id="inputCompareatprice" placeholder="00" ref={offerPrice} />
                                                {validationError.offerPrice ? <span className="error">Please enter offer price</span> : null}
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="inputPrice" className="form-label">Original Price</label>
                                                <input type="number" className="form-control" id="inputPrice" placeholder="00" ref={originalPrice} />
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="inputProductType" className="form-label">Product Category</label>
                                                <FormControl sx={{ width: '100%' }}>
                                                    {/* <InputLabel id="demo-multiple-checkbox-label">Product Category</InputLabel> */}
                                                    <Select
                                                    labelId="demo-multiple-checkbox-label"
                                                    id="demo-multiple-checkbox"
                                                    displayEmpty
                                                    name="product_category"
                                                    value={postData.product_category}
                                                    onChange={categoryInputChange}
                                                    // input={<OutlinedInput label="Tag" />}
                                                    renderValue={(selected) => selected.value}
                                                    MenuProps={MenuProps}
                                                    >
                                                    {categories.map(singleCategory =>(
                                                        <MenuItem key={singleCategory.id} value={singleCategory.id}>{singleCategory.label}</MenuItem>
                                                        // id={singleCategory.id}
                                                    ))}
                                                    {/* {names.map((name) => (
                                                        <MenuItem key={name} value={name}>
                                                        <Checkbox checked={postData.product_category.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                        </MenuItem>
                                                    ))} */}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="inputProductType" className="form-label">Product Sub Categories</label>
                                                <FormControl sx={{ width: '100%' }}>
                                                    {/* <InputLabel id="demo-multiple-checkbox-label">Product Category</InputLabel> */}
                                                    <Select
                                                    labelId="sub-category-label"
                                                    id="sub-category"
                                                    displayEmpty
                                                    multiple
                                                    name="product_sub_category"
                                                    value={postData.product_subCategory}
                                                    onChange={subCategoryInputChange}
                                                    defaultValue="Please select product category first"
                                                    // input={<OutlinedInput label="Tag" />}
                                                    renderValue={(selected) => selected.join(', ')}
                                                    MenuProps={MenuProps}
                                                    >
                                                        {subCategories.length > 0 ? subCategories.map(singleCategory =>(
                                                            <MenuItem value={singleCategory.value}>{singleCategory.label}</MenuItem>
                                                        )) : <MenuItem disabled>No Record Found</MenuItem>}
                                                    
                                                    {/* {names.map((name) => (
                                                        <MenuItem key={name} value={name}>
                                                        <Checkbox checked={postData.product_category.indexOf(name) > -1} />
                                                        <ListItemText primary={name} />
                                                        </MenuItem>
                                                    ))} */}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="inputVendor" className="form-label">Brand</label>
                                                <FormControl sx={{ width: '100%' }}>
                                                    <Select name='brand' onChange={handleInputChange}>
                                                        {brands.map(singleBrand =>(
                                                            <MenuItem value={singleBrand.value}>{singleBrand.label}</MenuItem>
                                                        ))}
                                                    </Select> 
                                                    {validationError.brand ? <span className="error">Please select product brand</span> : null}   
                                                </FormControl>
                                                
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