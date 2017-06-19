var master = require("role.master")
var roleDefender = {

    roleName: "defender",
    optimalQuantity: 10,
    tasks: [require("task.defend"), require("task.harvest")],

    create: function(creepName) {
        if (Game.spawns['Spawn1'].canCreateCreep([WORK, CARRY, ATTACK, ATTACK, MOVE]) == OK) {
            Game.spawns['Spawn1'].createCreep([WORK, CARRY, ATTACK, ATTACK, MOVE], creepName, { role: this.roleName });
        } else if (Game.spawns['Spawn1'].canCreateCreep([WORK, CARRY, ATTACK, MOVE]) == OK) {
            Game.spawns['Spawn1'].createCreep([WORK, CARRY, ATTACK, MOVE], creepName, { role: this.roleName });
        }
    },

    /** @param {Creep} creep **/
    run: function(creep) {

        var enemies = creep.room.find(FIND_HOSTILE_CREEPS)
        if (enemies.length > 0) {
            console.log(creep.name + ": I've found " + enemies.length + " enemies")
                //si il y a au moins 1 ennemy, on force ce creep a commencer à l'attaquer
            creep.memory.task = "defend"
        }
        master.doTasks(creep, this.tasks);

    }
};

module.exports = roleDefender;