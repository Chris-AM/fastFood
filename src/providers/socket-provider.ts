import {
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class SocketProvider
   // implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    // afterInit(server: any) {
    //     throw new Error('Method not implemented.');
    // }

    // handleConnection(client: any, ...args: any[]) {
    //     throw new Error('Method not implemented.');
    // }

    // handleDisconnect(client: any) {
    //     throw new Error('Method not implemented.');
    // }
}
