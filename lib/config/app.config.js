"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
exports.appConfig = {
    env: process.env.NODE_ENV,
    name: process.env.APP_NAME,
    host: process.env.APP_HOST,
    port: parseInt(process.env.APP_PORT, 10) ?? 3001,
};
