let service = require('./customer-service');

module.exports = function (app) {
    // To Insert Customer Details To Database
	app.post('/customer/addcustomerdetails', service.addCustomerDetails);
}