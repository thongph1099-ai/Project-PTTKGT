const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());

// serve frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.post("/bfs", (req, res) => {
  const { grid, start, end } = req.body;

  const rows = grid.length;
  const cols = grid[0].length;

  let input = `${rows} ${cols}\n`;

  for (let i = 0; i < rows; i++) {
    input += grid[i].join(" ") + "\n";
  }

  input += `${start.x} ${start.y}\n`;
  input += `${end.x} ${end.y}\n`;

  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  const inputPath = path.join(dataDir, "input.txt");
  fs.writeFileSync(inputPath, input);

  const exePath = path.join(__dirname, "algorithm", "bfs.exe");

  exec(`type ${inputPath} | "${exePath}"`, (err, stdout, stderr) => {
    if (err) {
      console.error("ERR:", err);
      return res.status(500).send("Exec error");
    }

    console.log("OUTPUT:", stdout);

    const lines = stdout.trim().split("\n");
    const pathResult = [];

    for (let i = 1; i < lines.length; i++) {
      const [x, y] = lines[i].split(" ").map(Number);
      pathResult.push({ x, y });
    }

    res.json({ path: pathResult });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));