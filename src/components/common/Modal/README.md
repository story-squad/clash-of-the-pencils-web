# Modal

The `Modal` is a higher-order component that displays another component in a floating container on the screen. It renders a transparent black mask over the application with a floating container positioned horizontally in its center.

![Modal Example](./modal-example.png)

The modal can be closed by clicking on the `X` in the top-right corner (not shown in picture), or by clicking anywhere outside of the modal (unless otherwise specified, see [below](#-closable)).

When opened and closed, the modal will slowly fade in and out using CSS transitions and careful z-indexing. Recklessly z-indexing your page elements may affect these animations.

## Higher-Order Component (HoC)

The `Modal` is a `HoC`, which is any component that takes another component as a property, like the `component` prop on a `<Route />`.

The Modal is used in more or less the same way:

```jsx
<Modal component={ComponentName} />
```

## Properties

The modal has other properties to help make it more interactive:

- `component` - a valid React component to render
- `visible` - boolean
- `setVisible` - setState function
- `closable` - boolean _(optional, default `true`)_
- `centered` - boolean _(optional, default `false`)_
- `className` - string _(optional)_

### Example Use In Component

```jsx
const Component = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Modal
        component={SomeComponent}
        visible={visible}
        setVisible={setVisible}
      >
      {/* This button will display the modal */}
      <button onClick={() => setVisible(true)}>Show Modal</button>
    </div>
  )
}
```

### `component`

A valid React component to render to the Modal body. The component will be passed the `setVisible` function in case you wish to add custom modal close functionality.

### `visible`

`visible` should be a controlled state element for the modal to function properly. If `true`, the modal will be displayed on the page. If `false`, the modal will be hidden.

### `setVisible`

`setVisible` should be the relevant setState callback to control the `visible` property. The Modal uses this function to close itself and will not function properly if not used correctly.

### `closable`

If `closable` is `true`, an `X` will be displayed in the top-right corner, and the modal can be closed by clicking either the `X` or the area outside of the modal.

if `closable` is `false`, the modal can only be closed by calling `setVisible(false)` somewhere in the rendered component, such as on an OK button.

### `centered`

If `true`, the modal will be centered on the screen using flexbox. If false, it will still be horizontally centered, but will be rendered near the top of the screen with some padding.

### `className`

All this does is adds custom JSX `classNames` to a modal for more specific styling needs.
