var master = require("role.master")
var roleUpgrader = {

    roleName: "upgrader",
    optimalQuantity: 2,
    tasks: [require("task.harvest"), require("task.upgrade")],

    create: function(creepName) {
        Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], creepName, { role: this.roleName });
    },

    /** @param {Creep} creep **/
    run: function(creep) {

        master.doTasks(creep, this.tasks);

        /*
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var source = miscUtils.getBestSource(creep);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        */
    }
};

module.exports = roleUpgrader;