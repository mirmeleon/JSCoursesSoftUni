//result.mapSort = require('./map-sort');
result.data = require('./data');
function sort(property) {
    return result.data.sort((a, b) => a[property].localeCompare(b[property]));
}

function filter(property, value) {
    return result.data.filter(e => e[property] == value);
}

result.sort = sort;
result.filter = filter;
result.data = require('./data');
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map