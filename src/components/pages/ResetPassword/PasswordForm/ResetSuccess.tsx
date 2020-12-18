import React, { useState } from 'react';
const ResetSuccess: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const clickHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAuthModal(true);
    // TODO - bring the Login Modal in bc we no longer have a /login route
  };
  return (
    <>
      <div className="reset-success">
        <p>Please log in to complete the reset process.</p>
        <button onCanPlayThrough={clickHandler}>Login</button>
      </div>
    </>
  );
};

export default ResetSuccess;
