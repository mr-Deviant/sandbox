module.exports = function () {
	var module2 = require('./module2');

    return 'This module work both on client & server side!' + "\r\n" +
	    'This is content of module #1' + "\r\n" +
	    module2;
};