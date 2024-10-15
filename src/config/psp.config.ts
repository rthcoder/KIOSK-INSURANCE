import { registerAs } from "@nestjs/config";

export declare interface PspConfig {
  url?: string;
  serviceId?: string;
  serviceKey?:string;
}

export const pspConfig = registerAs<PspConfig> (
  'psp',
  () : PspConfig => ({
    url: process.env.PSP_URL,
    serviceId: process.env.PSP_SERVICE_ID,
    serviceKey: process.env.PSP_KEY
  }),
)