const User = require("../models/user");
const bcrypt = require("bcrypt");

const login = (req, res, next) => {
  let { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            res.json({ success: true });
          } else {
            res.json({ success: false });
          }
        });
      } else {
        res.json({ noUserFound: true });
      }
    })
    .catch(console.log);
};
module.exports = {
  login
};
