import React from "react"
import Navbar from '../Components/Navbar/Navbar'
import HeroSlider from '../Containers/HeroSlider/HeroSlider'
import MainProducts from '../Containers/MainProducts/MainProducts';
import Footer from "../Containers/Footer/Footer";

const Home = ()=>{
    return(
        <>
            <Navbar />
            <HeroSlider />
            <MainProducts />
            <Footer />
        </>
    )
}

export default Home