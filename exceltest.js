var fs = require("fs");
var writeStream = fs.createWriteStream("file.xls");
var writeStream2 = fs.createWriteStream("file2.xls");
let exercises = [
  { title: "db curl", load: "95", performedReps: [8, 8, 8] },
  { title: "bb squat", load: "225", performedReps: [10, 10, 12] }
];

var newHeader = "";
var row1new = "";

exercises.forEach(exercise => {
  newHeader += exercise.title;
  newHeader += "\t";
  row1new += exercise.load;
  row1new += "\t";
});

newHeader += "\n";

var header = "Sl No" + "\t" + " Age" + "\t" + "Name" + "\n";
var row1 = "0" + "\t" + " 21" + "\t" + "Rob" + "\n";
var row2 = "1" + "\t" + " 22" + "\t" + "bob" + "\n";

writeStream.write(header);
writeStream.write(row1);
writeStream.write(row2);

writeStream.close();

writeStream2.write(newHeader);
writeStream2.write(row1new);
