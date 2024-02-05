export interface Root4 {
    data: Daum[]
    timestamp: number
  }
  
  export interface Daum {
    exchangeId: string
    rank: string
    baseSymbol: string
    baseId: string
    quoteSymbol: string
    quoteId: string
    priceQuote: string
    priceUsd: string
    volumeUsd24Hr?: string
    percentExchangeVolume?: string
    tradesCount24Hr?: string
    updated: number
  }
  