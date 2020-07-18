const express = require('express');
const app = express();

app.use(express.static(__dirname+'./dist/projet4-angular'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname+'/dist/projet4-angular/'));
  });

app.listen(process.env.PORT || 8080);