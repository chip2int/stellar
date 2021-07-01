const moment = require('moment-timezone');
const snippets = {};

module.exports.postSnippet = async(req, res) => {
    const name = req.body.name;
    const expiresIn = req.body.expires_in;
    const snippet = req.body.snippet;

    const urlBase = 'http://localhost:3001/api/';

    if (!name) {
        res.status(400).send('Missing required parameter name in body');
    }

    if (!expiresIn) {
        res.status(400).send('Missing required parameter expires_in in body');
    }
    if (!snippet) {
        res.status(400).send('Missing required parameter snippet in body');
    }

    try {
        snippets[name] = {
            name,
            url: `${urlBase}${name}`,
            expires_at: moment().add(expiresIn, 'seconds').utc().format(),
            snippet
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
    return res.status(201).json(snippets[name]);
};

module.exports.updateSnippet = async(req, res) => {
    const name = req.params.name;
    let likes, expires_at;
    try {
        if (snippets[name]) {
            likes = snippets[name]['likes'];
            expires_at = snippets[name]['expires_at'];
            snippets[name]['likes'] = likes ? likes + 1 : 1;
            snippets[name]['expires_at'] = moment(expires_at).add(30, 'seconds').utc().format(),
                res.status(200).json(snippets[name]);
        } else {
            res.status(404).send(`Snippet with name ${name} not found.`)
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

module.exports.getSnippet = async(req, res) => {
    const name = req.params.name;
    try {
        if (snippets[name]) {
            if (moment().isBefore(snippets[name]['expires_at'])) {
                res.status(200).json(snippets[name]);
            } else {
                res.status(404).send(`Snippet with name ${name} not found.`)
            }
        } else {
            res.status(404).send(`Snippet with name ${name} not found.`)
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
};