import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export function configSwagger(app: INestApplication) {
	//Setup Swaggers
	const config = new DocumentBuilder()
		.setTitle('RBAC Example Project')
		.setDescription(
			'Hope this project can help somebody know to start working with RBAC with NestJS...',
		)
		.addBearerAuth(
			{ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
			'JWT',
		)
		.addSecurityRequirements('JWT')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-docs', app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
		customJs: '/swagger-custom.js',
	});
}
