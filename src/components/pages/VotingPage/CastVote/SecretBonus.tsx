import React from 'react';
import secretBonus from '../../../../assets/img/secret-bonus-red.png';

const SecretBonus = (): React.ReactElement => {
  return (
    <div className="secret-bonus">
      <img src={secretBonus} alt="Secret Bonus" />
    </div>
  );
};

export default SecretBonus;
