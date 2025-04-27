import { Injectable } from "@nestjs/common";

@Injectable()
export class SeedService {
  private active_nodes: Record<string, string> = {};

  getActiveNodeList() {
    return this.active_nodes;
  }

  addToActiveNodeList(id: string, addr: string): void {
    if (Object.values(this.active_nodes).includes(addr)) {
      return;
    }
    this.active_nodes[id] = addr;
    console.log(this.active_nodes);
  }

  removeFromActiveNodeList(id: string): void {
    delete this.active_nodes[id];
  }
}
