const fs = require("fs");
const csv = require("csv-parser");

const getData = (fileName) => {
  let data = [];

  return new Promise ((resolve, reject) => {
    fs.createReadStream(fileName).pipe(csv({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      data.push(row)
    })
    .on("end", function () {
      resolve(data)
    })
    .on("error", function (error) {
      reject(error)
      console.log(error.message);
    });
  })
}

const CSV = {
  readCSV : async (fileName) => {
    try {
      const data = await getData(fileName)
      return data
    } catch (error) {
      console.error("error occurred", error.message)
    }
  }
}

module.exports = CSV;