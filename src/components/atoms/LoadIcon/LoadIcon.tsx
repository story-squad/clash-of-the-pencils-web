import React from 'react';
import { FiLoader } from 'react-icons/fi';
import './styles/index.scss';

export default function LoadIcon(): React.ReactElement {
  return <FiLoader className="load-icon-spinner" />;
}
