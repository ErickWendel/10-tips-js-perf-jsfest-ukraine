const { createReadStream } = require("fs");
const randomReadStream = createReadStream("/dev/urandom");

let dataRead = 0;
(async () => {
  for await (const chunk of randomReadStream) {
    console.log(`Chunk: ${chunk}`);
    dataRead += chunk.length;
  }
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
