
class PrimMaze {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.screenHeight = 100;
    this.screenWidth = 100;
    this.visited = 1;
    this.frontiers = [];
    this.maze = [];
    this.start = null;
    this.tileWidth = Math.floor(this.screenWidth/this.width);
    this.tileHeight = Math.floor(this.screenHeight/this.height);
    for (let i = 0; i < this.width; i++) {
      let column = [];
      for (let j = 0; j < this.height; j++) {
        column.push(new PrimPoint(i,j));
      }

      this.maze.push(column);
    }

    let start = this.maze[Math.floor(Math.random() * this.width)][Math.floor(Math.random() * this.height)];
    this.start = start;
    this.current = null;
    //this.maze[start.x][start.y].value = 1;
    this.frontierSearch(this.maze[start.x][start.y]);
  }

  resetMaze() {
    this.visited = 1;
    this.frontiers = [];
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.maze[i][j].value = 0;
        this.maze[i][j].walls[0] = true;
        this.maze[i][j].walls[1] = true;
        this.maze[i][j].walls[2] = true;
        this.maze[i][j].walls[3] = true;
      }
    }
    let start = this.maze[Math.floor(Math.random() * this.width)][Math.floor(Math.random() * this.height)];
    this.start = start;
    this.current = null;
    //this.maze[start.x][start.y].value = 1;
    this.frontierSearch(this.maze[start.x][start.y]);
  }

  drawMaze() {
    for (var i = 0; i < this.width; i++){
      for (var j = 0; j < this.height; j++){
        var w = this.tileWidth;
        var h = this.tileHeight;
        var x = i * w;
        var y = j * h;
        noStroke();
        if (this.maze[i][j].value == 0){
          fill(0,0,255,255);
          rect(x,y,x+w,y+h)
        }
        if (this.maze[i][j].value == 1){
          fill(255,255,255,255);
          rect(x,y,x+w,y+h);
        }

        if (this.current != null && i === this.current.x && j === this.current.y){
          fill(0,255,0,255);
          rect(x,y,x+w,y+h);
        }
        fill(255);
        stroke(0);
        if (this.maze[i][j].walls[0]){
          line(x,y,x+w,y);
        }
        if (this.maze[i][j].walls[1]){
          line(x,y+h,x+w,y+h);
        }
        if (this.maze[i][j].walls[2]) {
          line(x+w,y,x+w,y+h);
        }
        if (this.maze[i][j].walls[3]) {
          line(x,y,x,y+h);
        }

      }
    }
  }

  printMaze() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        console.log(this.maze[i][j].value);
      }
    }
  }

  primStep() {
    if (this.frontiers.length > 0){
      if (this.visited === 1){
        this.start.value = 1;
      }
      let current = this.frontiers[Math.floor(Math.random() * this.frontiers.length)];
      this.current = current;
      if (current.value != 1) {
        //Erase walls between cells
        switch(current.direction) {
          case 0:
            current.parent.walls[0] = false;
            current.walls[1] = false;
            break;
          case 1:
            current.parent.walls[1] = false;
            current.walls[0] = false;
            break;
          case 2:
            current.parent.walls[2] = false;
            current.walls[3] = false;
            break;
          case 3:
            current.parent.walls[3] = false;
            current.walls[2] = false;
            break;
        }

        // Mark current as visited
        this.maze[current.x][current.y].value = 1;
        this.frontierSearch(this.maze[current.x][current.y]);
        this.visited++;
      }
      // Remove cell from frontiers list
      this.frontiers.splice(this.frontiers.indexOf(current),1);

    }

  }

  frontierSearch(point) {

    //North Frontier
    if (point.y > 0 && this.maze[point.x][point.y-1].value != 1) {
      this.maze[point.x][point.y-1].parent = point;
      this.maze[point.x][point.y-1].direction = 0;
      this.frontiers.push(this.maze[point.x][point.y-1]);
    }
    //South Frontier
    if (point.y < this.height-1 && this.maze[point.x][point.y+1].value != 1) {
      this.maze[point.x][point.y+1].parent = point;
      this.maze[point.x][point.y+1].direction = 1;
      this.frontiers.push(this.maze[point.x][point.y+1]);
    }
    //East Frontier
    if (point.x < this.width-1 && this.maze[point.x+1][point.y].value != 1) {
      this.maze[point.x+1][point.y].parent = point;
      this.maze[point.x+1][point.y].direction = 2;
      this.frontiers.push(this.maze[point.x+1][point.y]);
    }
    //West Frontier
    if (point.x > 0 && this.maze[point.x-1][point.y].value != 1) {
      this.maze[point.x-1][point.y].parent = point;
      this.maze[point.x-1][point.y].direction = 3;
      this.frontiers.push(this.maze[point.x-1][point.y]);
    }
  }

}

class PrimPoint {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.direction = -1;
    this.parent = null;
    this.value = 0;
    this.walls = [true,true,true,true]; // North, South, East, West
  }
}
