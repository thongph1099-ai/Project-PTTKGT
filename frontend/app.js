const rows = 15;
const cols = 30;

let grid = [];
let robot = { x: 0, y: 0 };
let startPos = { x: 0, y: 0 };
let target = null;

const gridDiv = document.getElementById("grid");

function createGrid() {
  for (let i = 0; i < rows; i++) {
    grid[i] = [];
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;

      const cell = document.createElement("div");
      cell.classList.add("cell");

      cell.dataset.row = i;
      cell.dataset.col = j;

      cell.onclick = () => handleClick(i, j);

      gridDiv.appendChild(cell);
    }
  }
  draw();
}

createGrid();

function handleClick(i, j) {
  // nếu là robot thì bỏ qua
  if (i === robot.x && j === robot.y) return;

  // toggle kệ
  grid[i][j] = grid[i][j] === 0 ? 1 : 0;

  // chọn target
  target = { x: i, y: j };

  draw();
}

function draw() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach(cell => {
    const i = cell.dataset.row;
    const j = cell.dataset.col;

    cell.className = "cell";

    if (grid[i][j] === 1) {
      cell.classList.add("block");
    }

    if (i == robot.x && j == robot.y) {
      cell.classList.add("robot");
    }

    if (target && i == target.x && j == target.y) {
      cell.classList.add("target");
    }
  });
}

function startBFS() {
  if (!target) return;

  let path = bfs(robot, target);

  let i = 0;
  let interval = setInterval(() => {
    if (i >= path.length) {
      clearInterval(interval);
      return;
    }

    robot = path[i];
    draw();
    i++;
  }, 100);
}

async function startBFS() {
  if (!target) return;

  const res = await fetch("http://localhost:3000/bfs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grid,
      start: robot,
      end: target,
    }),
  });

  const data = await res.json();
  const path = data.path;

  let i = 0;
  let interval = setInterval(() => {
    if (i >= path.length) {
      clearInterval(interval);
      return;
    }

    robot = path[i];
    draw();
    i++;
  }, 100);
}

function resetRobot() {
  robot = { ...startPos };
  draw();
}