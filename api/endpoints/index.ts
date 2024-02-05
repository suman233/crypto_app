export const baseUrl='https://api.coincap.io'
'api.coincap.io/v2/assets/bitcoin/history?interval=d1'
export const endPoints={
    fetchedCoinDetails: {
        allcoins: '/v2/assets',
        slugdetails:  (id: any) => `/v2/assets/${id}`,
        historydetails: (id: any) => `/v2/assets/${id}/history?interval=d1`,
        marketdetails: (id: any) => `/v2/assets/${id}/markets`
    },
    fetchedmarkets: {
        allmarket: '/v2/markets'
    },
    fetchedrates: {
        rates: '/v2/rates',
        ratedetails: (id: any)=> `/v2/rates/${id}`
    },
    fetchedexchange: {
        coinexchange: '/v2/exchanges',
        exchangedetails: (id: any)=> `/v2/exchanges/${id}`
    }
}