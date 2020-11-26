# The `time` Module

This module aims to keep all time-based operations in a singular location for ease of access. All time-based code in this application uses the robust [Moment.js](https://momentjs.com) library.

> Moment.js is essentially just a wrapper of the native JavaScript `Date` class, but adds a lot of functionality that greatly increases usability.

## The `schedule` Object

This is a very important piece of data for our application and should not be adjusted unless we decide change the timing of the app. You _CAN_ adjust the schedule for development purposes, but make sure to revert any changes to the values before pushing your branch. Since the object uses the `utcToLocal` function, _the values stored will be adjusted for the user's timezone_.

The schedule object is a nested object organized first by event name and then by start/end times. The event name is read in from the `eventType` union type. As such, if you add or remove an event from the schedule, you must also add or remove that event form the `eventType` type.

### Example Access

```ts
// To display the voting start time
schedule.vote.start.format('h:mm A');
// OR
schedule['vote'].start.format('h:mm A');
// OR
const event = 'vote';
schedule[event].start.format('h:mm A');
```

> For more insight into formatting times with moment, refer to the documentation [here](https://momentjs.com/docs/#/displaying/).

## Methods

A few key methods are exported off of this module for use in other parts of the application. Here are brief descriptions of a few of those, as well as when to use them.

### `utcToLocal`

This function takes in a UTC hour/minute combination and returns the relevant local time for the user. It takes into account daylight savings time so that we don't have to update our schedule every 6 months.

### `secondsToTime`

This method is very simple: it takes an amount of time in seconds and converts those seconds into an object of hours, minutes, and seconds like so:

```ts
const secondsToTime = (seconds) => {
  // ...
  return { h, m, s };
};
```

> `secondsToTime` returns an object of type `TimeUntilItem`, which is also exported off of the module.

This function is used by the [`useCountdown`](../../hooks/useCountdown) hook.

### `getTimeUntilEvent`

This method is a bit more complicated to look at but perfoms a relatively simple task. It takes in an `eventType` as a parameter and returns the amount of time until that event begins. If the event is currently underway, it instead returns the amount of time until the end of the event.

This method is also used by the [`useCountdown`](../../hooks/useCountdown) hook.

> `eventType` is a simple type object that contains the anmes of all tracked events.
