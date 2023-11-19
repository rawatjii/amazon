import React, {useEffect, useState, useRef} from "react";
import Select from 'react-select';
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllBrands } from "../../../firebase-config";
import styles from './product.module.css'

const ViewProduct = ()=>{

    const [currentProduct, setCurrentProduct] = useState({})
    const [brands, setBrands] = useState([]);
    const [activeImage, setActiveImage] = useState();

    const {productId} = useParams();
    const refs = useRef([]);

    const addRefs = (el)=>{
        if(el && !refs.current.includes(el)){
            refs.current.push(el);
        }
    }

    const hoverHandler = (imageUrl, i)=>{
        setActiveImage(imageUrl);
        refs.current[i].classList.add(styles.thumbnail_active);
        for(var j = 0; j < currentProduct.images.length; j++){
            if(i !== j){
                refs.current[j].classList.remove(styles.thumbnail_active);
            }
        }
    }

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


    useEffect(()=>{
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
        
        fetchBrandData();
        
    }, [])

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

                    </div>

                    <div className="card">
                        <div className="row g-0">
                        <div className="col-md-4 border-end">
                            <img src={activeImage ? activeImage : process.env.REACT_APP_NO_PRODUCT_IMAGE_URL} className="img-fluid" alt="..." />
                            <div className="row mb-3 row-cols-auto g-2 justify-content-center mt-3">
                                {currentProduct.images?.map((image, i)=>{
                                    return (
                                        <div className={`col ${i == 0 ? styles.thumbnail_active : ''}`} onMouseOver={()=>hoverHandler(image.url, i)} key={i} ref={addRefs}>
                                            <img src={image.url} width="70" className="border rounded cursor-pointer" alt="" />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h4 className="card-title">{currentProduct.product_title}</h4>
                                <div className="d-flex gap-3 py-3">
                                    <div className="cursor-pointer">
                                        <i className='bx bxs-star text-warning'></i>
                                        <i className='bx bxs-star text-warning'></i>
                                        <i className='bx bxs-star text-warning'></i>
                                        <i className='bx bxs-star text-warning'></i>
                                        <i className='bx bxs-star text-secondary'></i>
                                    </div>	
                                    <div>142 reviews</div>
                                    <div className="text-success"><i className='bx bxs-cart-alt align-middle'></i> 134 orders</div>
                                </div>

                                <div class="mb-3"> 
                                    <span class="price h4">₹{currentProduct.price.offerPrice}</span> 
                                    <span class="text-muted">₹{currentProduct.price.originalPrice}</span> 
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <label htmlFor="">Original Price</label>
                                            <input type="text" className="form-control me-2" value={`₹ ${currentProduct?.price?.originalPrice}`} />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group mb-2">
                                            <label htmlFor="">Offer Price</label>
                                            <input type="text" className="form-control me-2" value={`₹ ${currentProduct?.price?.offerPrice}`} />
                                        </div>
                                    </div>
                                </div>
                            
                            <p className="card-text fs-6">Virgil Abloh’s Off-White is a streetwear-inspired collection that continues to break away from the conventions of mainstream fashion. Made in Italy, these black and brown Odsy-1000 low-top sneakers.</p>
                            <dl className="row">
                                <dt className="col-sm-3">Brand</dt>
                                <dd className="col-sm-9">{currentProduct.brand ? currentProduct.brand : 'No Brand Selected'}</dd>

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

export default ViewProduct;

