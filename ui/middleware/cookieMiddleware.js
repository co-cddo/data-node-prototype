/**
 * Middleware to check user cookie consent.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
export function handleCookies(req, res, next) {
  if (!req.cookies.cookie_policy) {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    res.cookie(
      "cookie_policy",
      encodeURIComponent(JSON.stringify({ essential: true, extra: false })),
      { expires: expirationDate }
    );
  }

  const userInteracted = req.cookies.user_interacted === "true";
  res.locals.showCookieBanner = !userInteracted;
  res.locals.returnURL = req.originalUrl;
  console.log(res.locals.returnURL);
  next();
}
