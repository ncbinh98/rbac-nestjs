import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { connectionSource } from './config/typeorm';
import { VersioningType } from '@nestjs/common';
import {
	FastifyAdapter,
	NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { configSwagger } from '@configs/api-docs.config';
import { join } from 'path';
async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({ logger: true }),
	);

	//Setup helmet to protect vul from header or sth else...
	await app.register(helmet, {
		contentSecurityPolicy: {
			directives: {
				defaultSrc: [`'self'`],
				styleSrc: [`'self'`, `'unsafe-inline'`],
				imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
				scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
			},
		},
	});

	//Setup Cors
	app.enableCors();

	//Setup Versioning API
	app.setGlobalPrefix('api');
	app.enableVersioning({
		type: VersioningType.URI,
		prefix: 'v',
		defaultVersion: '1',
	});
	await connectionSource.initialize();
	app.useGlobalPipes(new ValidationPipe());

	//Setup Swaggers
	configSwagger(app);

	await app.listen(process.env.PORT, '0.0.0.0');
}
bootstrap();
