/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('task.repair');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    name: "master",

    //liste des tâches alternatives à cette tâche (qui vont être faites si la tâche en cours ne peut pas être faite)
    alternatives: [require("task.build"), require("task.feedSpawn")],

    //retourne false quand on ne peux rien faire, true sinon
    do: function(creep) {

    },

    //fonction permettant de passer à la prochaine (retourne true si on va à laprochaine tâche)
    nextTask: function(creep) {}
};