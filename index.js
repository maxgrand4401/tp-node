var express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');

var hostname = 'localhost'; 
var port = 3000; 
 
var app = express();

var content;

var dict;

fs.readFile('api.json', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;
    dict = JSON.parse(content);
});
/* API */
app.get('/api', (req, res) => {
    res.status(200).send(dict);
});

app.put('/api', (req, res) => {
    var user_id = req.body.user.id;
    var user_name = req.body.user.name;
    var password = req.body.user.passord;
    var item_id = req.body.items.id;
    var label = req.body.items.label;
    var image = req.body.items.image;
    var description = req.body.items.description;
    var list_id = req.body.list.id;
    var list_name = req.body.list.name;
    var user = req.body.list.user;
    var items = req.body.list.items;
    dict.user.id = user_id;
    dict.user.name = user_name
    dict.user.password = password;
    dict.items.id = item_id;
    dict.items.label = label;
    dict.items.image = image;
    dict.items.description = description;
    dict.list.id = list_id;
    dict.list.name = list_name;
    dict.list.user = user;
    dict.list.items = items;
    fs.writeFile('api.json', JSON.stringify(dict, null, 4), (err) => {
	    if (err) throw err;
    });
    res.status(200).send(data);
});


/* CRUD */
app.use('/', express.static('app'));

app.get('*', function(req, res) {  
    res.sendFile('index.html');
});

app.listen(3000);