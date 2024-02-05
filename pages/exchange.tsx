import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { RootExchange } from '../typescript/interface/coins.exchange';
import { axiosInstance } from '@/api/axiosinstance';
import { endPoints } from '@/api/endpoints';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Link from 'next/link';

const exchange = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["coinexchanges"],
    queryFn: async () => {
        const data = await axiosInstance.get<RootExchange>(
            endPoints.fetchedexchange.coinexchange
        )
        console.log(data?.data);
        return data?.data?.data
    }
})

const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);

const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
};
  
  return (
    <>
    <Container maxWidth='xl' sx={{ my: 4 }}>
            <Typography variant='h4' textAlign={'center'} mb={4}>Exchange Page</Typography>


            <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow >
                                <TableCell align="center" sx={{backgroundColor:'black', color:'#fff'}}>
                                    Serial No.
                                </TableCell>
                                <TableCell align="center" sx={{backgroundColor:'black', color:'#fff'}}>
                                    ID
                                </TableCell>
                                <TableCell align="center" sx={{backgroundColor:'black', color:'#fff'}}>
                                    Name
                                </TableCell>
                                <TableCell align="center" sx={{backgroundColor:'black', color:'#fff'}}>
                                    Total Volume (%)
                                </TableCell>
                                <TableCell align="center" sx={{backgroundColor:'black', color:'#fff'}}>
                                    Trading Pairs
                                </TableCell>
                                <TableCell align="center" sx={{backgroundColor:'black', color:'#fff'}}>
                                    Volume (USD)
                                </TableCell>
                                <TableCell align="center" sx={{backgroundColor:'black', color:'#fff'}}>
                                    Exchange URL
                                </TableCell>
                            </TableRow>

                        </TableHead>
                        <TableBody>

                            {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            <TableCell align="center">{index+1}</TableCell>
                                            <TableCell align="center">{row.exchangeId}</TableCell>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center">{row.percentTotalVolume}</TableCell>
                                            <TableCell align="center">{row.tradingPairs}</TableCell>
                                            <TableCell align="center">{row.volumeUsd}</TableCell>
                                            <TableCell align="center"><Link href={`${row.exchangeUrl}`}>{row.exchangeUrl}</Link>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data?.length as number}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </Container>
    </>
  )
}

export default exchange