# Uncouth Slider

A website slider with various options. Not quite currently finished as the options are hardcoded but this will come as it'll just be a case of passing in variables to the constructor instead of hardcoding them in there.

This slider works by having a flexbox to contain your slides and around that a container that has its overflow set to hidden. It extends beyond the screen in both directions and is then shifted for the sliding animation as a whole. I opted for this since previous sliders I've made had the individual images animated individually but they could never quite get in sync.

## To Use
Create your HTML:

```
<div class="slider-container">
    <div class="slider">
        <div class="slide">
            <h2>Image</h2>
            <h3>Header 1</h3>
            <p>Some text</p>
        </div>
        <div class="slide">
            <h2>Image</h2>
            <h3>Header 2</h3>
            <p>Some text</p>
        </div>
        <div class="slide">
            <h2>Image</h2>
            <h3>Header 3</h3>
            <p>Some text</p>
        </div>
    </div>
</div>
```

Currently the container and inner divs have very generic names. This could change in the future but it works for me.

Make sure the CSS and JS files are included. It also uses Font Awesome. I'll have to consider ways to make this work more easily when adding to a project.

## Tweak The JavaScript

Rather than passing in arguments for your settings which would make sense, I'm writing this at a time when I'm ready to just use it and it's late and I'm tired. Hopefully I'll come back and edit this `README.md` file soon. However there are a few abilities that the slider has with one restriction: Due to the method used to create animation, you will always need to have the correct number of slides each side of the visible portion. This is dictated by however many slides you are animating by; if you animate by 3 slides at a time, you'll need 6 of them split between the offscreen areas to the right. This seems excessive, but if you want 5 slides, you want to show three at a time, but animate across by only 1 slide at a time, then you only need 5. This means to use this slider you will always need a minimum of three slides if animation is expected. Consideration will be given in the future to ways that this can be improved either by injecting new slides where necessary, but this works for me for now.

## Constraints

It is the coder's responsibility to ensure that the correct number of slides will sit either side of the visible area of the slider to allow the animation to work. If you have three visible slides then you'll need nine slides if you want to slide three slide's worth each time. If you only shift by one, only display one, then you'll still need a minimum of three.

## Abilities

### No. of Slides to Display

This is the `noOfSlidesToShow` variable and dictates how many slides will be shown on-screen at one time.

### Shift Count

This variable, `shiftCount` can be found in the constructor. It dictates the number of slides the slider will shift by at a time.

### Responsive Options

What can be passed to the constructor will change so that it's more developer-friendly, but this is all for now. You can pass in an options object with a `responsive` property. That can then contain an array of objects containing `queryWidth` and `noOfSlidesToShow` properties. These will allow the developer to change the number of slides displayed at particular screen sizes. Currently no sorting happens which would be the idea, so instead just make sure that the responsive options are added from highest width to lowest.

