import React, {useState, useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import { useSelector } from "react-redux";
import Navbar from "../../Components/Navbar/Navbar";
import { Rating } from 'react-simple-star-rating'
import axios from '../../axios';
import { ToastContainer, toast } from 'react-toastify';
import { withNavigate } from '../../Components/hoc/withNavigate/withNavigate';
import { uploadCloudinary } from '../../upload';
import { updateProduct } from '../../firebase-config';

const CreateReview = (props)=>{
    const [filteredData, setFilteredData] = useState({});
    const [ratings, setRatings] = useState({
        overall:0,
        batteryLife:0,
        valueForMoney:0,
        chargingPower:0,
    })
    const [reviews, setReviews] = useState({
        headline:'',
        photo:'',
        review:'',
    })

    const notify = (msg) => toast(msg);

    const {productId} = useParams();

    const headlineInput = useRef('')
    const ReviewInput = useRef('');
    const reviewImage = useRef('')

    const allProducts = useSelector((state)=>{
        return state.products.allProducts;
    })

    useEffect(() => {
        allProducts.filter(data=>{
            if(data.id === productId){
                setFilteredData(data);
            }
        })
    }, [allProducts, filteredData]);

    // Catch Rating value
    const overallHandleRating = (value) => {
        setRatings({...ratings, ['overall']:value})
    }

    const batteryHandleRating = (value) => {
        setRatings({...ratings, ['batteryLife']:value})
    }

    const moneyHandleRating = (value) => {
        setRatings({...ratings, ['valueForMoney']:value})
    }

    const chargingHandleRating = (value) => {
        setRatings({...ratings, ['chargingPower']:value})
    }


    const handleReset = (e)=>{
        // setRatings(0)
        setRatings({...ratings, [e.target.name]:0})
    }

    const onReviewSubmit = async (e)=>{
        e.preventDefault();
        var formData = {};

        try{
            const res = await uploadCloudinary(reviewImage.current.files[0]);

            formData = {
                ...ratings,
                headline:headlineInput.current.value,
                review:ReviewInput.current.value,
                reviewImage:res.url
            };

            // console.log('productId',productId);
            await updateProduct('9317e88d-51d1-49d7-9a89-45995828740d', {
                productReview:formData
            })

            notify("Review Added Successfully");
            return props.navigate('/');
        }
        catch(err){
            notify("Review couldn't added. Error: " + err);
        }
        
    }

    return(
        <>
            <Navbar />
            <section className='create_review_section'>
                <div className="container">
                    <h4>Create Review</h4>
                    <div className="product">
                        <img src={filteredData?.images?.[0]?.url} alt="" width='100' />
                        <p>{filteredData?.product_title}</p>
                    </div>

                    <hr />

                    <div className="overall_rating">
                        <div className="heading">
                            <h5>Overall rating</h5>
                            {ratings.overall > 0 ? <button className='btn float-right' onClick={handleReset} name='overall'>Clear</button> : null}
                        </div>
                        <Rating
                            onClick={overallHandleRating}
                            // onPointerMove={overallRatingMove}
                            initialValue={ratings.overall}
                        />
                    </div>

                    <hr />

                    <h5>Rate features</h5>

                    <div className="single_review">
                        <label>Battery life</label>
                        <Rating
                            onClick={batteryHandleRating}
                            initialValue={ratings.batteryLife}
                        />
                        <span className='clear'>
                            {ratings.batteryLife > 0 ? <button className='btn float-right' onClick={handleReset} name='batteryLife'>Clear</button> : <button className='btn float-right'>x</button>}
                        </span>
                    </div>

                    <div className="single_review">
                        <label>Value for money</label>
                        <Rating
                            onClick={moneyHandleRating}
                            initialValue={ratings.valueForMoney}
                        />
                        <span className='clear'>
                            {ratings.valueForMoney > 0 ? <button className='btn float-right' onClick={handleReset} name='valueForMoney'>Clear</button> : <button className='btn float-right'>x</button>}
                        </span>
                    </div>

                    <div className="single_review">
                        <label>Charging power</label>
                        <Rating
                            onClick={chargingHandleRating}
                            initialValue={ratings.chargingPower}
                        />
                        <span className='clear'>
                            {ratings.chargingPower > 0 ? <button className='btn float-right' onClick={handleReset} name='chargingPower'>Clear</button> : <button className='btn float-right'>x</button>}
                        </span>
                    </div>

                    <hr />

                    <h5>Add a headline</h5>
                    <input name='headline' className='form-control' placeholder="What's most important to know?" ref={headlineInput} />

                    <hr />

                    <h5>Add a photo</h5>
                    <small>Shoppers find images more helpful than text alone.</small>
                    <input name='headline' 
                    type="file"
                    className='form-control'
                    ref={reviewImage} />

                    <hr />

                    <h5>Add a written review</h5>
                    <textarea name="review" rows="5" className='form-control' placeholder='What did you like or dislike? What did you use this product for?' ref={ReviewInput} ></textarea>

                    <hr />

                    <button className='btn' onClick={onReviewSubmit}>Submit</button>
                </div>
            </section>
        </>
    )
}

export default withNavigate(CreateReview);