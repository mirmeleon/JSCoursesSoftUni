let expect = require('chai').expect;
let jsdom = require('jsdom-global')();
let $ = require('jquery');

document.body.innerHtml = `<div id="wrapper">
<input type="text" id="name">
<input type="text id="income">
</div>`;