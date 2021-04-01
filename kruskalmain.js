let maze = new KruskalMaze(10,10);
let stepbutton;
let runbutton;
let resetbutton;
let canvas;
function setup() {
  canvas = createCanvas(maze.screenWidth, maze.screenHeight);
  maze.drawMaze();
  stepbutton = createButton('Step');
  runbutton = createButton('Run');
  resetbutton = createButton('Reset');
  resetbutton.position(0,160);
  stepbutton.position(50,160);
  runbutton.position(93,160);
  resetbutton.mousePressed(drawReset);
  stepbutton.mousePressed(drawStep);
  runbutton.mousePressed(drawRun);

  //Styling
  //canvas.style("padding","30px");
  resetbutton.style("background-color","#45A29E");
  stepbutton.style("background-color","#45A29E");
  runbutton.style("background-color","#45A29E");
  resetbutton.style("color","white");
  stepbutton.style("color","white");
  runbutton.style("color","white");
  resetbutton.style("text-align","center");
  stepbutton.style("text-align","center");
  runbutton.style("text-align","center");
  resetbutton.style("border","none");
  stepbutton.style("border","none");
  runbutton.style("border","none");
  resetbutton.style("margin","5px");
  stepbutton.style("margin","5px");
  runbutton.style("margin","5px");
  frameRate(60);
}

function drawStep() {
  background('blue');
  if (maze.edges.length > 0) {
    maze.kruskalStep();
    maze.drawMaze();
  }
  else {
    maze.drawMaze();
  }
}

async function drawRun() {
  while (maze.edges.length > 0) {
    maze.kruskalStep();
    maze.drawMaze();
    await sleep(50);
  }
}

function drawReset() {
  maze.resetMaze();
  maze.drawMaze();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
