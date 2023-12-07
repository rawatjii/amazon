import React, {useEffect, useState} from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Sidebar from "../../Components/Sidebar/Sidebar";
import FormControl from '@mui/material/FormControl';
import Header from "../../Components/Header/Header";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllBrands, getAllCategories, getCategoryById } from "../../../firebase-config";
import { uploadCloudinary } from "../../../upload";

const EditProducts = ()=>{

    const [productTitle, setProductTitle] = useState('');
    const [productImages, setProductImages] = useState([])
    const [currentProduct, setCurrentProduct] = useState({})
    const [originalPrice, setOriginalPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [productSubCategory, setProductSubCategory] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const {productId} = useParams();

    const allProducts = useSelector((state)=>{
        return state.products.allProducts;
    })

    useEffect(()=>{
        allProducts.filter(singleProduct=>{
            if(singleProduct.id === productId){
                setCurrentProduct(singleProduct)
            }
        })
    } , [allProducts]);

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
    }, [])

    // Set productTitle when currentProduct changes
    useEffect(() => {
        console.log('currentProduct',currentProduct);
        console.log('allCategories',allCategories);
        setProductTitle(currentProduct.product_title || ''); // Handle cases where product_title is undefined
        setProductImages(currentProduct.images);
        setOriginalPrice(currentProduct.price?.originalPrice);
        setOfferPrice(currentProduct.price?.offerPrice);
        setProductCategory(currentProduct.product_category);
        fetchProductCategories();
        fetchProductSubCategories(currentProduct.product_category)
    }, [currentProduct]);

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
            setAllCategories(allCategoriesArray)
        }catch(err){
            console.log(err);
        }
    }

    const fetchProductSubCategories = async(categoryName)=>{
        debugger;
        try{
            const allCategoryData = await getAllCategories();
            console.log('allCategoryData',allCategoryData);
            if(allCategoryData){
                    
                const categoryRowsData = Object.values(allCategoryData).map(data=>{
                    if(data.hasOwnProperty('subCategories')){
                        if(data.category === categoryName){
                            return Object.values(data.subCategories).map(category=>{
                                return {
                                    value:category.category.toLowerCase(),
                                    label:category.category,
                                    // id:category.id
                                }
                            })
                        }
                    }
                })
                console.log('categoryRowsData',categoryRowsData );
                setProductSubCategory(categoryRowsData)
            }
            else{
                setProductSubCategory([])
            }


            // const allCategoryData = await getAllCategories();
            // console.log('allCategoryData',allCategoryData);
            // if(allCategoryData){
            //     if(allCategoryData.hasOwnProperty('subCategories')){
			// 		const categoryRowsData = Object.values(allCategoryData.subCategories).map(category=>{
			// 			return {
            //                 value:[category.category.toLowerCase()],
            //                 label:category.category,
            //                 // id:category.id
            //             }
			// 		})
            //         console.log('categoryRowsData',categoryRowsData );
			// 		setProductSubCategory(categoryRowsData)
			// 	}
            //     else{
			// 		setProductSubCategory([])
			// 	}
            // }
        }catch(err){
            console.log(err);
        }
    }

    const titleChangeHandler = (e)=>{
        console.log('e',e.target.value  );
        setProductTitle(e.target.value)
    }

    const removeImageHandler = (publicId)=>{
        const filteredImages = productImages.filter(item=>{
            return item.publicId !== publicId;
        })
        // console.log('filteredImages',filteredImages);
        setProductImages(filteredImages)
    }

    const imageUploadHandler = async(e)=>{
        const selectedFiles = e.target.files
        console.log('imageE',e.target.files);

        let arr = [];
        const selectedImages = Object.values(selectedFiles);

        for(let i = 0; i < selectedImages.length; i++){
            const res = await uploadCloudinary(selectedImages[i]);
            arr.push(res);
            // setPostData({...postData, images:[...postData.images, res]});
        }

        setProductImages([
            ...productImages,
            ...arr
        ])

        e.target.value = null;
    }

    const originalPriceChangeHandler = (e)=>{
        setOriginalPrice(e.target.value)
    }

    const offerPriceChangeHandler = (e)=>{
        setOfferPrice(e.target.value)
    }

    const categoryChangeHandler = (e)=>{
        console.log('e.target',e.props);
        setProductCategory(e.target.value)
    }

    const subCategoryChangeHandler = (event)=>{
        const selectedValues = event.target.value;
        setProductSubCategory(selectedValues)
    }

    return(
        <>
            <Sidebar />
            <Header />

            <div className="page-wrapper">
                <div className="page-content">
                    <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                        <div className="breadcrumb-title pe-3">eCommerce</div>
                        <div className="ps-3">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb mb-0 p-0">
                                    <li className="breadcrumb-item"><a href="#"><i className="bx bx-home-alt"></i></a>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">Products Details</li>
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

                    <div className="card">
                            <div className="card-body">
                                <input type="text" value={currentProduct.id} className="form-control" hidden readOnly />

                                <div className="form-group mb-2">
                                    <label htmlFor="">Product Title</label>
                                    <input type="text" className="form-control" value={productTitle} onChange={titleChangeHandler} />
                                </div>

                                <div className="form-group mb-2">
                                    <label htmlFor="">Product Images</label>
                                    <input className="form-control" id="image-uploadify" type="file" accept="image/*" multiple onChange={imageUploadHandler} />
                                    <div className="previewImages mt-2 d-flex">
                                        {productImages?.map((item, index)=>(
                                            <div key={index} className="single_img">
                                                <img src={item.url} width={80} />
                                                <span className="delete" id={item.publicId} onClick={()=>removeImageHandler(item.publicId)} style={{height:'20px', width:'20px', display:'inline-flex', background:'red', color:'#fff', alignItems:'center', justifyContent:'center', cursor:'pointer'}}>&times;</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <label htmlFor="">Original Price</label>
                                            <input type="text" className="form-control me-2" value={`${originalPrice}`} onChange={originalPriceChangeHandler} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <label htmlFor="">Offer Price</label>
                                            <input type="text" className="form-control me-2" value={`${offerPrice}`} onChange={offerPriceChangeHandler} />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group mb-2">
                                    <label htmlFor="">Product Category</label>
                                    <FormControl sx={{ width: '100%' }}>
                                        <Select
                                            displayEmpty
                                            value={productCategory}
                                            defaultValue={null}
                                            onChange={categoryChangeHandler}
                                        >
                                            <MenuItem disabled value="">
                                                <em>Select Product Category</em>
                                            </MenuItem>
                                            {allCategories.map(singleCategory =>(
                                                <MenuItem key={singleCategory.id} id={singleCategory.id} value={singleCategory.label}>{singleCategory.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="form-group mb-2">
                                    <label htmlFor="inputProductType" className="form-label">Product Sub Categories</label>
                                    <FormControl sx={{ width: '100%' }}>
                                        <Select
                                            multiple
                                            name="product_sub_category"
                                            value={productSubCategory}
                                            onChange={subCategoryChangeHandler}
                                            >
                                            {productSubCategory.length > 0 ? productSubCategory.map(singleCategory =>(
                                                <MenuItem key={singleCategory.id} id={singleCategory.id} value={singleCategory.value}>{singleCategory.label}</MenuItem>
                                            )) : <MenuItem disabled>No Record Found</MenuItem>}
                                        </Select>
                                </FormControl>
                            </div>

                                <div className="form-group mb-2">

                                    <label htmlFor="">Brands</label>
                                    <Select
                                        defaultValue={null}
                                        options={brands}
                                    />
                                </div>
                            
                            <p className="card-text fs-6">Virgil Abloh’s Off-White is a streetwear-inspired collection that continues to break away from the conventions of mainstream fashion. Made in Italy, these black and brown Odsy-1000 low-top sneakers.</p>
                            <dl className="row">
                                <dt className="col-sm-3">Model#</dt>
                                <dd className="col-sm-9">Odsy-1000</dd>
                            
                                <dt className="col-sm-3">Color</dt>
                                <dd className="col-sm-9">Brown</dd>
                            
                                <dt className="col-sm-3">Delivery</dt>
                                <dd className="col-sm-9">Russia, USA, and Europe </dd>
                            </dl>
                            <hr />
                            <div className="row row-cols-auto row-cols-1 row-cols-md-3 align-items-center">
                                <div className="col">
                                    <label className="form-label">Quantity</label>
                                    <div className="input-group input-spinner">
                                        <button className="btn btn-white" type="button" id="button-plus"> + </button>
                                        <input type="text" className="form-control" value="1" readOnly />
                                        <button className="btn btn-white" type="button" id="button-minus"> − </button>
                                    </div>
                                </div> 
                                <div className="col">
                                        <label className="form-label">Select size</label>
                                        <div className="">
                                            <label className="form-check form-check-inline">
                                            <input type="radio" className="form-check-input custom-control-input"  name="select_size"  />
                                            <div className="form-check-label">Small</div>
                                            </label>
                                            <label className="form-check form-check-inline">
                                                <input type="radio" className="form-check-input custom-control-input"  name="select_size"  />
                                                <div className="form-check-label">Medium</div>
                                            </label>

                                            <label className="form-check form-check-inline">
                                                <input type="radio" className="form-check-input custom-control-input"   name="select_size"  />
                                                <div className="form-check-label">Large</div>
                                            </label>
                                        </div>
                                </div> 
                                <div className="col">
                                    <label className="form-label">Select Color</label>
                                    <div className="color-indigators d-flex align-items-center gap-2">
                                        <div className="color-indigator-item bg-primary"></div> 
                                        <div className="color-indigator-item bg-danger"></div> 
                                        <div className="color-indigator-item bg-success"></div> 
                                        <div className="color-indigator-item bg-warning"></div> 
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex gap-3 mt-3">
                                <a href="#" className="btn btn-primary">Buy Now</a>
                                <a href="#" className="btn btn-outline-primary"><span className="text">Add to cart</span> <i className='bx bxs-cart-alt'></i></a>
                            </div>
                            </div>
                        <hr/>
                        <div className="card-body">
                            <ul className="nav nav-tabs nav-primary mb-0" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" data-bs-toggle="tab" href="#primaryhome" role="tab" aria-selected="true">
                                        <div className="d-flex align-items-center">
                                            <div className="tab-icon"><i className='bx bx-comment-detail font-18 me-1'></i>
                                            </div>
                                            <div className="tab-title"> Product Description </div>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" data-bs-toggle="tab" href="#primaryprofile" role="tab" aria-selected="false">
                                        <div className="d-flex align-items-center">
                                            <div className="tab-icon"><i className='bx bx-bookmark-alt font-18 me-1'></i>
                                            </div>
                                            <div className="tab-title">Tags</div>
                                        </div>
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" data-bs-toggle="tab" href="#primarycontact" role="tab" aria-selected="false">
                                        <div className="d-flex align-items-center">
                                            <div className="tab-icon"><i className='bx bx-star font-18 me-1'></i>
                                            </div>
                                            <div className="tab-title">Reviews</div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content pt-3">
                                <div className="tab-pane fade show active" id="primaryhome" role="tabpanel">
                                    <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi.</p>
                                    <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi.</p>
                                </div>
                                <div className="tab-pane fade" id="primaryprofile" role="tabpanel">
                                    <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
                                </div>
                                <div className="tab-pane fade" id="primarycontact" role="tabpanel">
                                    <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.</p>
                                </div>
                            </div>
                        </div>

                    </div>


                        <h6 className="text-uppercase mb-0">Related Product</h6>
                        <hr/>
                        <div className="row row-cols-1 row-cols-lg-3">
                            <div className="col">
                                <div className="card">
                                    <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="assets/images/products/16.html" className="img-fluid" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                        <h6 className="card-title">Light Grey Headphone</h6>
                                        <div className="cursor-pointer my-2">
                                            <i className="bx bxs-star text-warning"></i>
                                            <i className="bx bxs-star text-warning"></i>
                                            <i className="bx bxs-star text-warning"></i>
                                            <i className="bx bxs-star text-warning"></i>
                                            <i className="bx bxs-star text-secondary"></i>
                                        </div>
                                        <div className="clearfix">
                                            <p className="mb-0 float-start fw-bold"><span className="me-2 text-decoration-line-through text-secondary">$240</span><span>$199</span></p>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="assets/images/products/17.png" className="img-fluid" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                        <h6 className="card-title">Black Cover iPhone 8</h6>
                                        <div className="cursor-pointer my-2">
                                            <i className="bx bxs-star text-warning"></i>
                                            <i className="bx bxs-star text-warning"></i>
                                            <i className="bx bxs-star text-warning"></i>
                                            <i className="bx bxs-star text-warning"></i>
                                            <i className="bx bxs-star text-warning"></i>
                                        </div>
                                        <div className="clearfix">
                                            <p className="mb-0 float-start fw-bold"><span className="me-2 text-decoration-line-through text-secondary">$179</span><span>$110</span></p>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card">
                                    <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src="assets/images/products/19.png" className="img-fluid" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                        <h6 className="card-title">Men Hand Watch</h6>
                                        <div className="cursor-pointer my-2">
                                            <i className="bx bxs-star text-warning"></i>
                                            <i className="bx bxs-star text-warning"></i>
                                            <i className="bx bxs-star text-warning"></i>
                                            <i className="bx bxs-star text-secondary"></i>
                                            <i className="bx bxs-star text-secondary"></i>
                                        </div>
                                        <div className="clearfix">
                                            <p className="mb-0 float-start fw-bold"><span className="me-2 text-decoration-line-through text-secondary">$150</span><span>$120</span></p>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    
                </div>
            </div>
        </>
    )
}

export default EditProducts;

