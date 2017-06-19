var master = require("role.master")
var roleHarvester = {

    roleName: "harvester",
    optimalQuantity: 4,
    tasks: [require("task.harvest"), require("task.feedSpawn")],

    create: function(creepName) {
        if (Game.spawns['Spawn1'].canCreateCreep([WORK, CARRY, CARRY, CARRY, MOVE]) == OK) {
            Game.spawns['Spawn1'].createCreep([WORK, CARRY, CARRY, CARRY, MOVE], creepName, { role: this.roleName });
        } else {
            Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], creepName, { role: this.roleName });
        }
    },

    /** @param {Creep} creep **/
    run: function(creep) {

        master.doTasks(creep, this.tasks);

        /*
        if(creep.carry.energy < creep.carryCapacity) {
            var source = miscUtils.getBestSource(creep);
            
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        */
    }
};

module.exports = roleHarvester;