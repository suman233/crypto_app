export interface Root {
    data: AllCoins[]
    timestamp: number
  }
  
  export interface AllCoins {
    id: string
    rank: string
    symbol: string
    name: string
    supply: string
    maxSupply?: string
    marketCapUsd: string
    volumeUsd24Hr: string
    priceUsd: string
    changePercent24Hr?: string
    vwap24Hr: string
  }
  