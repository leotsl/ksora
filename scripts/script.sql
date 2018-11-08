CREATE DATABASE IF NOT EXISTS ksora;
USE ksora;

DROP TABLE IF EXISTS grupos;
CREATE TABLE grupos (
	id INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO grupos (nome) VALUES ('Administradores');

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
	id INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	login VARCHAR(20) NOT NULL,
	senha VARCHAR(50) NOT NULL,
	email VARCHAR(30) NOT NULL,
	grupo_id INT NULL DEFAULT NULL,
	is_online BIT NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);

INSERT INTO usuarios (nome, login, senha, email, grupo_id) 
VALUES ('Administrador', 'adm', 'adm', 'adm@gmail.com', (SELECT id FROM grupos WHERE nome = 'Administradores'));

DROP TABLE IF EXISTS permissoes;
CREATE TABLE permissoes (
	id INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	permissao VARCHAR(20) NOT NULL,
	acesso BIT NOT NULL DEFAULT 0 ,
	PRIMARY KEY (id)
);

INSERT INTO permissoes (nome,permissao) VALUES ('Usuário','usuarioLeitura');
INSERT INTO permissoes (nome,permissao,acesso) VALUES ('Usuário','usuarioEscrita',1);
INSERT INTO permissoes (nome,permissao,acesso) VALUES ('Grupo','grupoEscrita',1);

DROP TABLE IF EXISTS grupos_permissoes;
CREATE TABLE grupos_permissoes (
	id INT NOT NULL AUTO_INCREMENT,
	grupo_id INT NOT NULL,
	permissao_id INT NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO grupos_permissoes (grupo_id,permissao_id)
VALUES ((SELECT id FROM grupos WHERE nome = 'Administradores'),(SELECT id FROM permissoes WHERE permissao = 'grupoEscrita'));







