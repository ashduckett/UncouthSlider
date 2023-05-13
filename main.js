import Slider from './slider.js';
document.addEventListener('DOMContentLoaded', () => {
    const slider = new Slider({
        responsive: [
            {
                queryWidth: 1200,
                noOfSlidesToShow: 3
            },
            {
                queryWidth: 900,
                noOfSlidesToShow: 1
            }]
    });
    
    slider.render(document.querySelector('.slider'))

});