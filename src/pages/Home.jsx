import React from 'react'
import "./Home.css";
import CarouselSection from '../components/CarouselSection.jsx';

// import "./CarouselSection.css";
// import "./Carousel"
function Home() {
  return (
    <div className='home'>
      <h1>Services I 
        offer<span>...</span>
      </h1>
    <CarouselSection/>
            {/* <CarouselSection /> */}
    </div>
  )
}

export default Home
