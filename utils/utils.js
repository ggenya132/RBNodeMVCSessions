const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const Workout = require("../models/workout");
const { nodemailerOptions } = require("../config/keys");
const getStartAndEndOfTheWeek = () => {
  var curr = new Date(); // get current date
  var first = curr.getDate() - curr.getDay() + 1; // First day is the day of the month - the day of the week
  var last = first + 6; // last day is the first day + 6

  var firstday = new Date(curr.setDate(first));
  var lastday = new Date(curr.setDate(last));

  return { firstday, lastday };
};

const getPreviousweekWorkoutsAsArray = req => {
  const { firstday, lastday } = getStartAndEndOfTheWeek();

  return Workout.find({
    user: req.session.user._id,
    date: { $gte: firstday, $lte: lastday }
  });
};
const getNodeMailerClient = () => {
  return nodemailer.createTransport(sgTransport(nodemailerOptions));
};
module.exports = {
  getStartAndEndOfTheWeek,
  getNodeMailerClient,
  getPreviousweekWorkoutsAsArray
};
