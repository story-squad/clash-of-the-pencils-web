import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterNav(): React.ReactElement {
  return (
    <nav>
      <ul>
        {/* <li>
          <a>Contact</a>
        </li> */}
        <li>
          <Link to="/termsofservice" target="_blank">
            Terms
          </Link>
        </li>
        <li className="hide-on-tablet">&#169;2021 Story Squad HQ</li>
      </ul>
    </nav>
  );
}
