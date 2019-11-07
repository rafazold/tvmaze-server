const fs = require('fs');

function getData(dataType, callback) {
    const dataFile = './DataBase/' + dataType + '.json';
    fs.readFile(dataFile, (err,result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, JSON.parse(result.toString()));
        }
    });
}


module.exports = {
    getData
};