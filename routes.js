'use strict'

module.exports = function (app) {
    app.get("/", (_, res) => res.json({}));
    // API
    app.use('/api/v1/core', require('./api/core'));

    // All undefined api routes should return a 404
    app.get('/api/*', function (req, res) {
        console.log("Ok here for 404")
        res.sendStatus(404);
    })
}
