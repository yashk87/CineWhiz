import React from 'react'
import Slider from 'react-slick'
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function ImageSlider() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true


    }
    return (
        <Carousel {...settings}>

            <Wrap>

                <img src="/images/slider-badging.jpg" />

            </Wrap>
            <Wrap>

                <img src="/images/slider-badag.jpg" />

            </Wrap>
            <Wrap>

                <img src="/images/slider-scale.jpg" />

            </Wrap>
            <Wrap>

                <img src="/images/slider-scales.jpg" />

            </Wrap>

        </Carousel>
    )
}

export default ImageSlider


const Wrap = styled.div`
curson:pointer;
img{
    width:100%;
    border:4px solid transparent;
    height:100%;
    border-radius:4px;
    box-shadow:rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    transition-duration:300ms;

    &:hover{
        border:4px solid rgba(249, 249, 249, 0.8);
    }

}

`

const Carousel = styled(Slider)`
margin-top:20px;

ul li button{
    &:before{
        font-size:10px;
        color:rbg(150, 158, 171);

    }
}

li.slick-active button:before{
    color:white;
}


.slick-list{
    overflow:visible;
}


button{
    z-index:1;
}



`