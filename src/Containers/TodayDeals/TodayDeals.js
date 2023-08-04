import { Component } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Image from "../../Components/Image/Image";
import axios from '../../axios'
import Loader from "../../Components/UI/Loader/Loader";
import './TodayDeals.css'

class TodayDeals extends Component{
    state={
        loading:true,
        allProducts:[],
    }

    componentDidMount(){
        axios.get('/products.json')
        .then(res=>{
            const allProductsArray = [];
            const allProductsData = res.data;
            Object.entries(allProductsData).map((value, key)=>{
                allProductsArray.push(value[1])
            })
            this.setState({allProducts:allProductsArray, loading:false})
            console.log(this.state.allProducts);
            // this.setState({allProducts:[...allProductsData]})

            // for(const [key, value] of Object.entries(allProductsData)){
            //     // for(const [key1, value1] of Object.entries(value)){
            //     //     productObject={key1, value1}
            //     // }
            //     allProductsArray.push({value})
            //     console.log(allProductsArray);
            // }
            // Object.keys(allProductsData).map((key)=>{
            //     allProductsArray.push({key})
            //     console.log(allProductsArray);
            // })
            // console.log('testing', allProductsData);
        })
    }

    render(){
        return(
            <div className="card today_deals">
                <div className="heading_row">
                    <h3 className="title">Today's Deals</h3>
                    <a href="#" className="">See all deals</a>
                </div>
                
                {this.state.loading ? <Loader/> :  (
                    this.state.allProducts.length > 0 ? (
                        <Swiper
                            modules={[Navigation, Scrollbar]}
                            spaceBetween={15}
                            slidesPerView={5}
                            allowTouchMove={false}
                            loop={true}
                            navigation
                            scrollbar={{ draggable: false }}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                        {this.state.allProducts.map((item, index)=>{
                            return <SwiperSlide key={index}>
                                <div className="single_product">
                                    <div className="thumbnail">
                                        <Image src={item.images.image1} className="w-100" />
                                    </div>
                                    <div className="details">
                                        <p className="deals">
                                            <span className="deal">Up to {item.price.discount}% off</span>
                                            <span className="text">Deal of the Day</span>
                                        </p>
                                        <p className="name">{item.name}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })}
                        
                    </Swiper> 
                    ) : null
                )}
                
                
                {/* {this.state.allProducts ? 'testing working':'testing not working'} */}

                
                
            </div>
        )
    }
}

export default TodayDeals;