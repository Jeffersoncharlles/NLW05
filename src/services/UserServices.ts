import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
/*=====================================================================*/
/*=====================================================================*/

/*=====================================================================*/
/*=====================================================================*/



class UsersServices{
/*=====================================================================*/
/*=====================================================================*/
    async create(email : string){

        //verificar se usuario existe
        const usersRepository = getCustomRepository(UsersRepository);

        const userExists = await usersRepository.findOne({
            email
        });


        //se ele existir retornar o usuario
        if (userExists) {
            return userExists;
        }


        //salvar no db e retornar 
        const user =  usersRepository.create({
            email
        });

        await usersRepository.save(user);

        return user;
}
/*=====================================================================*/
/*=====================================================================*/
}


/*=====================================================================*/
/*=====================================================================*/
export {UsersServices}