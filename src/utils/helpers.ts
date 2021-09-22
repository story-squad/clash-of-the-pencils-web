import React from 'react';

/** Use this to stop  */
export function stopPropagation(
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
): void {
  e.stopPropagation();
}
