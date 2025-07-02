export const cookieRouter = (req, res) => {
  const cookiesButtonValue = req.body.cookies;
  const currentUrl = req.body.current_url;
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  if (cookiesButtonValue === "accept") {
    res.cookie(
      "cookie_policy",
      encodeURIComponent(JSON.stringify({ essential: true, extra: true })),
      {
        expires: expirationDate,
      }
    );
    res.cookie("user_interacted", "true", { expires: expirationDate });
    res.redirect(currentUrl);
  } else if (cookiesButtonValue === "reject") {
    res.cookie(
      "cookie_policy",
      encodeURIComponent(JSON.stringify({ essential: true, extra: false })),
      {
        expires: expirationDate,
      }
    );
    res.cookie("user_interacted", "true", { expires: expirationDate });
    res.redirect(currentUrl);
  } else {
    res.sendStatus(400);
  }
};
