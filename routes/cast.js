const {getData} = require('../actions');

function getCast(callback) {
    getData("cast", (err, cast) => {
        if(err) {
            callback(err);
        } else if (cast && cast.length) {
            const quickCastDetails = cast.map(item => {
                return {
                    name: item.person.name,
                    character: item.character.name,
                    birthday: item.person.birthday
                }
            });
            callback(null, quickCastDetails);
        } else {
            callback(null, null);
        }
    });
}

module.exports = function (app) {
    app
        .get('/api/cast', (req, res) => {
            getCast((err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                } else if (!result) {
                    res.status(404).json({message: `No cast in DB`})
                } else {
                    res.json(result).end()
                }
            });
        });
};
