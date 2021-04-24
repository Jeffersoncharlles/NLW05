import {io} from '../http';
import {ConnectionsServices} from '../services/ConnectionsServices';
import { UsersServices } from '../services/UsersServices';


io.on("connection",(socket)=>{

    const connectionsServices = new ConnectionsServices();
    const userServices = new UsersServices();

    socket.on('client_first_access', async params =>{
        const socket_id = socket.id;
        // console.log(params);

        const {text, email} = params;

        //Salvar a conexao com o socket_id, user_id
        const userExists = await userServices.findByEmail(email);

        if (!userExists) {
            const user = await userServices.create(email);

            await connectionsServices.create({
                socket_id,
                user_id: user.id
            });
        }else{
            await connectionsServices.create({
                socket_id,
                user_id: userExists.id
            });
        }

    });
});