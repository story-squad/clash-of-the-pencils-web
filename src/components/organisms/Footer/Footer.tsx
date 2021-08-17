import React from 'react';
import './footer.scss';

export default function Footer(): React.ReactElement {
  return (
    <footer id="main-footer">
      <p>&#169;2021 Story Squad HQ</p>
      <nav>
        <ul>
          <li>
            <a>Products</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
          <li>
            <a>Privacy</a>
          </li>
          <li>
            <a>Terms</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
