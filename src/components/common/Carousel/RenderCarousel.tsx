import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { RenderCarouselProps } from './CarouselTypes';

const RenderCarousel = ({
  prev,
  numItems,
  children,
  getClassName,
  next,
  circles,
}: RenderCarouselProps): React.ReactElement => {
  return (
    <div className="carousel">
      <div className="carousel-main">
        <div className="left" onClick={prev} role="button">
          <MdKeyboardArrowLeft />
        </div>
        <div className="carousel-content">
          {numItems === 0 ? (
            <div className="carousel-card show">{children}</div>
          ) : (
            // We can coerce it to an array since we know it has length!
            (children as Array<React.ReactElement>).map<React.ReactElement>(
              (elem, i) => (
                <div key={i} className={`carousel-card ${getClassName(i)}`}>
                  {elem}
                </div>
              ),
            )
          )}
        </div>
        <div className="right" onClick={next} role="button">
          <MdKeyboardArrowRight />
        </div>
      </div>
      <div className="carousel-circles">{circles()}</div>
    </div>
  );
};

export default RenderCarousel;
