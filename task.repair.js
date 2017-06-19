/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('task.repair');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    name: "repair",

    alternatives: [require("task.build"), require("task.feedSpawn")],

    do: function(creep) {

        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.hits / structure.hitsMax < 0.9);
            }
        });
        if (targets.length > 0) {
            if (creep.repair(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return true;
        } else {
            //console.log(creep.name + ": Nothing to repair")
            return false;
        }
    },

    nextTask: function(creep) {
        //quand on est vide, on as terminé
        if (creep.carry.energy > 0) {
            return false;
        } else {
            return true;
        }
    }
};