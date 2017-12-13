var express = require('express');
var app = express();



app.get('/', function(req, res){
	res.send('Teste');
});

var server = app.listen(3000, function(){
	console.log('Servidor rodando');
});
