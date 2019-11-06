const http = require("http");
http
  .createServer((req, res) => {
    const result = Array.from({ length: 1000 }, () =>
      Math.floor(Math.random() * 40)
    ).reduce((p, n) => p + n, 0);

    res.end(JSON.stringify({ result }));
  })
  .listen(3000, () => console.log("running at 3000"));
