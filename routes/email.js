let emailController = require("../controllers/email");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ email: "works" });
});

router.post("/", emailController.createEmail);

module.exports = router;
