const express = require('express');
const app = express();

app.use(express.static('./dist/rlef'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/rlef/'});
  });

app.listen(8080);