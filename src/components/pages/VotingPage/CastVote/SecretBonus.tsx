import React, { useEffect, useState } from 'react';
import secretBonus from '../../../../assets/img/secret-bonus-red.png';

const SecretBonus = (props: SecretBonusProps): React.ReactElement => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const count = setInterval(() => {
      setTimeLeft((cur) => cur - 1);
    }, 1000);

    return () => clearInterval(count);
  }, []);

  return (
    <div className="secret-bonus">
      <img src={secretBonus} alt="Secret Bonus" />
      <p>Get a head start on tomorrow&apos;s story:</p>
      <p className="prompt">{props.secretMessage}</p>
      <p className="timer">
        This message will self-destruct in <span>{timeLeft}</span> seconds!
      </p>
    </div>
  );
};

interface SecretBonusProps {
  secretMessage: string;
}

export default SecretBonus;
