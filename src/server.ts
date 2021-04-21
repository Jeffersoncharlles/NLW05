import express, { request, response } from 'express';
//import express server

import './database';
//import db concection

const app = express();

/*
* GET = buscas
* POST = Criacao
* PUT = Alteracao
* DELETE = Deletar
* PATCH = Alterar uma informacao especifica

*/
app.get("/", (request, response) =>{
    return response.send("Ola NLW 05");
});

app.post("/",(req, resp)=>{
    return resp.json({
        message: "Usuario salvo com sucesso!",
    });
});

app.listen(3333, () => console.log('Server ins running on port 3333'));