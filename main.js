var roles = [require('role.harvester'),
    require('role.upgrader'),
    require('role.builder'),
    require('role.defender')
]
var maintenances = [require('maintenance.roads')]

module.exports.loop = function() {

    //Effacer les données en trop
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    //entrer en safe mode si il y a des enemies dans la salle et que le spawn est à moins de la moitié de vie
    var enemies = Game.spawns['Spawn1'].room.find(FIND_HOSTILE_CREEPS)
    if ((Game.spawns['Spawn1'].hits / Game.spawns['Spawn1'].hitsMax < 0.6) && enemies.length > 0) {
        Game.spawns['Spawn1'].room.activateSafeMode();
        console.error("SAFE MODE ACTIVATED, THERE ARE " + enemies.length + " ENEMIES IN THE ROOM!")
    }

    //création de nouveau Creeps si on est en bas de la quantité optimale
    for (var roleIndex in roles) {
        var role = roles[roleIndex];
        var creepsWithRole = _.filter(Game.creeps, (creep) => creep.memory.role == role.roleName);
        if (creepsWithRole.length < role.optimalQuantity) {
            var roleFirstLetter = role.roleName.charAt(0);
            var creepName = roleFirstLetter + "0";
            for (var i = 0; i < 100; i++) {
                if (Game.creeps[creepName] == undefined) {
                    break;
                } else {
                    creepName = roleFirstLetter + i
                }
            }
            role.create(creepName);
            //var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], creepName, {role: role.roleName});
        }
    }

    //heal ou attack
    var tower = Game.getObjectById('TOWER_ID');
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }

    //effectuer l'action(run) du rôle
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        for (var roleIndex in roles) {
            var role = roles[roleIndex];
            if (creep.memory.role == role.roleName) {
                role.run(creep);
            }
        }
    }

    //si il nous reste du temps, on effectue les maintenances
    for (var maintenanceIndex in maintenances) {
        var maintenance = maintenances[maintenanceIndex]
            //console.log(maintenance.name + ": " + (Game.time % maintenance.tickModulo) + "/" + maintenance.tickModulo)
        if (Game.time % maintenance.tickModulo == 0) {
            maintenance.do(Game.spawns['Spawn1'])
        }
    }
}