# The `Header` Component

The Header is a simple component (aside from the styling). It checks the login status of the user and will render either the main site links if logged in or the landing page links if logged out.

## Changes to the Menu Items in [`nav`](../../../config/navigationLinks)

If the menu items are ever changed, make sure you update the `menu-item-count` SASS variable in the [`header.scss`](../../../styles/components/common/header.scss) file. Ensure that this number corresponds to the length of the longest menu item array to maintain the integrity of the menu animations on mobile.

If the length is ever increased, it's also likely that more media queries will need to be added, as teh Header was styled with a max-length of 5 items in mind.

## Styling

The styling is fairly complicated and should not be touched unless you have a strong grasp of CSS positioning/transitioning.

### Mobile

On mobile screens, the Header renders a hamburger menu icon on the right-hand corner. When clicked, a menu slides down from behind the menu. This is done by using a 0-height container component, the `menu-container`. By keeping careful track of the height of our menu using variables to calculate our most conservative estimate for keeping it hidden, we're able to animate the menu appearing fairly easily using `absolute top` positioning.

### Desktop

The goal with the refactor was to move away from desktop and mobile using completely different components for their navbars. We were able to accomplish this by simply changing the layout of the mobile menu in the following key ways:

- Instead of flexing in a column, we flex in a row
- Instead of positioning with a negative top value, we position with a positive bottom value
- We change the z-index so that the menu is in front of the header rather than behind
- We also change the hover/click animation of the menu items as it's incredibly difficult to get the blocks lined up right so we jsut made it a text shadow on desktop
