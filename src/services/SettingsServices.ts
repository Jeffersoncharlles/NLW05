import { getCustomRepository ,Repository} from 'typeorm';
import { SettingsRepository } from '../repositories/SettingsRepository';
import { Setting } from '../entities/Setting';
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
    private settingsRepository: Repository<Setting>

    constructor(){
        this.settingsRepository = getCustomRepository(SettingsRepository)
    }
/*=====================================================================*/
/*=====================================================================*/
    async create({chat, username}){

        //Select * from settings where username =  "username" limit 1;
        const userAlreadyExists = await  this.settingsRepository.findOne({username});

        //se ele existir ele da error
        if (userAlreadyExists) {
            throw new Error("User already Exists!");
        }

        const settings =   this.settingsRepository.create({
            chat,
            username
        });

        await  this.settingsRepository.save(settings);

        return settings;
    }
/*=====================================================================*/
/*=====================================================================*/
    async findByUserName(username: string){
        const settings = await  this.settingsRepository.findOne({username});

        return settings;
    }

/*=====================================================================*/
/*=====================================================================*/
    async update(username: string, chat:boolean){
        await  this.settingsRepository.createQueryBuilder().
        update(Setting)
            .set({chat})
            .where("username = :username",{username})
            .execute();
        
    }

/*=====================================================================*/
/*=====================================================================*/
}


/*=====================================================================*/
/*=====================================================================*/
export {SettingsServices}