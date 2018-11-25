const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const Workout = require("../models/workout");
const xl = require("excel4node");

var fs = require("fs");

const { nodemailerOptions } = require("../config/keys");

const getStartAndEndOfTheWeek = d => {
  function getSunday(d) {
    d = new Date(d);
    if (d.getDay() === 0) {
      return d;
    } else {
      diff = d.getDate() + (7 - d.getDay());
      return new Date(d.setDate(diff));
    }
  }

  function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  } //   var curr = new Date(); // get current date
  //   var first = curr.getDate() - (curr.getDay() + 1); // First day is the day of the month - the day of the week
  //   var last = first + 6; // last day is the first day + 6

  //   var firstday = new Date(curr.setDate(first));
  //   var lastday = new Date(curr.setDate(last));
  let firstday = getMonday(d);
  let lastday = getSunday(d);

  return { firstday, lastday };
};

const getPreviousweekWorkoutsAsArray = req => {
  const { firstday, lastday } = getStartAndEndOfTheWeek(new Date());

  console.log({ firstday, lastday });
  return Workout.find({
    user: req.session.user._id,
    date: { $gte: firstday, $lte: lastday }
  });
};
const getNodeMailerClient = () => {
  return nodemailer.createTransport(sgTransport(nodemailerOptions));
};
const writeExcelFile = exercises => {
  //TODO implement mapping of exercises array to workbook
  //THIS IS JUST SOME SAMPLE CODE
  var wb = new xl.Workbook();

  // Add Worksheets to the workbook
  var ws = wb.addWorksheet("Sheet 1");
  var ws2 = wb.addWorksheet("Sheet 2");

  // Create a reusable style
  var style = wb.createStyle({
    font: {
      color: "#FF0800",
      size: 12
    },
    numberFormat: "$#,##0.00; ($#,##0.00); -"
  });

  // Set value of cell A1 to 100 as a number type styled with paramaters of style
  ws.cell(1, 1)
    .number(100)
    .style(style);

  // Set value of cell B1 to 200 as a number type styled with paramaters of style
  ws.cell(1, 2)
    .number(200)
    .style(style);

  // Set value of cell C1 to a formula styled with paramaters of style
  ws.cell(1, 3)
    .formula("A1 + B1")
    .style(style);

  // Set value of cell A2 to 'string' styled with paramaters of style
  ws.cell(2, 1)
    .string("string")
    .style(style);

  // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
  ws.cell(3, 1)
    .bool(true)
    .style(style)
    .style({ font: { size: 14 } });

  wb.write("Excel.xlsx");
};
module.exports = {
  getStartAndEndOfTheWeek,
  getNodeMailerClient,
  writeExcelFile,
  getPreviousweekWorkoutsAsArray
};
