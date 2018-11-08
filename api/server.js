const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const session = require('express-session');
const Mysql = require('mysql-json');

const sql = new Mysql({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'admin',
	database: 'ksora'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
	secret: 's3Cur3',
	name: 'sessionId',
})
);

var sess;

const mysql = require('mysql');

const router = express.Router();
router.get('/', (req, res) => res.send('localhost:8080'));
app.use('/', router);

router.post('/login', (req, res) => {
	sess = req.session;
	let query = "SELECT * FROM usuarios WHERE login = '" + req.body.login + "' AND senha = '" + req.body.senha + "'";
	sql.query(query,
		function (err, response) {
			if (err) throw err;
			response.forEach(element => {
				if (element) {
					let lista = [];
					sql.query("SELECT permissao, acesso FROM permissoes p JOIN grupos_permissoes gp ON gp.permissao_id = p.id WHERE gp.grupo_id =" + element.grupo_id,
						function (err, r) {
							r.forEach(el => {
								lista.push(el.permissao);
							})
							sess.permissoes = lista;
							res.send('/')
						});
				} else {
					res.send('Não tem permissão')
				}
			});
		});
});

router.get('/logout', (req, res) => {
	req.session.destroy(function (err) {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/');
		}
	});
});

router.get('/usuarios', (req, res) => {
	sess = req.session;	
	if (sess.permissoes.indexOf('usuarioEscrita') != -1 || sess.permissoes.indexOf('usuarioLeitura') != -1) {
		execSQLQuery('SELECT * FROM usuarios', res);
	} else {
		res.send('Não tem permissão')
	}
});

router.get('/usuarios/:id?', (req, res) => {
	let filter = '';
	if (req.params.id) filter = ' WHERE ID=' + parseInt(req.params.id);
	execSQLQuery('SELECT * FROM usuarios' + filter, res);
});

router.post('/usuarios', (req, res) => {
	let nome = req.body.nome;
	let login = req.body.login;
	execSQLQuery(`INSERT INTO usuarios(nome, login) VALUES('${nome}','${login}')`, res);
});

var server = app.listen(3000, function () {
	console.log('Servidor rodando');
});

function execSQLQuery(sqlQry, res) {
	const connection = mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'admin',
		database: 'ksora'
	});

	connection.query(sqlQry, function (error, results, fields) {
		if (error)
			res.json(error);
		else
			res.json(results);
		connection.end();
		console.log('executou!');
	});
}

function execSQLQuery2(sqlQry) {
	const connection = mysql.createConnection({
		host: 'localhost',
		port: 3306,
		user: 'root',
		password: 'admin',
		database: 'ksora'
	});

	connection.query(sqlQry, function (error, results, fields) {

		if (error)
			return error
		else
			return results
		connection.end();
		console.log('executou!');
	});
}


