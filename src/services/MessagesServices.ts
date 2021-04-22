import { getCustomRepository, Repository } from 'typeorm';
import { Message } from '../entities/Message';
import { MessagesRepository } from '../repositories/MessagesRepository';
/*=====================================================================*/
/*=====================================================================*/
interface IMessageCreate{
    //admin_id opcional 
    admin_id?: string;
    text: string;
    user_id: string;
}
/*=====================================================================*/
/*=====================================================================*/



class MessagesServices{
/*=====================================================================*/
/*=====================================================================*/
    private messagesRepository: Repository<Message>

    constructor(){
        this.messagesRepository = getCustomRepository(MessagesRepository)
    }
/*=====================================================================*/
/*=====================================================================*/
    async create({admin_id,text,user_id}: IMessageCreate){

       const message = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        });
    
    await this.messagesRepository.save(message);

    return message;
        
    }
/*=====================================================================*/
/*=====================================================================*/
    async listByUser(user_id: string){

       //se nao quizer trazer os dados do relacionamento
       // e so tirar o where o relations
       const list = await this.messagesRepository.find({
            where: {user_id},
            relations:["user"],
        });

        return list;
        
    }
/*=====================================================================*/
/*=====================================================================*/
}


/*=====================================================================*/
/*=====================================================================*/
export {MessagesServices}