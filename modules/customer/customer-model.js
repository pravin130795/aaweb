const constants = require('../../utils/constants');

/** @namespace */
let customer = function () {
};

/**
 * API To Insert Or Update Customer Details to the Database
 * @param {string} customer_id - Represents the Customer ID of the Customer.
 * @param {string} customerName - Represents the Customer Name.
 * @param {string} customerNumber - Represents the Customer Contact Details.
 * @param {object} address - Address will be an object that will have the entity named homeAddress which will represent the Home Address Of A Customer
 * @param {string} homeAddress - Holds the Home Address Of an Employee
 */
customer.addCustomerDetails = function () {
    return new Promise((resolve, reject) => {
        resolve(true);
    });
}

module.exports = customer;