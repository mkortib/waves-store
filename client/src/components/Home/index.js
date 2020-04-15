import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';

class Home extends Component {
    render() {
        return (
            <div className="">
                <HomeSlider />
                <HomePromotion />
            </div>
        );
    }
}

export default Home;
