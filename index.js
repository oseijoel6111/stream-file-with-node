const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    const file = fs.readFileSync("./index.html");
    res.write(file);
    res.end();
  } else if (req.url == "/send-data") {
    const userFile = req.headers["file-name"];
    console.log(userFile);
    req.on("data", (chunk) => {
      fs.appendFileSync(userFile, chunk);
    });
    res.end()       
  }
});

server.listen(2000, () => {
  console.log(`Server started on http://localhost:${2000}`);
});
