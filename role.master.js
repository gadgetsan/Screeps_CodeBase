/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.master');
 * mod.thing == 'a thing'; // true
 */

module.exports = {

    doTasks: function(creep, tasks) {
        //on regarde si notre creep effectuais deja une tâche, si oui il continue
        if (creep.memory.task != undefined) {
            var curentTask = creep.memory.task;
            var doNextTask = false;

            var taskFound = true;
            for (var i in tasks) {
                var task = tasks[i];
                if (task.name == creep.memory.task) {
                    taskFound = true;
                    //si on peux faire la tâche on la fait, sinon
                    var taskInProgress = task.do(creep)
                    if (!taskInProgress) {
                        task = this.doAltTask(creep, task.alternatives)
                    }
                    doNextTask = task.nextTask(creep)

                }
                //Si il as terminé sa tâche, il passe à la prochaine
                if (doNextTask) {
                    var nextTask = undefined;
                    var newTaskIndex = parseInt(i) + 1
                    if (newTaskIndex >= tasks.length) {
                        nextTask = tasks[0]
                    } else {
                        nextTask = tasks[newTaskIndex]
                    }
                    creep.say(nextTask.name);
                    creep.memory.task = nextTask.name;
                }
            }
            if (!taskFound) {
                //si sa tâche n'existe plus, on recommence à zero
                creep.say("my last task no longer exists: " + creep.memory.task);
                creep.memory.task = tasks[0].name;
            }
        } else {
            //sinon, on lui assigne la première tâche TODO: on perd un tour en lui assignant une tâche
            creep.memory.task = tasks[0].name;
        }
    },

    doAltTask: function(creep, alternatives) {
        for (var i in alternatives) {
            var altTask = alternatives[i];
            if (altTask.do(creep)) {
                return altTask;
            }
        }
        console.log(creep.name + ": cannot find alternatives to " + creep.memory.task + " upgrading then")
        return require("task.upgrade")
    }

};