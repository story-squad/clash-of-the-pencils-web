# Common Components

This folder is intended to be a module that exports all common components from a common location.

## Importing

To use components from the `common` module, import them as follows:

```ts
import { Header, Modal } from '~/common/';
```

The components should NOT be imported from their named folders:

~~`import { Header } from '~/common/Header'`~~;

~~`import Header from '~/common/Header/Header'`~~;

## File Structure

Each folder in `common/` should be capitalized, as it should be an isolated component module. As with any module, best practice is to export anything you'd like to use elsewhere form an `index` file. As such, each Component folder should follow this pattern:

```text
common/
|
|-- Header/       <- Always capital
|   |-- index.ts  <- Module export
|   |-- Modal.ts  <- Component code
|   |-- README.md <- Component How-To
|
|-- ComponentName/
|   |-- index.ts
|   |-- ComponentName.tsx
|   |-- someHelperFile.tsx    <- Any helpers that are only used
|   |-- anotherHelperFile.tsx    by this component can go here!
|   |-- README.md
```

### Example `index.ts`

```ts
/* ./ComponentName/index.ts */
export { default as ComponentName } from './ComponentName';
```

### Example `Component.tsx`

> Note: The component root element should have a unique class name for styling that mirrors the component name. This is to prevent style leaks, as `.scss` files are all imported into a common index.

```tsx
import React from 'react';

const ComponentName = (props: ComponentNameProps): React.ReactElement => {
  // Please maintain the class naming convention!
  return <div className="component-name"></div>;
};

// Name the props interface after your component as well!
interface ComponentNameProps {
  someProp: someType;
}

export default ComponentName;
```
