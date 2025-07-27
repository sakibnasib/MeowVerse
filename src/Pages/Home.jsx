import React from 'react';
import HeroSection from '../Components/Home/HeroSection';
import DailyMeowSection from '../Components/Home/DailyMeowSection';
import CatCareTipsSection from '../Components/Home/CatCareTipsSection';
import TestimonialsSection from '../Components/Home/Testimonials';
import CatGallery from '../Components/Home/CatGallery';

const Home = () => {
    return (
        <div>
           <HeroSection/>
           <div className="w-11/12 mx-auto">
            <DailyMeowSection/>
           <CatGallery/>
           <CatCareTipsSection/>
           <TestimonialsSection/>
           </div>
          
        </div>
    );
};

export default Home;