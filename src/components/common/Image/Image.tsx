import React from 'react';

const Image = ({
  webp,
  src,
  alt,
  classes,
  width,
  height,
}: ImageProps): React.ReactElement => {
  return (
    <picture className={classes}>
      <source srcSet={webp} type="image/webp" />
      <img src={src} alt={alt} width={width} height={height} />
    </picture>
  );
};

export default Image;

interface ImageProps {
  webp: string;
  src: string;
  alt: string;
  classes?: string;
  width?: number;
  height?: number;
}
