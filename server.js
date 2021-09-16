var compression = require('compression')
const express = require('express')
const path = require('path')

const app = express()
let port = process.env.PORT || 3000

app.use(compression())

app.use(express.static(path.join(__dirname, 'build')));


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const server = app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
});

process.on('SIGINT', function(code) {  
  server.close();
});