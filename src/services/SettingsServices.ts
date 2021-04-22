import { getCustomRepository } from 'typeorm';
import { SettingsRepository } from '../repositories/SettingsRepository';
/*=====================================================================*/
/*=====================================================================*/

interface ISettingsCreate{
    chat: boolean,
    username:string
}
/*=====================================================================*/
/*=====================================================================*/



class SettingsServices{
/*=====================================================================*/
/*=====================================================================*/
    async create({chat, username}){
        const settingsRepository = getCustomRepository(SettingsRepository);

        //Select * from settings where username =  "username" limit 1;
        const userAlreadyExists = await settingsRepository.findOne({username});

        //se ele existir ele da error
        if (userAlreadyExists) {
            throw new Error("User already Exists!");
        }

        const settings =  settingsRepository.create({
            chat,
            username
        });

        await settingsRepository.save(settings);

        return settings;
    }
/*=====================================================================*/
/*=====================================================================*/
}


/*=====================================================================*/
/*=====================================================================*/
export {SettingsServices}