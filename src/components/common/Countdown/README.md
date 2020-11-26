# The `Countdown` Component

This component is probably the simplest of all of them, and was design to be used in tandem with the [`useCountdown`](../../../hooks/useCountdown) hook. It takes in a `TimeUntilItem` from the [`time`](../../../utils/time) module and displays it in a readable `<span>` element that can be put anywhere in your components.

## Example

```tsx
import { useCountdown } from '../hooks';
import { Countdown } from '../components/common';

const Component = () => {
  // If you want to render a countdown until submissions begin:
  const { timeUntil } = useCountdown('submit');
  return (
    <p>
      <Countdown timeUntil={timeUntil}> until submissions open
    </p>
  )
}
```

This will display something like: "03:30:45 until submissions open".

## Styling

This component is a `<span>` with the class `countdown`. It has no styles set for it by default so feel free to style it however you'd like in your components with the super simple selector `.countdown`.
