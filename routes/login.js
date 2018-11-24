let loginController = require("../controllers/login");

const router = require("express").Router();

router.get("/", (req, res) => {
  //force login for now
  req.session.isLoggedIn = true;

  res.json({ login: "works" });
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    //bye
    res.redirect("/");
  });
});
router.post("/", loginController.login);

module.exports = router;
