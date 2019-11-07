const {getData} = require('../actions');



function getShows(callback) {
    getData("shows", (err, shows) => {
        if(err) {
            callback(err);
        } else if (shows && shows.length) {
            const quickShowDetails = shows.map(item => {
                return {
                    showName: item.show.name,
                    showId: item.show.id
                }
            });
            callback(null, quickShowDetails);
        } else {
            callback(null, null);
        }
    });
}

module.exports = function (app) {
    app
        .get('/api/shows', (req, res) => {
           getShows((err, result) => {
              if (err) {
                  console.log(err);
                  res.status(500).end();
              } else if (!result) {
                  res.status(404).json({message: `No shows in DB`})
              } else {
                  res.json(result).end()
              }
           });
        });
};