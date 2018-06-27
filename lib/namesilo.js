const axios = require('axios');
const _ = require('lodash');
const utils = require('./helpers/utils');
const querystring = require('querystring');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

/**
 * Create an instance of NameSilo
 *
 * @param apiKey The NameSilo api key
 * @param {Object} config The config for the instance
 */
const NameSilo = function(apiKey, config) {
    apiKey = apiKey || null;
    config = config || {};

    let defaultOptions = {
        log: true,
        debug: true,
        apiKey: apiKey
    };

    this.config = _.defaults(config, defaultOptions);

    this.axios = axios.create({
        baseURL:  'https://www.namesilo.com/api/',

        params: {
            version: 1,
            type: 'xml',
            key: apiKey
        }
    });

};

//todo: load methods dynamically for easy adding of new methods
NameSilo.prototype.checkRegisterAvailability = function (domains) {
    return require('./methods/checkRegisterAvailability').checkRegisterAvailability(this.config, this.axios, domains);
};

// Domain Transfer operations
NameSilo.prototype.transferDomain = function (domain, auth, options) {
  return require('./methods/transferDomain').transferDomain(this.config, this.axios, domain, auth, options);
};

NameSilo.prototype.checkTransferStatus = function(domain) {
    return require('./methods/checkTransferStatus').checkTransferStatus(this.config, this.axios, domain);
};

NameSilo.prototype.all = function (promises) {
    return Promise.all(promises);
};

module.exports = NameSilo;

// Allow use of default import syntax in TypeScript
module.exports.default = NameSilo;