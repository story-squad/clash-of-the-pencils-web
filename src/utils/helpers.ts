import React from 'react';

/** Use this to stop mouse events from propagating */
export function stopPropagation<ElementType = unknown>(
  e: React.MouseEvent<ElementType, MouseEvent>,
): void {
  console.log('stopping');
  e.stopPropagation();
}

/**
 * A handy jQuery-like selector that makes accessing the DOM
 * easier, but won't include all of the overhead of the actual
 * jQuery library itself.
 */
export const $: typeof document.querySelector =
  document.querySelector.bind(document);
