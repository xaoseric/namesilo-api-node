const Promise = require('bluebird');
const utils = require('../helpers/utils');
const querystring = require('querystring');

module.exports.checkRegisterAvailability = function (config, axios, domains) {

    return new Promise(function(resolve, reject) {
        domains = domains || {};

        if (config.apiKey == null) {
            reject('API Key can not be null.');
        }

        if (utils.isArrayEmpty(domains)) {
            reject('No domains provided to check');
        }

        let query = "";
        let domainsLength = domains.length;

        for (let i = 0; i < domainsLength; i++){
            let domain = domains[i];

            // Do something if is the last iteration of the array
            if((i + 1) === (domainsLength)){
                query.concat(domain);
            } else {
                query.concat(domain + ',');
            }

        }

        axios.post('checkRegisterAvailability', querystring.stringify({ domains: query }))
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });

    });

};
