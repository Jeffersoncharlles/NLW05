import {Request, Response } from 'express';
import { SettingsServices } from '../services/SettingsServices';

/*=====================================================================*/
/*=====================================================================*/
/*=====================================================================*/
class SettingsController{

/*=====================================================================*/
/*=====================================================================*/
    async create(req: Request, res: Response){
        const {chat, username} = req.body;

        const settingsServices = new SettingsServices();


        //para tratar try catch
        try {
            const settings = await settingsServices.create({chat,username});

            return res.json(settings);
        } catch (error) {
            //retornar erros se nao de certo 
            return res.status(400).json({
                message: error.message
            })
        }
    }
/*=====================================================================*/
/*=====================================================================*/


}
/*=====================================================================*/
/*=====================================================================*/
/*=====================================================================*/

export { SettingsController}