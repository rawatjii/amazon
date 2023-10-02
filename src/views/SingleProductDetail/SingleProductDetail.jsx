import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation, useParams, Link} from 'react-router-dom';
import Navbar from "../../Components/Navbar/Navbar";
import axios from "../../axios";
import ReactImageMagnify from 'react-image-magnify';
import { useSelector } from "react-redux";
import Footer from '../../Containers/Footer/Footer';
import styles from './SingleProductDetail.module.css'

const SingleProductDetail = (props)=>{
    
    const {productId} = useParams();
    const [filteredData, setFilteredData] = useState({});
    const [productImages, setProductImages] = useState([]);
    const [activeImage, setActiveImage] = useState();

    const refs = useRef([]);

    const addRefs = (el)=>{
        if(el && !refs.current.includes(el)){
            refs.current.push(el);
        }
    }

    const allProducts = useSelector((state)=>{
        return state.products.allProducts;
    })

    const hoverHandler = (imageUrl, i)=>{
        setActiveImage(imageUrl);
        refs.current[i].classList.add(styles.thumbnail_active);
        for(var j = 0; j < productImages.length; j++){
            if(i !== j){
                refs.current[j].classList.remove(styles.thumbnail_active);
            }
        }
    }

    useEffect(() => {
        allProducts.filter(data=>{
            if(data.id === productId){
                setFilteredData(data);
            }
        })
        setProductImages(filteredData.images)
        setActiveImage(filteredData.images?.[0]?.url)
        console.log('data',productImages);
    }, [allProducts, filteredData, productImages])
    

    return(
        <>
            <Navbar />
            <div className="totalResult">
                <p className="">{filteredData.length} results</p>
            </div>

            <div className={styles.top_content}>
                <div className="row">
                    <div className="col-md-4 image_col">
                        <div className={styles.image_carousel}>
                            <div className={styles.thumbnails}>
                                {productImages?.map((image, i)=>{
                                    return <div className={i == 0 ? styles.img_wrap + ' ' + styles.thumbnail_active : styles.img_wrap} key={i} onMouseOver={()=>hoverHandler(image.url, i)} ref={addRefs}>
                                        <img src={image.url} alt="" className="img-fluid" />
                                    </div>
                                })}
                            </div>
                            <div className="mainImage">
                                <ReactImageMagnify {...{
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        isFluidWidth: true,
                                        src: activeImage
                                    },
                                    largeImage: {
                                        src: activeImage,
                                        width: 1200,
                                        height: 1800
                                    }
                                }} />
                                {/* <img src={activeImage} alt="" className="img-fluid" /> */}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-8 content_col">
                        <h4 className="product_name">{filteredData.product_title}</h4>
                        <Link to={`${process.env.REACT_APP_BASE_URL}create-review/${filteredData.id}`}>Create Review</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SingleProductDetail;