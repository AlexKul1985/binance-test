import { ApiPayload } from './types'

export async function getOrderBookForCurrencyPair(payload: ApiPayload) {
    const response = await fetch(`https://api.binance.com/api/v3/depth?symbol=${payload.symbol}&limit=${payload.limit}`)
    return await response.json()
 }
