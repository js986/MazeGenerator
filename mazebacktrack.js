class MazeBackTrack {
  constructor(width, height){
    this.width = width;
    this.height = height;
    this.maze = [];
    this.stack = [];
    this.screenHeight = 150;
    this.screenWidth = 150;
    this.visited = 1;
    this.tileWidth = Math.floor(this.screenWidth/this.width);
    this.tileHeight = Math.floor(this.screenHeight/this.height);
    this.wallWidth = 1;
    for (var i = 0; i < this.width; i++) {
      var column = [];
      for (var j = 0; j < this.height; j++) {
        column.push(new Point(i,j));
      }

      this.maze.push(column);
    }
    var start = this.maze[Math.floor(Math.random() * this.width)][Math.floor(Math.random() * this.height)];
    this.current = null;
    //this.maze[start.x][start.y].value = 1;
    this.stack.push(start);
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
        if (this.maze[i][j].walls[0]){ //North
          line(x,y,x+w,y);
        }
        if (this.maze[i][j].walls[1]){ //South
          line(x,y+h,x+w,y+h);
        }
        if (this.maze[i][j].walls[2]) { //East
          line(x+w,y,x+w,y+h);
        }
        if (this.maze[i][j].walls[3]) { //West
          line(x,y,x,y+h);
        }
      }
    }
  }

  resetMaze() {
    this.stack = [];
    this.visited = 1;
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        this.maze[i][j].value = 0;
        this.maze[i][j].walls[0] = true;
        this.maze[i][j].walls[1] = true;
        this.maze[i][j].walls[2] = true;
        this.maze[i][j].walls[3] = true;
      }
    }
    var start = this.maze[Math.floor(Math.random() * this.width)][Math.floor(Math.random() * this.height)];
    this.current = null;
    //this.maze[start.x][start.y].value = 1;
    this.stack.push(start);

  }

  backtrackStep(){
    if (this.stack.length > 0){
      let current = this.stack.pop();
      let neighbors = this.neighbors(current);
      this.current = current;
      this.maze[current.x][current.y].value = 1;
      if (neighbors.length > 0){
        this.stack.push(current);
        let nextDirection = neighbors[Math.floor(Math.random() * (neighbors.length))];
        let newPoint = new Point(current.x,current.y);
        switch(nextDirection){
          case 0: // North Neighbor
            newPoint = this.maze[current.x][current.y-1];
            this.maze[current.x][current.y].walls[0] = false;
            this.maze[current.x][current.y-1].walls[1] = false;
            break;
          case 1: // South Neighbor
            newPoint = this.maze[current.x][current.y+1];
            this.maze[current.x][current.y].walls[1] = false;
            this.maze[current.x][current.y+1].walls[0] = false;
            break;
          case 2: // East Neighbor
            newPoint = this.maze[current.x+1][current.y];
            this.maze[current.x][current.y].walls[2] = false;
            this.maze[current.x+1][current.y].walls[3] = false;
            break;
          case 3: // West Neighbor
            newPoint = this.maze[current.x-1][current.y];
            this.maze[current.x][current.y].walls[3] = false;
            this.maze[current.x-1][current.y].walls[2] = false;
            break;
        }
        this.maze[newPoint.x][newPoint.y].value = 1;
        this.visited++;
        this.current = newPoint
        this.stack.push(newPoint);

      }

    }
  }

  isVisited(point){
    if (point.value == 1 || point.value == 2){
      return true;
    }
    else{
      return false;
    }
  }

  neighbors(point){
    var n = [];
    //North Neighbor
    if (point.y > 0 && this.maze[point.x][point.y-1].value != 1) {
      n.push(0);
    }
    //South Neighbor
    if (point.y < this.height-1 && this.maze[point.x][point.y+1].value != 1) {
      n.push(1);
    }
    //East Neighbor
    if (point.x < this.width-1 && this.maze[point.x+1][point.y].value != 1) {
      n.push(2);
    }
    //West Neighbor
    if (point.x > 0 && this.maze[point.x-1][point.y].value != 1) {
      n.push(3);
    }
    return n;
  }

  oppositeDirection(dir) {
    let opp = -1;
    switch(dir) {
      case 0:
        opp = 1;
        break;
      case 1:
        opp = 0;
        break;
      case 2:
        opp = 3;
        break;
      case 3:
        opp = 2;
        break;
    }
    return opp;
  }

}

class Point {
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.value = 0;
    this.walls = [true, true, true, true]; // Represents South and East walls of cell
  }
}
