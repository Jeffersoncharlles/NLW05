import { io } from '../http';
import { ConnectionsServices } from '../services/ConnectionsServices';

io.on('connect', (socket)=>{
    const connetionsServices = new ConnectionsServices();

    const allConnectionsWithoutAdmin = await connetionsServices.findAllWithoutAdmin();
})