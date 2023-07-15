const fs = require("fs");
const { parse } = require("csv-parse");


const CSV = {
  readCSV : (fileName) => {
    fs.createReadStream(fileName).pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        console.log(row);
    })
    .on("end", function () {
        console.log("finished");
    })
    .on("error", function (error) {
        console.log(error.message);
    });
  }
}

module.exports = CSV;