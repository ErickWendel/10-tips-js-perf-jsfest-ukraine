/*
node -p "Buffer.allocUnsafe(666e6).toString()" >  big.file
*/
const {
  readFileSync,
  createReadStream,
  promises: { stat, readFile }
} = require("fs");
const randomReadStream = createReadStream("./big.file");

let dataRead = 0;
(async () => {
  const { size } = await stat("./big.file");
  console.log("the file size is", formatBytes(size));
  for await (const chunk of randomReadStream) {
    console.log(`An empty line was read at ${new Date().toISOString()}`);
    dataRead += chunk.length;
  }
  console.log("Data read", formatBytes(dataRead));
})();

process.on("SIGINT", () => {
  console.log("Data read", formatBytes(dataRead));
  process.exit(0);
});

const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
