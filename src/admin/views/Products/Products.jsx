import React, {useEffect} from 'react';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { fetchProducts } from '../../../store/reducers/productsReducer';

const Products = ()=>{

    const dispatch = useDispatch();

    const [allProducts, setAllProducts] = useState([])

    const fetchAllProducts = useSelector((state)=>{
        return state.products.allProducts
    })

    useEffect(()=>{
        setAllProducts(fetchAllProducts)

    }, [fetchAllProducts])

    console.log('allProducts',allProducts);


    return(
        <>
            <Sidebar />
            <Header />

            <div className="page-wrapper">
                <div className="page-content">

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-lg-3 col-xl-2">
                                            <a href="ecommerce-add-new-products.html" className="btn btn-primary mb-3 mb-lg-0"><i className='bx bxs-plus-square'></i>New Product</a>
                                        </div>
                                        <div className="col-lg-9 col-xl-10">
                                            <form className="float-lg-end">
                                                <div className="row row-cols-lg-2 row-cols-xl-auto g-2">
                                                    <div className="col">
                                                        <div className="position-relative">
                                                            <input type="text" className="form-control ps-5" placeholder="Search Product..." /> <span className="position-absolute top-50 product-show translate-middle-y"><i className="bx bx-search"></i></span>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                                            <button type="button" className="btn btn-white">Sort By</button>
                                                            <div className="btn-group" role="group">
                                                            <button id="btnGroupDrop1" type="button" className="btn btn-white dropdown-toggle dropdown-toggle-nocaret px-1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className='bx bx-chevron-down'></i>
                                                            </button>
                                                            <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                                <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                                                <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                                            </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
                                                            <button type="button" className="btn btn-white">Collection Type</button>
                                                            <div className="btn-group" role="group">
                                                            <button id="btnGroupDrop1" type="button" className="btn btn-white dropdown-toggle dropdown-toggle-nocaret px-1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className='bx bxs-category'></i>
                                                            </button>
                                                            <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                                <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                                                <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                                            </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="btn-group" role="group">
                                                            <button type="button" className="btn btn-white">Price Range</button>
                                                            <div className="btn-group" role="group">
                                                            <button id="btnGroupDrop1" type="button" className="btn btn-white dropdown-toggle dropdown-toggle-nocaret px-1" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <i className='bx bx-slider'></i>
                                                            </button>
                                                            <ul className="dropdown-menu dropdown-menu-start" aria-labelledby="btnGroupDrop1">
                                                                <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                                                <li><a className="dropdown-item" href="#">Dropdown link</a></li>
                                                            </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid">

                        {
                            allProducts.map((singleProduct, index)=>{
                                return <div className="col" key={index}>
                                    <Link to={`/admin/view-product/${singleProduct.id}`}>
                                        <div className="card">
                                            <img src={singleProduct.images ? singleProduct.images?.[0].url : process.env.REACT_APP_NO_PRODUCT_IMAGE_URL} className="card-img-top" alt="..." />
                                            <div className="">
                                                <div className="position-absolute top-0 end-0 m-3 product-discount"><span className="">-10%</span></div>
                                            </div>
                                            <div className="card-body">
                                                <h6 className="card-title cursor-pointer">{singleProduct.product_title}</h6>
                                                <div className="clearfix">
                                                    <p className="mb-0 float-start"><strong>0</strong> Sales</p>
                                                    <p className="mb-0 float-end fw-bold"><span className="me-2 text-decoration-line-through text-secondary">₹{singleProduct.price.originalPrice}</span><span>₹{singleProduct.price.offerPrice}</span></p>
                                                </div>
                                                <div className="d-flex align-items-center mt-3 fs-6">
                                                <div className="cursor-pointer">
                                                    <i className='bx bxs-star text-warning'></i>
                                                    <i className='bx bxs-star text-warning'></i>
                                                    <i className='bx bxs-star text-warning'></i>
                                                    <i className='bx bxs-star text-warning'></i>
                                                    <i className='bx bxs-star text-secondary'></i>
                                                </div>	
                                                <p className="mb-0 ms-auto">4.2(182)</p>
                                                {/* <Link to={`/admin/edit-product/${singleProduct.id}`}>Edit</Link> */}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            })

                        }

                        
                        

                    </div>


                </div>
            </div>
        </>
    )
}

export default Products;