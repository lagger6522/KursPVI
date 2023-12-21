import React, { Component } from 'react';
import SliderComponent from './SliderComponent';
import BestSellers from './BestSellers';
import './Home.css';

export class Home extends Component {
    static displayName = Home.name;


    

    render() {        
        const images = ['url-to-image-1', 'url-to-image-2', 'url-to-image-3'];

        return (
            <div>
                <SliderComponent images={images} />
                <BestSellers />
            </div>
        );
    }
}

export default Home;
