import { Component } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Container from '@mui/material/Container';
import Image from "../../Components/Image/Image";
import banner1 from '../../assets/banners/banner1.jpg'
import banner2 from '../../assets/banners/banner2.jpg'
import banner3 from '../../assets/banners/banner3.jpg'
import 'swiper/css';
import 'swiper/css/navigation';
import './HeroSlider.css'

class HeroSlider extends Component{
    render(){
        return(
            <Container maxWidth='xl'>
                <Swiper
                    modules={[Navigation, Scrollbar]}
                    spaceBetween={50}
                    slidesPerView={1}
                    allowTouchMove={false}
                    loop={true}
                    navigation
                    scrollbar={{ draggable: false }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    <SwiperSlide>
                        <Image src={banner1} className="w-100" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={banner2} className="w-100" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image src={banner3} className="w-100" />
                    </SwiperSlide>
                </Swiper> 
            </Container>
        )
    }
}

export default HeroSlider