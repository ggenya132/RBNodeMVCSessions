const User = require("../models/user");
const bcrypt = require("bcrypt");
const createUser = (req, res, next) => {
  console.log("in uyser post route");
  console.log(req.body);
  let { email, password, name } = req.body;
  console.log({ email, password, name });
  User.findOne({ email })
    .then(user => {
      if (user) {
        res.status(404).json({ errors: ["User already exists"] });
      } else {
        password = bcrypt.hashSync(password, 10);
        const newUser = new User({ password, name, email });
        newUser
          .save()
          .then(newUser => res.json(newUser))
          .catch(res.json);
      }
    })
    .catch(console.log);
};
module.exports = { createUser };
