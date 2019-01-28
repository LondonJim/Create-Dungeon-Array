class CreateDungeonLvl {

  constructor(width = 20,   height = 13,
              maxHallLength = 15, halls = 30,
              anyUptoLength = true, roomChance = 30,
              doorChance = 10, totalItems = 4) {
    this.width = width
    this.height = height
    this.maxHallLength = maxHallLength
    this.halls = halls
    this.anyUptoLength = anyUptoLength
    this.roomChance = roomChance
    this.doorChance = doorChance
    this.totalItems = totalItems
    this.startingPoint = []
    this.direction = [[0,-1],[1,0],[0,1],[-1,0]]
    this.level = Array.from(Array(this.height), () => Array.from(Array(this.width), () => 1))
  }

  create() {
    this.addWallsFloor()
    this.populate()
    this.entrance()
    this.exit()
    return this.level
  }

  addWallsFloor() {
    let drawingPoint = [Math.floor(Math.random() * (this.height - 2)) + 1,
                        Math.floor(Math.random() * (this.width - 2)) + 1]
    this.startingPoint = Object.assign({}, drawingPoint)
    let setDirection
    let spaces = 0

    for (let h = 1; h < this.halls; h++ ) {
      setDirection = this.direction[Math.floor(Math.random() * 4)]

      for (let hl = 1; hl < Math.floor(Math.random() * this.maxHallLength + 1); hl++) {
        drawingPoint[0] = drawingPoint[0] + setDirection[0]
        drawingPoint[1] = drawingPoint[1] + setDirection[1]
        if (drawingPoint[0] <= 0) drawingPoint[0] = 1
        if (drawingPoint[1] <= 0) drawingPoint[1] = 1
        if (drawingPoint[0] >= this.height - 1) drawingPoint[0] = this.height - 2
        if (drawingPoint[1] >= this.width - 1) drawingPoint[1] = this.width - 2

        this.level[drawingPoint[0]][drawingPoint[1]] = 0
      }

      if (this.randomReturn(this.roomChance) && this.isInnerDraw(drawingPoint)) {
        for (let x = -1; x < 2; x++) {
          for (let y = -1; y < 2; y++) {
            this.level[drawingPoint[0] + x][drawingPoint[1] + y] = 0
          }
        }
        spaces++
      }
      this.exitPoint = drawingPoint
    }
  }

  hallLength() {
    if (this.anyUptoLength) {
      return Math.floor(Math.random() * this.maxHallLength + 1)
    } else {
      return this.maxHallLength + 1
    }
  }

  isInnerDraw(drawingPoint) {
    return (drawingPoint[0] > 1 &&
            drawingPoint[1] > 1 &&
            drawingPoint[0] < this.height - 2 &&
            drawingPoint[1] < this.width - 2)
  }

  populate() {
    for (let x = 2; x < this.level[0].length - 2; x++) {
      for (let y = 2; y < this.level.length - 2; y++) {
        this.checkItem(x, y)
        this.checkDoor(x, y)
      }
    }
  }

  checkItem(x, y) {
    let placeItem = [this.itemCoordinate(this.height),
                     this.itemCoordinate(this.width)]
    if (this.level[placeItem[0]][placeItem[1]] === 0 && this.totalItems > 0) {
      this.level[placeItem[0]][placeItem[1]] = 3
      this.totalItems--
    } else if (this.totalItems <= 0) {
      return
    } else {
      this.checkItem(x, y)
    }
  }

  itemCoordinate(axis){
    return Math.floor(Math.random() * (axis - 2)) + 1
  }

  checkDoor(x, y) {
    if (this.randomReturn(this.doorChance) && this.isCanDrawDoor(x, y)) {
      this.level[y][x] = 2
    }
  }

  isCanDrawDoor(x, y) {
    return (((this.level[y - 1][x] === 1 && this.level[y + 1][x] === 1) &&
            (this.level[y][x - 1] === 0 && this.level[y][x + 1] === 0)) ||
            ((this.level[y - 1][x] === 0 && this.level[y + 1][x] === 0) &&
            (this.level[y][x - 1] === 1 && this.level[y][x + 1] === 1)))
  }

  entrance() {
    this.level[this.startingPoint[0]][this.startingPoint[1]] = 4
  }

  exit() {
    if (this.level[this.exitPoint[0]][this.exitPoint[1]] === 4) {
      if (this.exitPoint[0] < 2) {
        this.level[this.exitPoint[0] + 1][this.exitPoint[1]] = 5
      } else if (this.exitPoint[0] > this.width - 2) {
        this.level[this.exitPoint[0] - 1][this.exitPoint[1]] = 5
      } else if (this.exitPoint[1] < 2) {
        this.level[this.exitPoint[0]][this.exitPoint[1] + 1] = 5
      } else {
        this.level[this.exitPoint[0]][this.exitPoint[1] - 1] = 5
      }
    } else {
      this.level[this.exitPoint[0]][this.exitPoint[1]] = 5
    }
  }

  randomReturn(chance) {
    return (Math.floor(Math.random() * 100) < chance)
  }
}
