import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
    private active_nodes: string[] = [
        // "http://localhost:3000",
        // "http://localhost:3001",
        // "http://localhost:3002",
        // "http://localhost:3003",
        // "http://localhost:3004",
    ]

    getActiveNodeList(): string[] {
        return this.active_nodes
    }

    addToActiveNodeList(addr: string) : void {
        this.active_nodes.push(addr)
        this.active_nodes = [... new Set(this.active_nodes)]
        console.log(this.active_nodes)
    }
}
