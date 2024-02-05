import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { RootExchange } from '../typescript/interface/coins.exchange';
import { axiosInstance } from '@/api/axiosinstance';
import { endPoints } from '@/api/endpoints';
import { Box, Button, CardActionArea, Container, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import Link from 'next/link';
import styles from '@/styles/rate.module.css'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

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

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [exdt, setexdt] = useState("");

    const getdetails = (id: any) => {
        handleOpen()
        setexdt(id)
    }

    const { data: singleexchange } = useQuery({
        queryKey: ['singledetails', exdt],
        queryFn: async () => {
            const data = await axiosInstance.get(
                endPoints.fetchedexchange.exchangedetails(`${exdt}`)
            )
            console.log(data);
            return data?.data.data
        }
    });

    return (
        <>
            <Container maxWidth='xl' sx={{ my: 4 }}>
                <Typography variant='h4' textAlign={'center'} mb={4}>Exchange Page</Typography>

                <Paper sx={{ width: '100%' }}>
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow >
                                    <TableCell align="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
                                        Serial No.
                                    </TableCell>
                                    <TableCell align="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
                                        ID
                                    </TableCell>
                                    <TableCell align="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
                                        Name
                                    </TableCell>
                                    <TableCell align="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
                                        Total Volume (%)
                                    </TableCell>
                                    <TableCell align="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
                                        Trading Pairs
                                    </TableCell>
                                    <TableCell align="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
                                        Volume (USD)
                                    </TableCell>
                                    <TableCell align="center" sx={{ backgroundColor: 'black', color: '#fff' }}>
                                        Exchange URL
                                    </TableCell>
                                </TableRow>

                            </TableHead>
                            <TableBody>

                                {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={index} onClick={() => getdetails(row.exchangeId)}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">{row.exchangeId}</TableCell>
                                                <TableCell align="center">{row.name}</TableCell>
                                                <TableCell align="center">{row.percentTotalVolume}</TableCell>
                                                <TableCell align="center">{row.tradingPairs}</TableCell>
                                                <TableCell align="center">{row.volumeUsd}</TableCell>
                                                <TableCell align="center"><Link href={`${row.exchangeUrl}`}>{row.exchangeUrl}</Link>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Name: {singleexchange?.name?.toUpperCase()}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Volume (USD): {singleexchange?.volumeUsd}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                TradingPair: {singleexchange?.tradingPairs}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ my: 2 }}>
                                Rate: {Number(singleexchange?.percentTotalVolume).toFixed(5)}%
                            </Typography>
                            <div style={{ display: 'flex' }}>
                                <Button className={styles.modalbtn} sx={{
                                    textTransform: 'none', mr: 6
                                }}><Link href={`${singleexchange?.exchangeUrl}`} style={{textDecoration:'none', color:'white'}}>Show</Link></Button>
                                <Button onClick={handleClose} className={styles.modalbtn} sx={{
                                    textTransform: 'none'
                                }}>Close</Button>
                            </div>

                        </Box>
                    </Modal>
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