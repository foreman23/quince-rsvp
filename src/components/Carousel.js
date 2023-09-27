import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'
import EmblaCarousel from 'embla-carousel'


import { Image } from 'semantic-ui-react';

function Carousel() {


    const options = { loop: true, skipSnaps: true }

    const [emblaRef] = useEmblaCarousel(options, [Autoplay({ delay: 4000 })])


    return (
        <div className="embla" ref={emblaRef}>
            <div className="embla__container">
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/b&w/1.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/b&w/2.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/b&w/3.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/b&w/4.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/b&w/5.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/b&w/6.webp' /></div>
                <div className="embla__slide"><Image className='MainImage' circular size='medium' src='./portraits/b&w/7.webp' /></div>
            </div>
        </div>
    )
}

export default Carousel