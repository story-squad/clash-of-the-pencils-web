import React, { useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const CarouselContainer = ({
  children,
}: React.PropsWithChildren<CarouselProps>): React.ReactElement => {
  const [numItems] = useState(Array.isArray(children) ? children.length : 0);
  const [current, setCurrent] = useState(0);

  const getClassName = (ind: number): 'prev' | 'show' | 'next' | 'hide' => {
    if (ind === current) return 'show';
    else if (ind === current - 1 || (current === 0 && ind === numItems - 1))
      return 'prev';
    else if (ind === current + 1 || (current === numItems - 1 && ind === 0))
      return 'next';
    else return 'hide';
  };

  const next = () => setCurrent((cur) => (cur === numItems - 1 ? 0 : cur + 1));
  const prev = () => setCurrent((cur) => (cur === 0 ? numItems - 1 : cur - 1));

  return (
    <div className="carousel">
      <div className="carousel-main">
        <div className="left">
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
        <div className="right">
          <MdKeyboardArrowRight />
        </div>
      </div>
      <div className="arrows">
        <button onClick={prev}>Prev</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

interface CarouselProps {
  title: string;
}

export default CarouselContainer;
