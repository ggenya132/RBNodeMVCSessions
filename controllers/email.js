const client = require("../utils/utils").getNodeMailerClient();
const {
  getPreviousweekWorkoutsAsArray,
  writeExcelFile
} = require("../utils/utils");
const path = require("path");
const fs = require("fs");
const createEmail = (req, res, next) => {
  const pathToPreviousWeekWorkout = path.join(
    __dirname,
    "..",
    `${req.session.user._id}.xlsx`
  );
  getPreviousweekWorkoutsAsArray(req)
    .then(workouts => writeExcelFile(workouts, req))
    .then(stats => {
      console.log({ stats });

      let { email: userEmail, name: userName } = req.session.user;
      const email = {
        from: "RippedBodyApp@test.com",
        to: userEmail,
        subject: `Hello, ${userName}!`,
        text: "Here's your weekly workout information",
        html: "<b>Hello world, there should be an attachment</b>",
        attachments: [{ path: pathToPreviousWeekWorkout }]
      };
      res.redirect("/");
      return client.sendMail(email);
    })
    .then(success => {
      console.log(success);
      return fs.unlink(pathToPreviousWeekWorkout, err => {
        if (err) {
          return err;
        } else {
          console.log(`removed ${pathToPreviousWeekWorkout}`);
        }
      });
    })
    .catch(console.log);
};
module.exports = { createEmail };
