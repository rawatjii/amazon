import React from "react"
import Navbar from '../Components/Navbar/Navbar'
import HeroSlider from '../Containers/HeroSlider/HeroSlider'
import MainProducts from '../Containers/MainProducts/MainProducts';

const Home = ()=>{
    return(
        <>
            <Navbar />
            <HeroSlider />
            <MainProducts />
        </>
    )
}

export default Home