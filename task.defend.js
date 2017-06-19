/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('task.repair');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    name: "defend",

    alternatives: [require("task.repair"), require("task.build"), require("task.upgrade")],

    do: function(creep) {

        //on regarde si on as des ennemis dans la salle
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS)
        if (enemies.length > 0) {
            target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
                filter: function(object) {
                    return object.getActiveBodyparts(ATTACK) == 0;
                }
            });
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ff0000' } });
            }
            return true
        } else {
            return false;
        }
    },

    nextTask: function(creep) {
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS)
        if (enemies.length < 1) {
            return true
        } else {
            return false;
        }
    }
};