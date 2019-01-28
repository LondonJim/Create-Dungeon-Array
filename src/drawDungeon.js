class DrawDungeon {

  constructor(){
    this.backgroundCanvas = document.getElementById("backgroundCanvas")
    this.ctxBackground = this.backgroundCanvas.getContext("2d")

    this.gameCanvas = document.getElementById("canvas")
    this.ctxGame = this.gameCanvas.getContext("2d")

    this.sprites = new Image()
    this.sprites.src = "./img/fantasy-tileset.png"
  }

  drawLevel(level) {
    this.sprites.onload = function() {
      this.drawBackground()
      let posX = 0
      let posY = 0
      for (let x = 0; x < level[0].length; x++){
        for (let y = 0; y < level.length; y++) {
          if (level[y][x] === 1) {
            this.ctxGame.drawImage(this.sprites, 64, 32, 32, 32, posX, posY, 32, 32)
          } else if (level[y][x] === 2) {
            this.ctxGame.drawImage(this.sprites, 192, 64, 32, 32, posX, posY, 32, 32)
          } else if (level[y][x] === 3) {
            this.ctxGame.drawImage(this.sprites, 0, 128, 32, 32, posX, posY, 32, 32)
          } else if (level[y][x] === 4) {
            this.ctxGame.drawImage(this.sprites, 192, 32, 32, 32, posX, posY, 32, 32)
          } else if (level[y][x] === 5) {
            this.ctxGame.drawImage(this.sprites, 160, 32, 32, 32, posX, posY, 32, 32)
          }
          posY += 32

        }
        posY = 0
        posX += 32
      }
    }.bind(this)
  }

  drawBackground() {
    this.ctxBackground.fillStyle = 'DarkOliveGreen'
      this.ctxBackground.strokestyle = 'black'
      this.ctxBackground.fillRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height)
      this.ctxBackground.strokeRect(0, 0, this.backgroundCanvas.width, this.backgroundCanvas.height)
  }

}
