interface Company {
  name: string;
  company_id: number;
}

export interface GetCompanyResponse {
  jsonrpc: string;
  result: Company[];
  id: number;
}

export interface GetServiceRequest {
  company_id: number
}

export interface GetStepRequest {
  company_id: number,
  service_id: number
}

export interface StepOneRequest {
  company_id: number
  service_id: number
  step: number
  texpsery: string
  texpnumber: string
  renumber: string
}


interface VehicleData {
  type: string;
  marka: string;
  vmodel: string;
  texpdate: string;
  year: string;
  dvigatel: string;
  model: string;
  kuzov: string;
  texpsery: string;
  texpnumber: string;
  renumber: string;
  vehicle: string;
}

export interface StepTwoRequest {
  company_id: number;
  service_id: number;
  owner_pinfl: string;
  owner_fy: number;
  use_territory: number;
  owner_isdriver: number;
  owner_pasp_sery: string;
  owner_pasp_num: string;
  appl_pasp_sery: string | null;
  appl_pasp_num: string | null;
  appl_fizyur: string | null;
  appl_pinfl: string | null;
  driver_limit: number;
  period: number;
  applicant_isowner: number;
  owner_phone: string;
  discount: number;
  data: VehicleData;
}
