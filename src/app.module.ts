import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';
import { StoriesModule } from './stories/stories.module';
import { CaslModule } from './casl/casl.module';
import configuration from './config/configuration';
import typeorm from './config/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/redis.config';
import { UtilsModule } from './utils/utils.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration, typeorm],
		}),
		CacheModule.registerAsync(RedisOptions),

		/* 
      Setup datasource for migration process and init database instance
    */
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) =>
				configService.get('typeorm'),
		}),

		ServeStaticModule.forRoot({
			rootPath: join(__dirname, './served'),
		}),

		UsersModule,
		AuthModule,
		RolesModule,
		PermissionsModule,
		StoriesModule,
		CaslModule,
		UtilsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
