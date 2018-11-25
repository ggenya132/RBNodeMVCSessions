const client = require("../utils/utils").getNodeMailerClient();
const {
  getPreviousweekWorkoutsAsArray,
  writeExcelFile
} = require("../utils/utils");
const path = require("path");
const createEmail = (req, res, next) => {
  getPreviousweekWorkoutsAsArray(req).then(workouts => {
    writeExcelFile(workouts[0].exercises);
    const pathToPreviousWeekWorkout = path.join(__dirname, "..", "Excel.xlsx");

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
    return client
      .sendMail(email)
      .then(console.log)
      .catch(console.log);
  });
};
module.exports = { createEmail };
