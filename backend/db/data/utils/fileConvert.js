const fs = require("fs");

const fileConvert = {
    base64_encode: (file) => {
        let bitmap = fs.readFileSync(file);
        return new Buffer.from(bitmap).toString('base64');
    }
};

module.exports = fileConvert;