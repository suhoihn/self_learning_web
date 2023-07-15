const fs = require("fs");

const fileConvert = {
    base64_encode: (file) => {
        let bipmap = fs.readFileSync(file);
        return new Buffer.alloc(bitmap).toString('base64');
    }
};
module.exports = fileConvert;