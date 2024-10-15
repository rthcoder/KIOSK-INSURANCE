import * as crypto from 'crypto'

/**
 * @param serviceId - PSP tizimidagi to'lov vositasi identifikatori
 * @param secretKey - Maxfiy kalit, SHA-1 hash yaratishda ishlatiladi
 * @returns - Auth HTTP zagolovkasi, format: "Auth: service_id-hash-timestamp"
 **/
export function createAuthHeader(serviceId: string, secretKey: string): string {
  const timestamp = Date.now()

  const hash = crypto
    .createHash('sha1')
    .update(secretKey + timestamp)
    .digest('hex')

  const authHeader = `${serviceId}-${hash}-${timestamp}`

  return authHeader
}
