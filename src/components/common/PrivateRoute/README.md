# PrivateRoute

The `PrivateRoute` component is a wrapper component for the standard React-Router-Dom `Route` component. It checks `localStorage` for a valid token and will either:

- Render a redirect to the `/login` route if the token is expired, invalid, or nonexistent

OR

- Render the passed in `component` if a valid token is found

This component works hand-in-hand with our token authentication flow to restrict access to content that users must be logged in to view.

## Proeprties

The `PrivateRoute` component takes the same components as a standard `Route`:

- `path` - the path at which to render the component if authorized
- `component` - the component to render if the user is authorized

## Example Use

The component is used the same as a `Route`:

```jsx
<PrivateRoute path="/some/path" component={() => <SomeComponent />}>
```

> Note: Like the `Route` component, you can pass the `exact` flag to the PrivateRoute component as follows

```jsx
<PrivateRoute exact path="/some/path" component={() => <SomeComponent />}>
```
