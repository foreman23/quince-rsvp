import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'

import { Image } from 'semantic-ui-react';

function Carousel() {


    const options = { loop: true, skipSnaps: true }

    const [emblaRef] = useEmblaCarousel(options, [Autoplay({ delay: 4000 })])


    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/1.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/2.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/3.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/4.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/5.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/6.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/7.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/8.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/9.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/10.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/11.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/12.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/13.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/14.webp' /></div>
            </div>
        </div>
    )
}

export default Carousel