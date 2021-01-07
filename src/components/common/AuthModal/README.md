# AuthModal

The `AuthModal` is an attempt to clean up the UI and streamline UX by allowing a user to log in/sign up from ANY page in the application, rather than being redirected. The forms in our application use `react-hook-form` combined with our reusable `Input` and `Checkbox` components. The `AuthModal` also handles the signout process.

The open/close state of the modal, as well as various other states such as if a user is try to sign out or if a user has successfully signed in are all managed with Recoil state. This allows us to cleanly integrate the modal into various sections of the app.

> Important to know: the `AuthModal` is ALWAYS rendered on the page (in the `App` component), but it defaults to not being visible.

## LoginForm

The `LoginForm` is farily simple and allows a user to log in to the application.

## SignupForm

The `SignupForm` is a bit more involved and is what is used when a user signs into the application. To improve the user experience, upon successfuly signup our users will receive a message that their signup was successful and that they should validate their email address. This is also handled with recoil state.

## Signout

The Signout component handles all signout functionality including clearing recoil state and clearing the token. When a user clicks sign out in the header, it will open a confirmation dialogue asking them if they're sure they'd like to sign out. Upon successful signout, the user will be redirected to the `LandingPage`.
