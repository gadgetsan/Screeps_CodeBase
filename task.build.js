module.exports = {

    name: "building",

    alternatives: [require("task.upgrade")],

    do: function(creep) {

        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }
            return true;
        } else {

            //console.log(creep.name + ": Nothing to build")
            return false
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