export const auth0Config: {
  audience: string | undefined;
  domain: string | undefined;
} = {
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
};
