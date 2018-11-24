const client = require("../utils/utils").getNodeMailerClient();
const { getPreviousweekWorkoutsAsArray } = require("../utils/utils");
const path = require("path");
const pathToPreviousWeekWorkout = path.join(__dirname, "..", "test.txt");
const createEmail = (req, res, next) => {
  getPreviousweekWorkoutsAsArray(req).then(console.log);
  let { email: userEmail } = req.session.user;
  const email = {
    from: "RippedBodyApp@test.com",
    to: userEmail,
    subject: "Hello Genya!",
    text: "Hello world",
    html: "<b>Hello world, there should be an attachment</b> ",
    attachments: [
      {
        // utf-8 string as an attachment
        filename: "text1.txt",
        content: "hello world!"
      },
      { filename: "testfile.txt", path: pathToPreviousWeekWorkout }
    ]
  };
  res.redirect("/");
  return client
    .sendMail(email)
    .then(console.log)
    .catch(console.log);
};
module.exports = { createEmail };
