module.exports = {

    name: "feeding spawn",

    alternatives: [require("task.build"), require("task.upgrade")],

    do: function(creep) {
        //spawn, build, upgrade

        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
            }
        });
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
        } else {
            return false;
        }
        return true;
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