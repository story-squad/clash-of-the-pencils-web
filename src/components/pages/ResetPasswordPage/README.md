# Password Reset

Add a base password-reset functionality with room for expansion or an "enter code" method in the future.

Password resets will follow these general guidelines:

- Reset emails can be generated once per 10 minutes for a user
- A reset email is only valid for those 10 minutes
- When the 10 minute mark is passed, when another reset is requested, the older code will be deleted and a new one sent

The reset procedure is expected to follow this route-path currently:

- A user requests a password reset via the FE through something like a modal component to GET /email/reset with Query Parameters containing their email like so: ?email=testemail%40domain.com
  - This will send an E-Mail that will contain a link back to a FE page that will allow them to do a password reset, contest.storysquad.app/passwordreset?code={code}&email={email}
- The FE then needs to ask for a new password from the user, then send the information to POST /email/reset with the body containing the email and code from the query parameters, and the new password.
  - If success, FE will receive a 200 { message: "Updated password" }

## Notes

1. Users should be logged brought to login page once new password is created (this seems to be standard)
