'use client'
import Slider from 'react-slick';
import styled from 'styled-components';

export const StyledSlider=styled(Slider)`
height: 100%;
width: 100%;
.slick-list{
    display: flex;
}
.slick-track{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 42px;
}
.slick-prev{
    left:6px;
    z-index: 1;
}
.slick-next{
    right: 6px;
    z-index: 1;
}
`;