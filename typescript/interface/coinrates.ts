export interface RootRate {
    data: CoinRate[]
    timestamp: number
  }
  
  export interface CoinRate {
    id: string
    symbol: string
    currencySymbol?: string
    type: string
    rateUsd: string
  }
  