import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import typeorm from './config/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './config/redis.config';
import { UtilsModule } from './utils/utils.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';
import { CaslModule } from './modules/casl/casl.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesModule } from './modules/roles/roles.module';
import { StoriesModule } from './modules/stories/stories.module';
import { UsersModule } from './modules/users/users.module';

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
