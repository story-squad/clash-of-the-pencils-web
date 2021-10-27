import { ErrorMessage } from '@hookform/error-message';
import { classnames } from '@story-squad/react-utils';
import React from 'react';
import './styles/index.scss';

export interface CheckboxProps
  extends Omit<
    React.HTMLProps<HTMLInputElement>,
    'ref' | 'defaultValue' | 'label' | 'name'
  > {
  name: string;
  innerRef?: React.LegacyRef<HTMLInputElement>;
  label?: React.ReactNode;
  containerProps?: React.HTMLProps<HTMLDivElement>;
}

export default function Checkbox({
  containerProps: { className, ...containerProps } = {},
  innerRef,
  label,
  ...inputProps
}: CheckboxProps): React.ReactElement {
  return (
    <div
      className={classnames('checkbox-container', className)}
      {...containerProps}
    >
      <div className="checkbox">
        <input
          type="checkbox"
          id={inputProps.name}
          ref={innerRef}
          {...inputProps}
        />
        {label && (
          <label htmlFor={inputProps.id ?? inputProps.name}>{label}</label>
        )}
      </div>
      <ErrorMessage
        name={inputProps.name}
        render={({ message }) => (
          <div className="message error-message">{message}</div>
        )}
      />
    </div>
  );
}
