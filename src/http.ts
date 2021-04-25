import express, { request, response } from 'express';
//import express server
/*=====================================================================*/
/*=====================================================================*/
import { createServer } from 'http';
import {Server, Socket} from 'socket.io';
//import socket io

/*=====================================================================*/
/*=====================================================================*/
//import public
import path from 'path';

/*=====================================================================*/
/*=====================================================================*/

import './database';
//import db concection

/*=====================================================================*/
/*=====================================================================*/

import {routes} from './routes';
//import rotasarquivo
/*=====================================================================*/
/*=====================================================================*/

const app = express();

/*=====================================================================*/
/*=====================================================================*/
//utilizar html
app.use(express.static(path.join(__dirname,'..', 'public')));
app.set('views', path.join(__dirname,'..', 'public'));
app.engine('html',require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/pages/client',(req,res)=>{
    return res.render('html/client.html');
})

app.get('/pages/admin',(req,res)=>{
    return res.render('html/admin.html');
})

/*=====================================================================*/
/*=====================================================================*/

const http= createServer(app);
//criando protocolo http

const io = new Server(http);
//criando o protocolo ws //websocket

/*=====================================================================*/
/*=====================================================================*/

//criando o conection
io.on("connection",(socket: Socket)=>{
    //console.log("Se conectou", socket.id);
});

/*=====================================================================*/
/*=====================================================================*/

//definir que pode aceitar json
app.use(express.json());

/*=====================================================================*/
/*=====================================================================*/

//acessar todas as rotas no arquivo
app.use(routes);


export {http, io};