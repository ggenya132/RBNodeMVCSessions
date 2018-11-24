module.exports = (req, res, next) => {
  //force login for now

  let {
    session: { isLoggedIn }
  } = req;
  if (isLoggedIn) {
    next();
  } else {
    res.status(400).json({ error: "not logged in" });
  }
};
