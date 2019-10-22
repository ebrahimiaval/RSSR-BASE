const path = require('path');
const sassNamespacePath = path.resolve('sass-namespace.json')
const sassNamespace = require(sassNamespacePath);

// name list
const names = {};
sassNamespace.forEach(function (item, index) {
    names[item] = '#n' + index
})

module.exports = function (source) {
    source
        .slice(0, 150) // for improve transpile spead
        .replace(/@namespace "([^"]+)";/i, function (command, namespace) {
            source = source.slice(command.length); // remove @namespace
            source = '#{' + names[namespace] + '}{' + source + '}'; // add wrapper
        })
    return source;
};
