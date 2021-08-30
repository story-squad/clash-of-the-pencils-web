import React, { useState } from 'react';
import Dial from './Dial';

export default function DialContainer(): React.ReactElement {
  const [angle] = useState(0);
  return <Dial angle={angle} />;
}
