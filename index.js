const axios = require('axios');
const _ = require('lodash');

const NameSilo = function (apiKey, config) {

    let self = {};
    apiKey = apiKey || null;
    config = config || {};

    let defaultOptions = {
        log: true,
        debug: true
    };

    self.config = _.defaults(config, defaultOptions);
    self.baseUri = 'https://www.namesilo.com/api/';
    self.apiVersion = 1;
    self.apiType = 'xml';
    self.apiKey = apiKey;

    self.log = function (msg) {
        console.log(msg);
    };

    self.error = function (msg) {
      console.error(msg);
    };

    self.warn = function (msg) {
      console.warn(msg);
    };

    self.registerDomain = function (domain, years, options) {
        domain = domain || null;
        years = years || 1;
        options = options || {};

        if (self.apiKey == null) {
            self.error('API Key can not be null.');
            return;
        }

        if (domain.isNull()) {
            self.error('Domain can not be null.');
            return;
        }

        let uri = this.baseUri + `registerDomain?version=${self.apiVersion}&type=${self.apiType}&key=${self.apiKey}`;

        let data = {
            domain: domain,
            years: years,
            options: options
        };



    };

    self.checkRegisterAvailability = function (domains) {
        domains = domains || [];

        if (self.apiKey == null) {
            self.error('API Key can not be null.');
            return;
        }

        if (self.isEmpty(domains)) {
            self.error('No domains provided to check');
            return;
        }

        let uri = this.baseUri + `checkRegisterAvailability?version=${self.apiVersion}&type=${self.apiType}&key=${self.apiKey}`;
        uri.concat('&domains=');

        let domainsLength = domains.length;

        for (let i = 0; i < domainsLength; i++){
            let domain = domains[i];

            // Do something if is the last iteration of the array
            if((i + 1) === (domainsLength)){
                uri.concat(domain);
            } else {
                uri.concat(domain + ',');
            }

        }

        axios.post(uri)
            .then(function (response) {
               return response;
            })
            .catch(function (error) {
                return error;
            });
    };

    self.isEmpty = a => Array.isArray(a) && a.every(self.isEmpty);

    return self;
};

module.exports = NameSilo;