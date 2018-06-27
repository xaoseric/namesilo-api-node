const Promise = require('bluebird');
const utils = require('../helpers/utils');
const querystring = require('querystring');
const _ = require('lodash');

module.exports.transferDomain = function (config, axios, domain, auth, options) {

    return new Promise(function(resolve, reject) {
        options = options || {};

        if (config.apiKey == null) {
            reject('API Key can not be null.');
        }

        options.domain = domain;
        options.auth = auth;

        options = _.defaults(options, {
           private: 1,
           auto_renew: 1
        });

        axios.post('transferDomain', querystring.stringify(options))
            .then(function (response) {
                resolve(response);
            })
            .catch(function (error) {
                reject(error);
            });

    });

};