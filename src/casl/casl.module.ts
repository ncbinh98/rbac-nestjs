import { Module } from '@nestjs/common';
import { CaslService } from './casl.service';

@Module({
  providers: [CaslService],
})
export class CaslModule {}
