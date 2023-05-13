function Slider(options) {
    this.noOfSlides = null;
    this.slider = null;
    this.originalNoOfSlidesToShow = 2;
    this.noOfSlidesToShow = 2;
    this.slides = [];
    this.prevButton = null;
    this.nextButton = null;
    this.firstSlideToShow = 0;
    this.container = null;
    this.options = options ? options : null;
    this.shiftCount = 1;

};

Slider.prototype.events = function() {
    this.prevButton.addEventListener('click', e => {
        e.preventDefault();
        this.prev();
    });

    this.nextButton.addEventListener('click', e => {
        e.preventDefault();
        this.next();
    });

    window.addEventListener('resize', e => {
        const width = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth;
        let noOfSlides = 0;

        if (this.options.responsive) {
            for (let i = 0; i < this.options.responsive.length; i++) {
                if (width <= this.options.responsive[i].queryWidth) {
                    noOfSlides = this.options.responsive[i].noOfSlidesToShow;
                } 
            }
            
            if (noOfSlides > 0 && noOfSlides !== this.noOfSlidesToShow) {
                this.noOfSlidesToShow = noOfSlides;
                this.switchNoOfSlides(this.noOfSlidesToShow)
            } else {
                if (noOfSlides == 0 && this.originalNoOfSlidesToShow !== this.noOfSlidesToShow) {
                    this.noOfSlidesToShow = this.originalNoOfSlidesToShow;
                    this.switchNoOfSlides(this.noOfSlidesToShow)        
                }
            }
        } 
    });
};

Slider.prototype.prev = function() {
    
    this.slider.classList.add('slider-container-transition');

    
    this.slider.style.transform = 'translateX(0)';

    document.querySelector('.slider').ontransitionend = () => {
        
        this.slider.classList.remove('slider-container-transition');
            
        // Shift the slider back
        const minusValueToShiftBack = -((100 / this.noOfSlidesToShow) * this.shiftCount) + '%';
        console.log(minusValueToShiftBack)
        document.querySelector('.slider').style.transform = 'translateX(' + minusValueToShiftBack + ')';

        // So now we have a value that is between 0 and 3. So.
        const slidesCopy = [...this.slides];
        
        for (let i = 0; i < this.shiftCount; i++) {
            this.slides[i] = slidesCopy[this.slides.length - (this.shiftCount - i)];
            this.slides[i].style.order = (i + 1);
        }
        
        for (let i = this.shiftCount; i < this.slides.length; i++) {
            this.slides[i] = slidesCopy[i - this.shiftCount];
            this.slides[i].style.order = i + 1;
        }
    
        this.firstSlideToShow -= this.noOfSlidesToShow;
    };
};

Slider.prototype.switchNoOfSlides = function(noOfSlides) {
    // console.log('Switching number of slides to ' + noOfSlides);

    // So now we can select which index to show first for the initial render.
    // What happens now? Here I want to output the current first slide.
    // Why not just keep track of this.firstSlideToShow?

    this.noOfSlidesToShow = noOfSlides;
    // this.firstSlideToShow = 0;
    this.render(this.container);
    


};

Slider.prototype.next = function() {
    
    this.slider.classList.add('slider-container-transition');


    const minusValueToShiftBack = -((100 / this.noOfSlidesToShow) * this.shiftCount);

    this.slider.style.transform = 'translateX(' + minusValueToShiftBack * 2 + '%)';


    document.querySelector('.slider').ontransitionend = () => {
        
        this.slider.classList.remove('slider-container-transition');
            
        // Shift the slider back
        
        this.slider.style.transform = 'translateX(' + minusValueToShiftBack + '%)';

        const slidesCopy = [...this.slides];

        


        
        for (let i = 0; i < this.shiftCount; i++) {
            this.slides[this.slides.length - (this.shiftCount - i)] = slidesCopy[i];
            this.slides[this.slides.length - (this.shiftCount - i)].style.order = this.slides.length - i;
        }

        for (let i = 0; i < this.slides.length - this.shiftCount; i++) {
            this.slides[i] = slidesCopy[i + this.shiftCount];
            this.slides[i].style.order = i + 1;
        }

        // Increment firstSlideToShow
        this.firstSlideToShow += this.noOfSlidesToShow;
    };
};

Slider.prototype.render = function(el) {
    this.slides = Array.from(document.querySelectorAll('.slide'));
    this.noOfSlides = this.slides.length;
    el.innerHTML = '';
    this.container = el;
    this.slider = document.querySelector('.slider');

    for (let i = 0; i < this.slides.length; i++) {
        const width = `${100 / this.noOfSlidesToShow}%`;
        this.slides[i].style.width = width;
    }
    
    let slidesCopy = [...this.slides];
    slidesCopy = this.slides.slice(this.firstSlideToShow).concat(this.slides.slice(0, this.firstSlideToShow));

    console.log(this.slides);

    
    // Here we are reordering the slides so that there are the same number to the left of the offscreen area as there are being displayed.
    // I should be able to change this to just be 1
    // This part can easily be changed.
    for (let i = 0; i < this.shiftCount; i++) {
        this.slides[i] = slidesCopy[this.slides.length - (this.shiftCount - i)];
        this.slides[i].style.order = i + 1;
    }

    // Here we are arranging the one showing and the others to have an order
    for (let i = this.shiftCount; i < this.slides.length; i++) {
        this.slides[i] = slidesCopy[i - this.shiftCount];
        this.slides[i].style.order = i + 1;
    }

    for (let i = 0; i < this.slides.length; i++) {
        el.appendChild(this.slides[i]);
    }

    const container = document.querySelector('.slider-container');

    this.prevButton = document.createElement('a');
    this.prevButton.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
    this.prevButton.href = '#';
    this.prevButton.classList.add('prev-button');

    container.appendChild(this.prevButton)

    this.nextButton = document.createElement('a');
    this.nextButton.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
    this.nextButton.href = '#';
    this.nextButton.classList.add('next-button');

    container.appendChild(this.nextButton)
    this.events();

    const minusValueToShiftBack = -(100 / this.noOfSlidesToShow) * this.shiftCount + '%';
    console.log(minusValueToShiftBack)
    document.querySelector('.slider').style.transform = 'translateX(' + minusValueToShiftBack + ')';
};

export default Slider;