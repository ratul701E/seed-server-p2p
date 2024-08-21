import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SeedService } from './seed.service';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SeedGateway implements OnGatewayConnection, OnGatewayDisconnect{
  constructor(private readonly seedService: SeedService) {}
  @WebSocketServer() server: Server

  handleConnection(client: any, ...args: any[]) {
    //console.log(`New node connected [${client.id}]`)
    const { query } = client.handshake
    this.seedService.addToActiveNodeList(query.addr)
    this.server.emit('node_info_res', this.seedService.getActiveNodeList())
    
  }

  handleDisconnect(client: any) {
    
  }

  @SubscribeMessage('node_info_req')
  handleNodeInfo(client: any, data: any) {
    // const reqAddr = data
    // console.log(`node info requested by [${reqAddr}] & send successfully`)
    // this.seedService.addToActiveNodeList(reqAddr)
    // this.server.emit('node_info_res', this.seedService.getActiveNodeList())

  }
}
