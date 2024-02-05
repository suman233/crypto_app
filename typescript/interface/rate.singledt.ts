export interface SingleRate {
    data: Data
    timestamp: number
  }
  
  export interface Data {
    id: string
    symbol: string
    currencySymbol: string
    type: string
    rateUsd: string
  }
  