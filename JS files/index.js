const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d') //tells the HTML this will be a 2D space 

canvas.width = 320 //canvas width derived from the tile tool
canvas.height = 320 //canvas height derived from the tile tool

context.fillStyle = 'white' //Fills the rectangle with the white color
context.fillRect(0, 0, canvas.width, canvas.height)

//console.log(placementTilesData)
const placementTilesData2D = [] //creates an array variable

for (let i = 0; i < placementTilesData.length; i += 20) { //For loop that will separate the first 20 items of the array and make them their own array and so on
    placementTilesData2D.push(placementTilesData.slice(i, i + 20)) //The 20 is gathered from the amount of tiles on the top of the map (20 tiles). Results should be 20 arrays with 20 data points
}


const placementTiles = [] //creates a blank array for placementTiles (will be used below)

placementTilesData2D.forEach((row, y) => { //using each row, grab the Y coordinate
    row.forEach((symbol, x) => {  //for each symbol,grab the x coord
        if (symbol === 389) { //Symbol is looking for a specific symbol in the data. In this case, 389 (the code for a placement tile)
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

image.onload = () => { //loads the image onto the html
    animate()
}
image.src = 'img/gameMap.png' //calls the source of the image

const enemies = []
for (let i = 0; i < 10; i++) {
    const xOffset = i * 50
    enemies.push(new Enemy({ position: { x: waypoints[0].x - xOffset, y: waypoints[0].y } }))
}

function animate() { //animation function
    requestAnimationFrame(animate) //allows frame refreshes

    context.drawImage(image, 0, 0) //Our map
    enemies.forEach((enemy) => {
        enemy.update()
    })
    placementTiles.forEach((tile) => {
        tile.update(mouse)
    })
}

const mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', (event) => { //looks for a mouse move event. Moves through an event object
    //console.log(event) this will show all mouse movement events
    mouse.x = event.clientX
    mouse.y = event.clientY
}) 