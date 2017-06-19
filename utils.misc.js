/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utils.misc');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    getBestSource: function(creep) {
        return creep.pos.findClosestByPath(FIND_SOURCES);
    },
};