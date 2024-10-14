"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const _modules_1 = require("./modules");
let App = class App {
};
exports.App = App;
exports.App = App = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            _modules_1.UsersModule,
            _modules_1.InsurancesModule
        ],
        controllers: [],
        providers: [],
    })
], App);
