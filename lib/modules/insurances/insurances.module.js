"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsurancesModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const insurances_controller_1 = require("./insurances.controller");
const insurances_service_1 = require("./insurances.service");
let InsurancesModule = class InsurancesModule {
};
exports.InsurancesModule = InsurancesModule;
exports.InsurancesModule = InsurancesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [insurances_controller_1.InsurancesController],
        providers: [insurances_service_1.InsurancesService]
    })
], InsurancesModule);
