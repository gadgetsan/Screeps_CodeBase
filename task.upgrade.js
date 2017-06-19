module.exports = {

    name: "upgrading",

    alternatives: [],

    do: function(creep) {

        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
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