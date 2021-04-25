import {io} from '../http';
import {ConnectionsServices} from '../services/ConnectionsServices';
import { UsersServices } from '../services/UsersServices';
import { MessagesServices } from '../services/MessagesServices';

interface IParams {
    text:string;
    email: string;
}


io.on("connection",(socket)=>{

    const connectionsServices = new ConnectionsServices();
    const userServices = new UsersServices();
    const messagesServices = new MessagesServices();
/*=====================================================================*/
/*=====================================================================*/
    socket.on('client_first_access', async params =>{
        const socket_id = socket.id;
        // console.log(params);

        const {text, email} = params as IParams;

        let user_id = null;

        //Salvar a conexao com o socket_id, user_id
        const userExists = await userServices.findByEmail(email);

        if (!userExists) {
            //se usuario existir pegar o id do usuario
            const user = await userServices.create(email);
            
            await connectionsServices.create({
                socket_id,
                user_id: user.id
            });
            user_id = user.id;
        }else{
            user_id = userExists.id;
            const connection = await connectionsServices.findByUserId(userExists.id);

            if (!connection) {
                //criar novo registro pois nao existe
                await connectionsServices.create({
                    socket_id,
                    user_id: userExists.id,
                });
            }else{
                //alterar o registro que ja exist
                connection.socket_id = socket_id;
                await connectionsServices.create(connection);
            }
        }

        //salvar msg
        await messagesServices.create({
            text,
            user_id
        });


        const allMessages = await messagesServices.listByUser(user_id);

        socket.emit('client_list_all_messages', allMessages);

    });
/*=====================================================================*/
/*=====================================================================*/

    socket.on('client_send_to_admin', async (params) =>{
        const { text,socket_admin_id } = params;
        const socket_id = socket.id;

        const { user_id } = await connectionsServices.findBySocketID(socket_id);

        const message = await messagesServices.create({
            text,
            user_id
        });

        io.to(socket_admin_id).emit('admin_receive_message', {
            message,
            socket_id
        })
    })
});