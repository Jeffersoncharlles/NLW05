import {Request, response, Response } from 'express';
import { UsersServices } from '../services/UserServices';

/*=====================================================================*/
/*=====================================================================*/
/*=====================================================================*/
class UsersController{

/*=====================================================================*/
/*=====================================================================*/
    async create(req: Request, res: Response) : Promise<Response>{
        //promise retorno de response e para mostrar que tem que retornar no response

        const {email} = req.body;

        const usersServices = new UsersServices();

        const user = await usersServices.create(email);

        return response.json(user);
    }
/*=====================================================================*/
/*=====================================================================*/


}
/*=====================================================================*/
/*=====================================================================*/
/*=====================================================================*/

export { UsersController}