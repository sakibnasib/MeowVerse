import React from 'react';
import HeroSection from '../Components/Home/HeroSection';
import DailyMeowSection from '../Components/Home/DailyMeowSection';
import CatCareTipsSection from '../Components/Home/CatCareTipsSection';
import TestimonialsSection from '../Components/Home/Testimonials';

const Home = () => {
    return (
        <div>
           <HeroSection/>
           <DailyMeowSection/>
           <CatCareTipsSection/>
           <TestimonialsSection/>
        </div>
    );
};

export default Home;