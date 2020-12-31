import React, { useEffect, useState } from 'react';
import secretBonus from '../../../../../assets/img/PNGs/secret-bonus-red.png';
import { Modal } from '../../../../common';

const SecretBonus = (props: SecretBonusProps): React.ReactElement => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const count = setInterval(() => {
      setTimeLeft((cur) => {
        if (cur > 0) {
          return cur - 1;
        } else {
          props.closeModal();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(count);
  }, []);

  return (
    <div className="secret-bonus">
      <img src={secretBonus} alt="Secret Bonus" />
      <h2>Get a head start on tomorrow&apos;s story:</h2>
      <p className="prompt">{props.secretMessage}</p>
      <p className="cast">Your vote has been cast!</p>
      <p className="timer">
        This message will self&nbsp;destruct in <span>{timeLeft}</span> seconds!
      </p>
    </div>
  );
};

interface SecretBonusProps extends Modal.ModalComponentProps {
  secretMessage: string;
}

export default SecretBonus;
