// import { Strategy as OAuth2Strategy } from "passport-oauth2";
// import { Strategy as JwtStrategyPassport, ExtractJwt } from "passport-jwt";
// import jwksRsa from "jwks-rsa";
// import passport from "passport";

// if (
//   !process.env.SSO_AUTH_URL ||
//   !process.env.SSO_CLIENT_ID ||
//   !process.env.SSO_CLIENT_SECRET ||
//   !process.env.SSO_CALLBACK_URL
// ) {
//   throw new Error(
//     "Missing required environment variables for OAuth configuration."
//   );
// }

const singIn = {
  href: "/sign-in",
  text: "Sign in",
};
const singOut = {
  href: "/sign-out",
  text: "Sign out",
};
const commonItems = [
  {
    href: "/record/add",
    text: "Add New record",
  },
  {
    href: "/records",
    text: "List records",
  },
];

// /**
//  * Middleware to check user authentication.
//  * @param {object} app - Express App.
//  */

/**
 * Middleware to check user authentication.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export const Auth = (req, res, next) => {
  console.log(req.url);
  const { user } = { user: { name: "Denislav Davidov" } }; //req.cookies;
  const manageUser = {
    href: "/user/me",
    text: user.name,
  };
  res.locals.navigationItems = user
    ? [...commonItems, manageUser, singOut]
    : [...commonItems, singIn];
  next();
};
