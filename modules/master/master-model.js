
const constants = require('../../utils/constants');

/** @namespace */
let master = function () {

};

/**
 * API To Insert Or Update Customer Details to the Database
 * @param {string} designation_name - Represents the Designation Name.
 */
master.addDesignationDetail = function (options) {
    return new Promise((resolve, reject) => {
        masterDesignation.create({ designation: options.designation_name })
            .then(response => resolve(response))
            .catch(error => reject(error))
    });
}

master.getDesignationLists = function (options) {
    return new Promise((resolve, reject) => {
        global.sqlInstance.findAll().then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    });
}

module.exports = master;