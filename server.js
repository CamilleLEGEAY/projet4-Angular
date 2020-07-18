const express = require('express');
const app = express();

const cors = require('cors'); //<-- required installing 'cors' (npm i cors --save)
app.use(cors());

app.use(express.static('./dist/projet4-angular'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/projet4-angular/'});
  });

app.listen(process.env.PORT || 8080);