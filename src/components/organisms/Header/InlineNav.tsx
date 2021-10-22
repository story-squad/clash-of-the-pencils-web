import React from 'react';
import AppNavItems from './AppNavItems';
import './styles/inlineNav.scss';

export default function InlineNav(): React.ReactElement {
  return (
    <nav className="inline-nav">
      <ul>
        <AppNavItems className="inline-nav-item" />
      </ul>
    </nav>
  );
}
