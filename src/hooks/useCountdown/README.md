# The `useCountdown` Custom Hook

This custom hook was created to be used in conjunction with the [`Countdown`](../../components/common/Countdown) component. This hook can be used in various Components to provide information about the timing of an event.

## Using the Hook

The hook is fairly straightforward to use, expecially in a TypeScript environment. Simply import the hook from the `/hooks` module, and use it in your component as you would any other hook.

This hook takes only one parameter, and that is the `eventType` that you'd like to track. Since we're using TypeScript, you will be suggested all possible values when attempting to use the hook (and your IDE will throw a fit if you use an invalid value), so you should always know the correct key to access the event information.

### Example

```tsx
import { useCountdown } from '../hooks';
import { Countdown } from '../components/common';

const Component = () => {
  // Typescript will suggest a value between the quotes!
  const {} = useCountdown('');

  // If you want to know whether the voting event is currently active:
  const { active } = useCountdown('vote');

  // If you want to render a countdown until submissions begin:
  const { timeUntil } = useCountdown('submit');
  return (
    <Countdown timeUntil={timeUntil}>
  )
}
```

## Under the Hood

This hook is fairly simple and consists of only four parts:

1. It sets the initial state of whether the passed in event is `active/inactive`, as well as the number of seconds until the event begins/ends.
2. It sets an `interval` that will update both of those values every second (1000 ms).
3. It clears the `interval` when the subscribed component is unmounted to prevent memory leaks.
4. It converts the number of seconds into a `TimeUntilItem` type using the `secondsToTime()` method from the [`time`](../../utils/time) module for a more readable display.
