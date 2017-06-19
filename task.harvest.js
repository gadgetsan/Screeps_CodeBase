var miscUtils = require("utils.misc")
module.exports = {

    name: "harvesting",

    alternatives: [],

    do: function(creep) {
        var source = miscUtils.getBestSource(creep);

        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source, { visualizePathStyle: { stroke: '#ffaa00' } });
        }
        return true;
    },

    nextTask: function(creep) {
        //quand on est plein, on as terminé
        if (creep.carry.energy < creep.carryCapacity) {
            return false;
        } else {
            return true;
        }
    }
};