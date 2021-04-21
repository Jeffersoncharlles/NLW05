import { Router} from 'express';
import { getCustomRepository } from 'typeorm';
import { SettingsController } from './controllers/SettingsController';
import { SettingsRepository } from './repositories/SettingsRepository';

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

/*=====================================================================*/
/*=====================================================================*/

routes.post("/settings",settingsController.create);
//route create


/*=====================================================================*/
export {routes};