var _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    API = require('./api.js');

var DIR = fs.realpathSync(path.resolve(require('path').dirname(require.main.filename),'api','resources'));
var resources = fs.readdirSync(DIR);

module.exports = function (app) {
    _.each(resources, function (resource) {
        //TODO: Make more versatile call, assuming not only .js files can be in /resources dir
        try {
            API(app, resource.substring(0,resource.length-3), require(path.join(DIR,resource)));
        } catch (e){
            console.log("Failed to initialize API resource",resource,e);
        }
    });
};