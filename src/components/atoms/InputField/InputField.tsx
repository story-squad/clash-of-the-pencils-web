import { classnames } from '@story-squad/react-utils';
import React, { useState } from 'react';
import { IInputFieldProps } from './InputField.model';
import './styles/index.scss';

const InputField = ({
  iconLeft,
  iconRight,
  variant,
  inputType = 'text',
  placeholder,
}: IInputFieldProps): React.ReactElement => {
  const [isFocused, setFocused] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const focus = () => setFocused(true);
  const unfocus = () => setFocused(false);
  const hover = () => setHovered(true);
  const unhover = () => setHovered(false);

  return (
    <div
      onMouseEnter={hover}
      onMouseLeave={unhover}
      className={classnames(
        'input-wrapper',
        variant,
        isHovered && 'hover',
        isFocused && 'focus',
      )}
    >
      {iconLeft}
      <input
        className="input"
        onFocus={focus}
        onBlur={unfocus}
        type={inputType}
        placeholder={placeholder}
      />
      {iconRight}
    </div>
  );
};

export default InputField;
