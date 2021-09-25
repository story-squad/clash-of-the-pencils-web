import React from 'react';

/** Use this to stop mouse events from propagating */
export function stopPropagation<ElementType = unknown>(
  e: React.MouseEvent<ElementType, MouseEvent>,
): void {
  e.stopPropagation();
}
