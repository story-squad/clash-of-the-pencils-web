import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';

const LandingHeader = (): React.ReactElement => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu((cur) => !cur);
  };

  return (
    <>
      <div className="landing-header">
        <h2>Story Squad</h2>
        <MdMenu onClick={toggleMenu} />
      </div>
      <div className="nav-menu">
        <div className={`menu-container${showMenu ? '' : ' hidden'}`}>
          <div className="menu-item">
            <Link to="/" onClick={() => setShowMenu(false)}>
              Home
            </Link>
          </div>
          <div className="menu-item">
            <Link to="/" onClick={() => setShowMenu(false)}>
              Vote
            </Link>
          </div>
          <div className="menu-item">
            <Link to="/info" onClick={() => setShowMenu(false)}>
              Learn More
            </Link>
          </div>
          <div className="menu-item">
            <Link to="/signup" onClick={() => setShowMenu(false)}>
              Signup
            </Link>
          </div>
          <div className="menu-item login-button">
            <Link to="/login" onClick={() => setShowMenu(false)}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingHeader;
