"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const app_1 = require("./app");
const app_config_1 = require("./config/app.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_1.App, new platform_express_1.ExpressAdapter(), {
        cors: {
            origin: '*',
            maxAge: 0,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            credentials: false,
            allowedHeaders: ['Content-Type', 'Authorization'],
            exposedHeaders: [],
            preflightContinue: false,
            optionsSuccessStatus: 200,
        },
    });
    app.use((0, express_1.json)({
        limit: '5mb',
    }));
    app.useGlobalPipes(new common_1.ValidationPipe()),
        app.enableVersioning({
            type: common_1.VersioningType.URI,
            prefix: 'api/v',
        });
    app.set('env', app_config_1.appConfig.env);
    app.set('etag', 'strong');
    app.set('trust proxy', true);
    app.set('x-powered-by', false);
    await app.listen(app_config_1.appConfig.port, app_config_1.appConfig.host);
}
bootstrap();
