import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { encouragement } from '../../../assets';
import { IDS } from '../../../config';
import { Button } from '../../atoms';

export default function EncouragementButton(): React.ReactElement {
  // Store our currently selected audio file in state
  const [sound, setSound] = useState(getRandomSound());

  const [play, { stop }] = useSound(sound);

  // This stops the currently playing sound whenever sound changes
  useEffect(() => {
    return stop;
  }, [sound]);

  // Custom play handler to make sure we have no overlap of sounds
  const playHandler = () => {
    // Set a new random sound -> this stops currently playing sound!
    setSound(getRandomSound());
    // Play the sound
    play();
  };

  return (
    <Button id={IDS.ID_ENCOURAGEMENT} type="secondary" onClick={playHandler}>
      Encouragement Button
    </Button>
  );
}

function getRandomSound() {
  // Get an array of all sounds from encouragement
  const keys = Object.keys(encouragement);
  // Generate a random key from the encouragement module
  const randomKey = keys[
    (keys.length * Math.random()) << 0
  ] as keyof typeof encouragement;

  // Return the src string at the random key
  return encouragement[randomKey];
}
