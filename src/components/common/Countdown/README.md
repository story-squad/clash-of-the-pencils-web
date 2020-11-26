# The `Countdown` Component

This component is probably the simplest of all of them, and was designed utilizing the custom [`useCountdown`](../../../hooks/useCountdown) hook. It takes in an `eventType` from the [`time`](../../../utils/time) module and displays a human-readable countdown in a `<span>` element that can be put anywhere in your components.

## Example

```tsx
import { Countdown } from '../components/common';

const Component = () => {
  return (
    <p>
      <Countdown toEvent="submit"> until submissions open
    </p>
  )
}
```

This will display something like: "03:30:45 until submissions open".

## Styling

This component is a `<span>` with the class `countdown`. It has no styles set for it by default so feel free to style it however you'd like in your components with the super simple selector `.countdown`.

## Changes

Originally I was reading the state into a component hook and passing the values from the hook into this component. Unfortunately, this was causing a lot of unecessary rerendering so I moved the `useCountdown` hook into the actual countdown component. Incidentally, this does feel a lot cleaner.
