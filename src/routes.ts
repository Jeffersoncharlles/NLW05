import { Router} from 'express';
import { MessagesController } from './controllers/MessagesController';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';

/*=====================================================================*/
/*=====================================================================*/
const routes = Router();

/*
* GET = buscas
* POST = Criacao
* PUT = Alteracao
* DELETE = Deletar
* PATCH = Alterar uma informacao especifica
*/

/*
* Tipos de parametros
* Routes Params = Parametros de rotas
* http://localhost:3333/settings/1
*
* Query Params = filtros e buscas
* http://localhost:3333/settings/1?search=algumacoisa
*
* Body params =>{
*    
*}
*/

const settingsController = new SettingsController();
const usersController = new UsersController();
const messagesController = new MessagesController();

/*=====================================================================*/
/*=====================================================================*/

routes.post("/settings",settingsController.create);
//route create


routes.post("/users",usersController.create);
//route create

routes.post("/messages",messagesController.create);
//route create

routes.get("/messages/:id",messagesController.showByUser);
//route showlist


/*=====================================================================*/
export {routes};