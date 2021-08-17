import React from 'react';

export default function FooterNav(): React.ReactElement {
  return (
    <nav>
      <ul>
        <li className="hide-on-mobile">
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
  );
}
