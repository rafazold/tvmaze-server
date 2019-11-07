const {getData} = require('../actions');

function getSeasons(callback) {
    getData("seasons", (err, season) => {
        if(err) {
            callback(err);
        } else if (season && season.length) {
            const quickSeasonDetails = season.map(item => {
                return {
                    number: item.number,
                    episodes: item.episodeOrder,
                    premiereDate: item.premiereDate
                }
            });
            callback(null, quickSeasonDetails);
        } else {
            callback(null, null);
        }
    });
}

module.exports = function (app) {
    app
        .get('/api/seasons', (req, res) => {
            getSeasons((err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                } else if (!result) {
                    res.status(404).json({message: `No seasons in DB`})
                } else {
                    res.json(result).end()
                }
            });
        });
};