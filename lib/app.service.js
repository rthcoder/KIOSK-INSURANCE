"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);
