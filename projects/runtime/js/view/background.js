var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        var tree;
        var buildings = [];
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO: 2 - Part 2
            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            var backgroundFill = draw.rect(canvasWidth,canvasHeight,'lightpurple');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
             var moon = draw.bitmap('img/moon.png');
                 moon.x = canvasWidth / 1.2;
                 moon.y = canvasHeight / 8;
                 moon.scaleX = 0.5;
                 moon.scaleY = 0.5;
             background.addChild(moon);

             var stars = [];
            for (var sCount = 0; sCount <= 10; sCount++) {
                var randStar = Math.floor(Math.random() * 3);
                var starY = (Math.floor(Math.random() * groundY)) - 25;
                var starX = Math.floor(Math.random() * canvasWidth);
                if (randStar == 0) {
                    stars[sCount] = draw.bitmap('img/star.png');
                }
                if (randStar == 1) {
                    stars[sCount] = draw.bitmap('img/star.png');
                }
                if (randStar == 2) {
                    stars[sCount] = draw.bitmap('img/star.png');
                }
                stars[sCount].x = canvasWidth - starX;
                stars[sCount].y = starY;
                stars[sCount].scaleX = 0.2;
                stars[sCount].scaleY = 0.2;
                background.addChild(stars[sCount]);
            }
             
            // TODO 5: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            var color = "#" + ((1<<24)*Math.random() | 0).toString(16)
            for(var i = 0; i < 7; ++i) {
            var buildingHeight = Math.floor(Math.random() * (300 - 100) + 100);
            var building = draw.rect(75,buildingHeight, color, 'lightgray', 5);
                building.x = 200*i;
                building.y = groundY-buildingHeight;
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
             tree = draw.bitmap('img/tree.png');
             tree.x = 1000;
             tree.y = canvasHeight/7;
             background.addChild(tree);
            
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree

             tree.x = tree.x - 3;

            if(tree.x < -200) {
            tree.x = canvasWidth;
            } 
            // TODO 5: Part 2 - Parallax
             for(var i = 0; i < buildings.length; i++) {
                buildings[i].x -= 1; 

                if (buildings[i].x < -100) {
                buildings[i].x = canvasWidth;
                }
            }   
        
            
        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
