var fs = require("fs");
var readline = require("readline");

var requestFiles = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
var files = [];
var colors = ["\x1b[35m%s\x1b[0m", "\x1b[32m%s\x1b[0m"];
requestFiles.question("Type the path to your target file: ", (answer) =>
  requestFiles.question("Type the path to your base file: ", (answerTwo) => {
    files = [answer, answerTwo];
    var lines = [];
    var mainFileLines = [];
    var input;

    files.forEach((path, index) => {
      input = readline.createInterface({
        input: fs.createReadStream(path),
        output: process.stdout,
        terminal: false,
      });
      input.on("line", (line) => {
        line = line.trim();
        if (index == 0) mainFileLines.push(line);
        else lines.push(line);
      });
    });

    input.on("close", () => {
      console.log("\n");
      mainFileLines.forEach((line, number) => {
        if (lines.includes(line)) {
          console.log(colors[1], `${number + 1} - ${line}`);
        } else {
          console.log(colors[0], `${number + 1} - ${line}`);
        }
      });
      console.log("\n legend: ");
      console.log(colors[0], "  lines with this color " + "- NOT MATCH");
      console.log(colors[1], "  lines with this color " + "- MATCH");
    });
    requestFiles.close();
  })
);
