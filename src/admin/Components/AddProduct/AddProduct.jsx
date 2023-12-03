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
import { getAllBrands, getAllCategories, getCategoryById, addProduct } from '../../../firebase-config';
import { withNavigate } from '../../../Components/hoc/withNavigate/withNavigate';
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

const AddProduct = (props)=>{
    const [links, setLinks] = useState([])
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    const [validationError, setValidationError] = useState({
        product_title: false,
        images:false,
        offerPrice:false,
        brand:false,
        productCategory:false,
        productSubCategory:false,
    })

    const [postData, setPostData] = useState({
        id:uuidv4(),
        product_title:'',
        product_category:'',
        product_subCategory:[],
        price:{
            offerPrice:'',
            originalPrice:''
        },
        images:[],
        brand:'',
    })

	const successNotify = (msg) => toast.success(msg);

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
            if(allCategoryData){
                if(allCategoryData.hasOwnProperty('subCategories')){
					const categoryRowsData = Object.values(allCategoryData.subCategories).map(category=>{
						return {
                            value:[category.category.toLowerCase()],
                            label:category.category,
                            id:category.id
                        }
					})
                    console.log('categoryRowsData',categoryRowsData );
					setSubCategories(categoryRowsData)
				}
                else{
					setSubCategories([])
				}
            }
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
                    label:data.brand,
                    id:data.brandId
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

        if(inputName === 'offerPrice'){
            setPostData({
                ...postData,
                price:{
                    ...postData.price,
                    offerPrice:value,
                },
            })
        }
        else if(inputName === 'originalPrice'){
            setPostData({
                ...postData,
                price:{
                    ...postData.price,
                    originalPrice:value,
                },
            })
        }
        else{
            setPostData({
                ...postData,
                [inputName]:value,
            })
        }
    }

    const categoryInputChange = async(event, item) => {
        const id = item.props.id;
        const value = item.props.value;

        setPostData({
            ...postData,
            product_category:value,
        })

        fetchProductSubCategories(id);
    };

    const subCategoryInputChange = (event)=>{
        const selectedValues = event.target.value;
        setPostData({
            ...postData,
            product_subCategory:selectedValues,
        }) 
    }

    const productImageHandler = (e)=>{
        console.log(e.target.files)
        setPostData({
            ...postData,
            images:e.target.files
        })

        // setImages(e.target.files)
    }

    const submitFunc = async(e)=>{
        e.preventDefault();
        try{

            setValidationError({
                ...validationError,
                product_title: validator.isEmpty(postData.product_title),
                images: postData.images.length === 0,
                offerPrice: validator.isEmpty(postData.price.offerPrice),
                brand: validator.isEmpty(postData.brand),
                productCategory: postData.product_category.length === 0,
                productSubCategory: postData.product_subCategory.length === 0,
            })

            // upload images
            let arr = [];
            const selectedImages = Object.values(postData.images);

            for(let i = 0; i < selectedImages.length; i++){
                const res = await uploadCloudinary(selectedImages[i]);
                arr.push(res);
                // setPostData({...postData, images:[...postData.images, res]});
            }

            const formData = {
                ...postData,
                images:arr
            }


            await addProduct(formData);
            successNotify('Product added successfully');
            return props.navigate('/admin/products');
        }catch(error){
            console.error('Error adding product:', error);
        }

        {/*if(
            !validationError.product_title &&
            !validationError.images &&
            !validationError.offerPrice &&
            !validationError.productCategory &&
            !validationError.productSubCategory &&
            !validationError.brand
        ){
            try {
                await addProduct(postData);
                successNotify('Product added successfully');
            } catch (error) {
                console.error('Error adding product:', error);
                // Handle error notification or other actions
            }
        }*/}
        
    }

    {/*useEffect(() => {
        const hasErrors = Object.values(validationError).map(item=>item);
        console.log('hasErrors',hasErrors);
    
        if(
            !hasErrors.includes(false)
        ){
          // No validation errors, proceed with product addition
          addProduct(postData)
            .then(() => successNotify('Product added successfully'))
            .catch((error) => {
              console.error('Error adding product:', error);
              // Handle error notification or other actions
            });
        }
      }, [validationError, postData, addProduct, successNotify]);*/}

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
                                                <input type="number" className="form-control" id="inputCompareatprice" name="offerPrice" placeholder="00" onChange={handleInputChange}/>
                                                {validationError.offerPrice ? <span className="error">Please enter offer price</span> : null}
                                            </div>

                                            <div className="col-md-6">
                                                <label htmlFor="inputPrice" className="form-label">Original Price</label>
                                                <input type="number" className="form-control" id="inputPrice" placeholder="00" name="originalPrice" onChange={handleInputChange} />
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="inputProductType" className="form-label">Product Category</label>
                                                <FormControl sx={{ width: '100%' }}>
                                                <Select
                                                    displayEmpty
                                                    value={postData.product_category}
                                                    onChange={categoryInputChange}
                                                    MenuProps={MenuProps}
                                                    >
                                                    <MenuItem disabled value="">
                                                        <em>Select Product Category</em>
                                                    </MenuItem>
                                                    {categories.map(singleCategory =>(
                                                        <MenuItem key={singleCategory.id} id={singleCategory.id} value={singleCategory.label}>{singleCategory.label}</MenuItem>
                                                        // id={singleCategory.id}
                                                    ))}
                                                    </Select>

                                                    {validationError.productCategory ? <span className="error">Please select product category</span> : null}
                                                </FormControl>
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="inputProductType" className="form-label">Product Sub Categories</label>
                                                <FormControl sx={{ width: '100%' }}>
                                                    <Select
                                                    multiple
                                                    name="product_sub_category"
                                                    value={postData.product_subCategory}
                                                    onChange={subCategoryInputChange}
                                                    MenuProps={MenuProps}
                                                    >
                                                        {subCategories.length > 0 ? subCategories.map(singleCategory =>(
                                                            <MenuItem key={singleCategory.id} id={singleCategory.id} value={singleCategory.value}>{singleCategory.label}</MenuItem>
                                                        )) : <MenuItem disabled>No Record Found</MenuItem>}
                                                    </Select>
                                                    {validationError.productSubCategory ? <span className="error">Please select product sub categories</span> : null}
                                                </FormControl>
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="inputVendor" className="form-label">Brand</label>
                                                <FormControl sx={{ width: '100%' }}>
                                                    <Select name='brand' onChange={handleInputChange} value={postData.brand} >
                                                        {brands.map(singleBrand =>(
                                                            <MenuItem key={singleBrand.id} value={singleBrand.value}>{singleBrand.label}</MenuItem>
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

export default withNavigate(AddProduct);