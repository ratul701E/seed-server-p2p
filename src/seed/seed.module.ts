import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedGateway } from './seed.gateway';

@Module({
  providers: [SeedGateway, SeedService],
})
export class SeedModule {}
