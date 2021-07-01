const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./src/routes.js');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/api/snippets/:name', async(req, res) => routes.getSnippet(req, res));
app.post('/api/snippets', async(req, res) => routes.postSnippet(req, res));
app.post('/api/snippets/:name/like', async(req, res) => routes.updateSnippet(req, res));