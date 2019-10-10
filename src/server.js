import sirv from 'sirv';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import mysql from "mysql";
import bodyParser from "body-parser";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express();

//Conexión con la base de datos de MySQL.
const con = mysql.createConnection(
	{
		"user" : "notiks",
		"database" : "notiks_db",
		"password" : "12345",
		"host" : "127.0.0.1"
	}
);

con.connect((error) => {
    try {
        if (error) throw err;
        console.log("Connected to database.");
    } catch (err) {
        switch(error.code) {
            case "ECONNREFUSED":
            console.log("Connection to the database was refused. Check your database configuration and your database status.");
            break;
            case "ER_DBACCESS_DENIED_ERROR":
            console.log("Access to the database was denied. Check your username and password.");
            break;
            default:
            console.log("An error has ocurred while attempting to connect to the database. Check config.");
        }
    }
});


app // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv('static', { dev }),
		sapper.middleware(),
		bodyParser.urlencoded({extended: true}),
		bodyParser.json()
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});