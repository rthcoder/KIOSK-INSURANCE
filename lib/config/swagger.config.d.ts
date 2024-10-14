import type { OpenAPIObject } from '@nestjs/swagger';
export declare interface SwaggerConfig {
    path?: string;
    options?: Omit<OpenAPIObject, 'paths'>;
}
export declare const swaggerConfig: SwaggerConfig;
