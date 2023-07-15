const fs = require("fs");

const fileConvert = {
    base64_encode: (file) => {
        console.log(file)
        let bitmap = fs.readFileSync(file);
        console.log('bitmap :', bitmap)
        console.log('bitmap.length :', bitmap.length)
        return new Buffer.from(bitmap).toString('base64');
    }
};

console.log(fileConvert.base64_encode("./w22_11_m1b.png"));