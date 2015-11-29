// Simple REST API Handler (in memory)
// Built by Yaron Biton misterBIT.co.il?en

var express = require('express'),
  http = require('http'),
  utils = require('./lib/utils.js');

require('colors');

var cache = {};
function getObjList(objType) {
	if (!cache[objType]) {
		cache[objType] = require('./data/'+objType+'/list.json');
		// cl("Loaded from file: " + objType);
	}//  else cl("List found in Memory:" + objType);
	return cache[objType];
}

var app = express()
  .use(express.bodyParser())
  .use(express.static('public'));


app.get('/api/:objType', function  (req, res) {
	var objs = getObjList(req.params.objType);
	cl("Returning list of " + objs.length + " " + req.params.objType + "s");
	res.json(objs);
});

app.get('/api/:objType/:id', function  (req, res) {
	var objs = getObjList(req.params.objType);
	var index = findIndexForId(objs, req.params.id);
	cl("GET for single " + req.params.objType);
	res.json(objs[index]);
});

app.put('/api/:objType/:id', function  (req, res) {
	var objs = getObjList(req.params.objType);
    //obj.id = parseInt(req.params.id);
	var updatedObj = req.body;

    updatedObj = updateObj(objs, updatedObj);
	cl("PUT for single " + req.params.objType);
	res.json(updatedObj);
});


app.post('/api/:objType', function  (req, res) {
	var objs = getObjList(req.params.objType);
	var obj = req.body;
	obj.id = findNextId(objs);
	addObj(objs, obj);
	cl("POST for single " + req.params.objType);
	res.json(obj);
});

app.delete('/api/:objType/:id', function  (req, res) {
	var objs = getObjList(req.params.objType);
	deleteObj(objs, req.params.id);
    res.json({});
});


//app.get('/', function  (req, res) {
//	  res.json(404, {status: 'not found'});
//	});


app.get('/*', function  (req, res) {
  res.json(404, {status: 'not found'});
});

http.createServer(app).listen(3000, function () {
  console.log("My server is ready at http://localhost:3000".rainbow);
});
