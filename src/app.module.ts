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
import configuration from './config/configuration';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, typeorm],
    }),
    /* 
      Setup datasource for migration process and init database instance
    */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm'),
    }),

    UsersModule,
    AuthModule,
    RolesModule,
    PermissionsModule,
    StoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
