
class KruskalMaze {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.screenHeight = 150;
    this.screenWidth = 150;
    this.start = null;
    this.end = null;
    this.maze = [];
    this.tileWidth = Math.floor(this.screenWidth/this.width);
    this.tileHeight = Math.floor(this.screenHeight/this.height);
    this.sets = [];
    this.edges = [];
    this.walls = [];
    for (let i = 0; i < this.width; i++) {
      let column = [];
      let setColumn = [];
      for (let j = 0; j < this.height; j++) {
        let point = new KruskalPoint(i,j);
        column.push(point);
        setColumn.push(new DisjointSet(point));
        if (j > 0) {
          this.edges.push(new Wall(column[j],0));
        }
        if (i > 0) {
          this.edges.push(new Wall(column[j],3));
        }
      }
      this.maze.push(column);
      this.sets.push(setColumn);
    }
    this.edges.sort((a,b) => {return 0.5 - Math.random()});
  }

  resetMaze() {
    this.sets = [];
    this.edges = [];
    this.walls = [];
    for (let i = 0; i < this.width; i++) {
      let setColumn = [];
      for (let j = 0; j < this.height; j++) {
        setColumn.push(new DisjointSet(point));
        this.maze[i][j].value = 0;
        this.maze[i][j].walls[0] = true;
        this.maze[i][j].walls[1] = true;
        this.maze[i][j].walls[2] = true;
        this.maze[i][j].walls[3] = true;
        if (j > 0) {
          this.edges.push(new Wall(this.maze[i][j],0));
        }
        if (i > 0) {
          this.edges.push(new Wall(this.maze[i][j],3));
        }
      }
      this.sets.push(setColumn);
    }
    this.edges.sort((a,b) => {return 0.5 - Math.random()});
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

  kruskalStep() {
    if (this.edges.length > 0) {
      let wall = this.edges.pop();
      let current = wall.point;

      //this.current = wall.point;
      let oppcoord = wall.opposite();
      //console.log(oppcoord);
      let opposite = this.maze[oppcoord[0]][oppcoord[1]];
      let currSet = this.sets[current.x][current.y];
      //console.log(currSet);
      let oppSet = this.sets[opposite.x][opposite.y];
      if (!currSet.hasConnection(oppSet)) {
        //Remove the current wall
        currSet.union(oppSet);
        current.walls[wall.direction] = false;
        opposite.walls[this.oppositeDirection(wall.direction)] = false;
        current.value = 1;
        opposite.value = 1;
      }


    }
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

class KruskalPoint {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.value = 0;
    this.walls = [true, true, true, true]; // North, South, East and West
  }
}

class Wall {
  constructor(point, direction) {
    this.point = point;
    this.direction = direction; // 0 = North, 3 = West
  }

  opposite() {
    var opp = null;
    //console.log(this.point);
    switch(this.direction) {
      case 0:
        opp = [this.point.x,this.point.y-1];
        break;
      case 3:
        opp = [this.point.x-1,this.point.y];
        break;
    }
    //console.log(opp);
    return opp;
  }
}

class DisjointSet {
  constructor(point) {
    this.rank = 0;
    this.parent = this;
    this.data = point;
  }

  union(set) {
    let rep1 = this.findSet();
    let rep2 = set.findSet();
    if (rep1 === rep2){
      return;
    }
    if (rep1.rank < rep2.rank){
      rep1.parent = rep2.parent;
    }
    else {
      if (rep1.rank === rep2.rank) {
        rep1.rank += 1;
      }
      rep2.parent = rep1.parent;
    }
  }

  hasConnection(set){
    if (set.findSet() === this.findSet()){
      return true;
    }
    else{
      return false;
    }

  }

  findSet() {
    if (this.parent === this){
      return this;
    }
    else {
      return this.parent.findSet();
    }
  }
}

/*
let maze = new KruskalMaze(10,10);
while (maze.edges.length > 0) {
  maze.kruskalStep();
}
maze.printMaze();
*/
