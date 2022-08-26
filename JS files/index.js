const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d') //tells the HTML this will be a 2D space 

canvas.width = 320 //canvas width derived from the tile tool
canvas.height = 320 //canvas height derived from the tile tool

context.fillStyle = 'white' //Fills the rectangle with the white color
context.fillRect(0, 0, canvas.width, canvas.height)

//console.log(placementTilesData)
const placementTilesData2D = [] //creates an array variable

for (let i=0; i < placementTilesData.length; i+=20){ //For loop that will separate the first 20 items of the array and make them their own array and so on
    placementTilesData2D.push(placementTilesData.slice(i, i+20)) //The 20 is gathered from the amount of tiles on the top of the map (20 tiles). Results should be 20 arrays with 20 data points
}

class PlacementTile{ //constructs the placement tiles
    constructor({position = {x: 0, y: 0}}){
        this.position = position
        this.size = 16 //size of the pixel asset
    }
    draw(){
        context.fillRect(this.position.x, this.position.y, this.size, this.size) //draws out the tiles according to their size
    }
}

const placementTiles = [] //creates a blank array for placementTiles (will be used below)

placementTilesData2D.forEach((row,y)=>{ //using each row, grab the Y coordinate
    row.forEach((symbol, x)=>{  //for each symbol,grab the x coord
        if (symbol === 389){ //Symbol is looking for a specific symbol in the data. In this case, 389 (the code for a placement tile)
            //add building placement tile here
            placementTiles.push(new PlacementTile({
               position: {
                x: x * 16,  
                y: y * 16 //Y * 16 (the tile size this places it along the Y axis)
               }  // should console.log out 68 placement tiles
            }))
        }
    })
})

console.log(placementTiles)

const image = new Image() //creates a new image object

image.onload = () =>{ //loads the image onto the html
   animate()
}
image.src ='img/gameMap.png' //calls the source of the image

class Enemy {
    constructor({position = {x: 0, y: 0}}){ //constructs the enemy obj
        this.position = position
        this.width = 10 //gives enemy a height and width
        this.height = 10
        this.waypointIndex = 0
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
    }

    draw(){ //draw is arbitrarily named. Can be anything
    context.fillStyle ='red'
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()

        const waypoint = waypoints[this.waypointIndex] //grabs the first waypoint array x=0,y=0
        //console.log(waypoints[this.waypointIndex])
        const yDistance = waypoint.y - this.center.y //subtracts the first waypoint, to the new position (bottom of right triangle minus the top of the right triangle). VERY IMPORTANT!!!! use y distance first.
        const xDistance = waypoint.x - this.center.x
        const angle = Math.atan2(yDistance, xDistance) //Trigonometry of a right triangle. Stored in radians (checks the angle of a right triangle)
        this.position.x +=Math.cos(angle) //velocities
        this.position.y +=Math.sin(angle)
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }

       // console.log(Math.round(this.position.x))

        if (Math.round(this.center.x) === Math.round(waypoint.x) &&
            Math.round(this.center.y) === Math.round(waypoint.y)&&
            this.waypointIndex < waypoints.length - 1){
            this.waypointIndex++
        }
    }
}
const enemies = []
for (let i = 0; i < 10; i++){
    const xOffset = i * 50
    enemies.push(new Enemy({position: {x: waypoints[0].x - xOffset, y: waypoints[0].y} }))
}

function animate(){ //animation function
    requestAnimationFrame(animate) //allows frame refreshes

    context.drawImage(image, 0, 0) //Our map
    enemies.forEach(enemy =>{
        enemy.update()
    })
}

