import React from 'react';

export default function FooterNav(): React.ReactElement {
  return (
    <nav>
      <ul>
        <li>
          <a>Contact</a>
        </li>
        <li>
          <a>Terms</a>
        </li>
        <li className="hide-on-tablet">&#169;2021 Story Squad HQ</li>
      </ul>
    </nav>
  );
}
