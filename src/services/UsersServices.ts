import { getCustomRepository ,Repository} from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { User } from '../entities/User';
/*=====================================================================*/
/*=====================================================================*/

/*=====================================================================*/
/*=====================================================================*/



class UsersServices{
/*=====================================================================*/
/*=====================================================================*/
    private usersRepository: Repository<User>

    constructor(){
        this.usersRepository = getCustomRepository(UsersRepository)
    }
/*=====================================================================*/
/*=====================================================================*/
    async create(email : string){

        const userExists = await this.usersRepository.findOne({
            email
        });


        //se ele existir retornar o usuario
        if (userExists) {
            return userExists;
        }


        //salvar no db e retornar 
        const user =  this.usersRepository.create({
            email
        });

        await this.usersRepository.save(user);

        return user;
}
/*=====================================================================*/
/*=====================================================================*/
    async findByEmail(user_id: string){

        const user = await this.usersRepository.findOne(user_id);

        return user;
        
    }
/*=====================================================================*/
/*=====================================================================*/

}


/*=====================================================================*/
/*=====================================================================*/
export {UsersServices}