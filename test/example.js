const fs = require("fs");

const fileConvert = {
    base64_encode: (file) => {
        let bitmap = fs.readFileSync(file);
        return new Buffer.alloc(bitmap).toString('base64');
    }
};

console.log(fileConvert["base64_encode"]("./testImage.png"));