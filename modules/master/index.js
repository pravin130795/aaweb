let service = require('./master-service');

module.exports = function (app) {
    // To Insert Designation Details To Database
    app.post('/master/designation', service.addDesignation);
	app.get('/master/designation', service.getDesignation);

}