import React from 'react';

const TextWithImageCard = ({
  image,
  text,
}: ITextWithImage): React.ReactElement => {
  return (
    <div className="text-with-image">
      <h2>{text}</h2>
      <img src={image} />
    </div>
  );
};

interface ITextWithImage {
  text: string;
  image: string;
}

export default TextWithImageCard;
