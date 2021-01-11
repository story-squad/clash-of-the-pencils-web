# Profile

This folder is intended to contain anything related to the users profile.
In its current state we have a Gallery for the users submissions from the current week and an Account page that will allow users to udpate their Username and Password.

ProfileContainer:

- This file is where Recoil is set for the users past submissions.
  [`src\components\pages\Profile\ProfileContainer.tsx`]

RenderProfile:

- This file is rendering the Gallery for the user by default (showGallery state).
- If the user switches to their Account page the EditProfile contents will then render.
  [`src\components\pages\Profile\RenderProfile.tsx`]

## Edit Profile

This folder contains an `EditProfile.ts` file that render the Username and Password Reset Folders.
The user will find these forms under their `Account` tab of their profile.
These forms are conditionally rendered under the users Profile view.

API calls are handled directly in their respected forms.

## Profile Gallery

This folder contains the SubCards of the users past 7 submissions. It is rendered by default in the users Profile.

## Profile Nav

This navigation bar allows the user to jump from their Gallery Page to their Edit Profile (Account) view.
The navigation bar will render either the Gallery or Edit Profile forms based off the users selection.
