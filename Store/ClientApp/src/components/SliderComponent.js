import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderComponent.css';

const SliderComponent = ({ images }) => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className="image-slider">
            <Slider {...sliderSettings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img src={image}/>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SliderComponent;
    