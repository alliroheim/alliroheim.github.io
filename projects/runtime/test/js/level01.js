var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE

        //Obstacle creation
        function createSawBlade (x, y) {
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        sawBladeHitZone.x = x;
        sawBladeHitZone.y = y;
        game.addGameItem(sawBladeHitZone);    
        var obstacleImage = draw.bitmap('img/sawblade.png');
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        sawBladeHitZone.addChild(obstacleImage);
        }
        
        function createGroo (x, y) {
        var hitZoneSize = 25;
        var damageFromObstacle = 10;
        var grooHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
        grooHitZone.x = x;
        grooHitZone.y = y;
        game.addGameItem(grooHitZone);    
        var obstacleImage = draw.bitmap('img/groo2.png');
        obstacleImage.x = -25;
        obstacleImage.y = -25;
        grooHitZone.addChild(obstacleImage);
        }
        
          function createEnemy (x, y) {
        var enemy = game.createGameItem('enemy',25);
        var redSquare = draw.rect(50,50,'red');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
        enemy.x = x;
        enemy.y = y;
        game.addGameItem(enemy);
        enemy.velocityX = -1;
        rotationVelocity = 10;

            enemy.onPlayerCollision = function() {
                game.changeIntegrity(-10);
            };
            enemy.onProjectileCollision = function() {
                enemy.fadeOut();
            game.increaseScore(100);
            }
        }

        function createReward (x, y) {
        var reward = game.createGameItem('reward',25);
        var greenSquare = draw.rect(50,50,'green');
        greenSquare.x = -25;
        greenSquare.y = -25;
        reward.addChild(greenSquare);
        reward.x = x;
        reward.y = y;
        game.addGameItem(reward);
        reward.velocityX = -0.75;
        rotationVelocity = 10;

            reward.onPlayerCollision = function() {
                game.changeIntegrity(100);
                game.increaseScore(100);
                reward.fadeOut();
            }
        }
        //functions calls
        createSawBlade(200, 200);
        createSawBlade(250, 250);
        createSawBlade(300, 300); 

        createGroo(320, 320);

        createEnemy(250, 300);

        createReward(460, 300);
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
