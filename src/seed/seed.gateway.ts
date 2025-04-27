import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { SeedService } from "./seed.service";
import { Server } from "socket.io";
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class SeedGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(SeedGateway.name);
  constructor(private readonly seedService: SeedService) {}
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    // console.log(`New node connected [${client.id}]`)
    const { query } = client.handshake;
    this.seedService.addToActiveNodeList(client.id, query.addr);
    this.logger.verbose(`New node connected [${client.id}]`);
    this.server.emit("node_info_res", this.seedService.getActiveNodeList());
    this.logger.debug(`Node list updated [${JSON.stringify(this.seedService.getActiveNodeList(), null, 2)}]`);
  }

  handleDisconnect(client: any) {
    this.seedService.removeFromActiveNodeList(client.id);
    this.logger.warn(`Node disconnected [${client.id}]`);
    this.logger.debug(`Node list updated [${JSON.stringify(this.seedService.getActiveNodeList(), null, 2)}]`);
    this.server.emit("node_disconnected", client.id);
  }

  @SubscribeMessage("node_info_req")
  handleNodeInfo(client: any, data: any) {
    // const reqAddr = data
    // console.log(`node info requested by [${reqAddr}] & send successfully`)
    // this.seedService.addToActiveNodeList(reqAddr)
    // this.server.emit('node_info_res', this.seedService.getActiveNodeList())
  }
}
