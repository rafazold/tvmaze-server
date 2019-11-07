const {getData} = require('../DataBase/actions');

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

function getNameFromCharacter(character, callback) {
    getData("cast", (err, cast) => {
       if(err) {
           callback(err);
       } else if (cast && cast.length) {
           callback(null, cast.find(item => item.character.name === character));
       } else { callback(null, null);
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
        })
        .get('/api/cast/:character', (req, res) => {
            getNameFromCharacter(req.params.character, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                }  else if(!result) {
                    res.status(404).json({message: `Character '${req.params.character}' not found, please use full character name`});
                } else {
                    res.json(result).end();
                }
            });
        });
};
