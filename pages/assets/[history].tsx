import { axiosInstance } from '@/api/axiosinstance'
import { endPoints } from '@/api/endpoints'
import { Root3 } from '@/typescript/interface/history'
import { Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'

const coinhistory = () => {
    const router = useRouter()
    const { history } = router.query
    // console.log(slug);

    const { isLoading, data, error } = useQuery({
        queryKey: ["allhistory", { history }],
        enabled: !!history,
        queryFn: async () => {
            const data = await axiosInstance.get(
                // `/v2/assets/${slug}`
                endPoints.fetchedCoinDetails.historydetails(`${history}`)
            )
            console.log(data.data.data);
            return data?.data
        }
    })
    return (
        <Container>
            <Typography sx={{ my: 5 }}>Coin History Page</Typography>
            <p>{data?.data.map((item, index) => {
                return (
                    <>
                    <p>{item.priceUsd}</p>
                    </>
                )
            })}</p>
        </Container>
    )
}

export default coinhistory