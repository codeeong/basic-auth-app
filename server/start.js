const app = require("./server.js");

app.listen(process.env.PORT || 8080, () => {
  console.log('listening on port 8080...')
});
