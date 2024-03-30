import { Logger, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from '../roles/entities/role.entity';
import { Story } from '../stories/entities/story.entity';
import { UserSubscriber } from './users.subscriber';
import { SearchService } from '../search/search.service';

@Module({
	imports: [TypeOrmModule.forFeature([User, Role, Story])],
	controllers: [UsersController],
	providers: [UsersService, UserSubscriber, Logger],
	exports: [UsersService],
})
export class UsersModule {}
