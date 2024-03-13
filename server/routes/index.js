module.exports = function(app) {
    require('./kalendar')(app);
    require('./bogosluzenja')(app)
    require('./bogosluzenja_uopsteno')(app);
};