var master = require("role.master")
var roleBuilder = {

    roleName: "builder",
    optimalQuantity: 5,
    tasks: [require("task.harvest"), require("task.repair")],

    create: function(creepName) {
        Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], creepName, { role: this.roleName });
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        master.doTasks(creep, this.tasks);
        /*
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
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

module.exports = roleBuilder;