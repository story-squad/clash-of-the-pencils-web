import React from 'react';
import FooterNav from './FooterNav';
import NameAndPencil from './NameAndPencil';
import './styles/index.scss';

export default function Footer(): React.ReactElement {
  return (
    <footer id="main-footer">
      <div className="main-footer-container">
        <NameAndPencil />
        <FooterNav />
      </div>
    </footer>
  );
}
