var module1 = require('./module1');

document.getElementsByTagName('h2')[0].innerHTML = '<pre>' +module1() + '</pre>';