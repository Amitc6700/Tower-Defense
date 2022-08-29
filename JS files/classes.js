class PlacementTile { //constructs the placement tiles
    constructor({ position = { x: 0, y: 0 } }) {
        this.position = position
        this.size = 16 //size of the pixel asset
        this.color = 'rgba(255, 255, 255, .3)' //rgba takes 3 args that determines the color. Using 0-255. A is Alpha 0-1. 0 is transparent, 1 is completely solid
        this.occupied = false
    }

    draw() {
        context.fillStyle = this.color //grabs the color from above
        context.fillRect(this.position.x, this.position.y, this.size, this.size) //draws out the tiles according to their size
    }

    update(mouse) { //checks for mouse collision
        this.draw()

        if (mouse.x > this.position.x &&
            mouse.x < this.position.x + this.size && 
            mouse.y > this.position.y && 
            mouse.y < this.position.y + this.size) { //if the mouse position is greater than the position of the placement tile that is being looped over. Grabs the left, right, up, down, + size of tile
            // console.log('Colliding') // prints colliding when colliding with a placement tile
            this.color = 'white' //turns tile white when hovered over
        }
        else this.color = 'rgba(255, 255, 255, .3)'
    }

}



class Enemy {
    constructor({ position = { x: 0, y: 0 } }) { //constructs the enemy obj
        this.position = position
        this.width = 10 //gives enemy a height and width
        this.height = 10
        this.waypointIndex = 0
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
    }

    draw() { //draw is arbitrarily named. Can be anything
        context.fillStyle = 'red'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update() {
        this.draw()

        const waypoint = waypoints[this.waypointIndex] //grabs the first waypoint array x=0,y=0
        //console.log(waypoints[this.waypointIndex])
        const yDistance = waypoint.y - this.center.y //subtracts the first waypoint, to the new position (bottom of right triangle minus the top of the right triangle). VERY IMPORTANT!!!! use y distance first.
        const xDistance = waypoint.x - this.center.x
        const angle = Math.atan2(yDistance, xDistance) //Trigonometry of a right triangle. Stored in radians (checks the angle of a right triangle)
        this.position.x += Math.cos(angle) //velocities
        this.position.y += Math.sin(angle)
        this.center = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }

        // console.log(Math.round(this.position.x))

        if (Math.round(this.center.x) === Math.round(waypoint.x) &&
            Math.round(this.center.y) === Math.round(waypoint.y) &&
            this.waypointIndex < waypoints.length - 1) {
            this.waypointIndex++
        }
    }
}

class Projectile{
    constructor({position = { x:0, y:0}}) { //classes always need constructors to give it properties. Projectile needs a position argument to work. 0, 0 is basically just a placeholder until a true position is passed through
        this.position = position
        this.velocity = { // doesnt need to be created by position above
            x:0,
            y:0
        }
    }
    draw(){
        context.beginPath() //this path will be an arc
        context.arc(this.position.x, this.position.y, 3, 0, Math.PI * 2) //this allows us to draw an arc to turn into 360 to make a circle. Takes arguments: X position, Y position, radius, radians. Pi =  1/2 circle in radians. x2 that to get full circle
        context.fillStyle = 'orange' //colors it orange
        context.fill() //fills it out
    }
}

class Building { //creates a building when clicked on an active tile. Makes it blue
    constructor({position = {x:0, y:0}}){
        this.position = position
        this.width = 16
        this.height = -32 // - number so it goes up on the grid
        this.center = { 
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        this.projectiles = [
            new Projectile({
                position: {
                    x: this.center.x, // shoots from top right of building
                    y: this.center.y
                }
            })
        ]
    }
    draw(){
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}