import { Injectable } from '@nestjs/common'
import { InfinityRequestService } from './request.service'
import { MethodList } from '@enums'

@Injectable()
export class PayGate extends InfinityRequestService {
  async payByCard(serviceId: string, serviceKey: string, data: any) {
    return this.setServiceId(serviceId)
      .setServiceKey(serviceKey)
      .setMethod(MethodList.PAM_CHECK)
      .setUrl(process.env.PAYMENT_URL)
      .setParams({ vendor_form: data })
      .send()
  }

  async preparePayByCard(serviceId: string, serviceKey: string, data: any) {
    return this.setServiceId(serviceId)
      .setServiceKey(serviceKey)
      .setMethod(MethodList.PAM_CHECK_PAYMENT)
      .setUrl(process.env.PAYMENT_URL)
      .setParams({ vendor_form: data })
      .send()
  }
}

// "order_id": "c5c6d04a-c4ad-4d93-a453-8527b7c151b4",
// "anketa_id": "901416",
// "polis_id": 141,
//         "vendor_id": 105458,
//         "anketa_id": "901416"
