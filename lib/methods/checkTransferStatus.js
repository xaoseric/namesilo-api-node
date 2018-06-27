const Promise = require('bluebird');
const utils = require('../helpers/utils');
const querystring = require('querystring');

module.exports.checkTransferStatus = function (config, axios, domain) {

    return new Promise(function(resolve, reject) {

        if (config.apiKey == null) {
            reject('API Key can not be null.');
        }

        if (domain === undefined) {
            reject("No domain provided to check");
        }

        axios.post('checkTransferStatus', querystring.stringify({ domain: domain }))
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });

    });

};