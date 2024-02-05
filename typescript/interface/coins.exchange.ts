export interface RootExchange {
    data: ExData[]
    timestamp: number
  }
  
  export interface ExData {
    exchangeId: string
    name: string
    rank: string
    percentTotalVolume: string
    volumeUsd: string
    tradingPairs: string
    socket: boolean
    exchangeUrl: string
    updated: number
  }
  