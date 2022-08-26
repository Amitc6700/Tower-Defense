const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d') //tells the HTML this will be a 2D space 

canvas.width = 320 //canvas width derived from the tile tool
canvas.height = 320 //canvas height derived from the tile tool

context.fillStyle = 'white' //Fills the rectangle with the white color
context.fillRect(0, 0, canvas.width, canvas.height)

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
    enemies.push(new Enemy({position: {x: -40.3333333333333 - xOffset, y: 73} }))
}

function animate(){ //animation function
    requestAnimationFrame(animate) //allows frame refreshes

    context.drawImage(image, 0, 0) //Our map
    enemies.forEach(enemy =>{
        enemy.update()
    })
}

