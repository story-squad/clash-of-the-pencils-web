import React, { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';
import RenderCarousel from './RenderCarousel';

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
  const setNum = (num: number) => setCurrent(num);

  const circles = (): React.ReactNode => {
    const circles = [...new Array(numItems)].map((x, i) => {
      if (i === current)
        return (
          <FaCircle key={i} className="active" onClick={() => setNum(i)} />
        );
      else return <FaCircle key={i} onClick={() => setNum(i)} />;
    });
    return <>{circles.map((c) => c)}</>;
  };

  useEffect(() => {
    // This useEffect is cOOL because it resets the timer to 0 if you manually change
    // the current card, and it won't mess up timings with overlapping changes.
    const goNextHandler = setTimeout(next, 4000);
    return () => clearTimeout(goNextHandler);
  }, [current]);

  return (
    <RenderCarousel
      {...{ children, circles, getClassName, next, prev, numItems }}
    />
  );
};

interface CarouselProps {
  title: string;
}

export default CarouselContainer;
