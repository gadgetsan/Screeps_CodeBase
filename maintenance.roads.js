module.exports = {

    tickModulo: 1000,

    name: "Road Creation",

    do: function(spawn) {
        //pour le spawn, on fait une route tout le long du chemin pour se rendre
        //a l'upgrader et aux ressources
        var ressources = spawn.room.find(FIND_SOURCES)
        console.log("adding roads for " + ressources.length + " ressources")
        for (var i in ressources) {
            var ressource = ressources[i]
            var path = spawn.room.findPath(spawn.pos, ressource.pos)

            for (var j in path) {
                var pathElement = path[j]
                console.log(pathElement)
                spawn.room.createConstructionSite(pathElement.x, pathElement.y, STRUCTURE_ROAD)
            }
        }


        var controllerPath = spawn.room.findPath(spawn.pos, spawn.room.controller.pos)
        for (var k in controllerPath) {
            var pathPos = controllerPath[k]
            spawn.room.createConstructionSite(pathPos.x, pathPos.y, STRUCTURE_ROAD)
        }
    }
};