import { Injectable } from '@nestjs/common'
import { InfinityRequestService } from './request.service'

@Injectable()
export class PayGate extends InfinityRequestService {}
