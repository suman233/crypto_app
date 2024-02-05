import { axiosInstance } from '@/api/axiosinstance'
import { endPoints } from '@/api/endpoints'
import { Button, Card, CardActions, CardContent, Container, Divider, Grid, TablePagination, Typography } from '@mui/material'
import Link from 'next/link'
import { Root2 } from '@/typescript/interface/single'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const singlecoin = () => {
  const router = useRouter()
  const { slug } = router.query
  // console.log(slug);

  const { isLoading, data, error } = useQuery({
    queryKey: ["singledata", { slug }],
    enabled: !!slug,
    queryFn: async () => {
      const data = await axiosInstance.get<Root2>(
        // `/v2/assets/${slug}`
        endPoints.fetchedCoinDetails.slugdetails(`${slug}`)
      )
      console.log(data.data.data);
      return data?.data
    }
  })

  // console.log(slug);

  const { isLoading: isLoad, data: coinsmarkets } = useQuery({
    queryKey: ["allmarkets", [slug]],
    enabled: !!slug,
    queryFn: async () => {
      const data = await axiosInstance.get(
        // `/v2/assets/${slug}`
        endPoints.fetchedCoinDetails.marketdetails(`${slug}`)
      )
      console.log(data.data.data);
      return data?.data?.data
    }
  })

  const { isLoading: isPend, data: coinhistory } = useQuery({
    queryKey: ["allhistory", [slug]],
    enabled: !!slug,
    queryFn: async () => {
      const data = await axiosInstance.get(
        // `/v2/assets/${slug}`
        endPoints.fetchedCoinDetails.historydetails(`${slug}`)
      )
      console.log(data.data.data);
      return data?.data
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

  const [histpage, setHistPage] = useState(0);
  const [rowsPerPageHist, setRowsPerPageHist] = useState(10);


  const handleChangePageHist = (event: unknown, newPage: number) => {
    setHistPage(newPage);
  };

  const handleChangeRowsPerPageHist = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPageHist(+event.target.value);
    setHistPage(0);
  };


  return (
    <>
      <Container>
        <h1 className="text-center mt-5">Single Coin Page</h1>
        <TableContainer component={Paper} sx={{boxShadow:'0 0 10px'}}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead sx={{ backgroundColor: 'black' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Name</TableCell>
                <TableCell sx={{ color: 'white' }} align="right">Symbol</TableCell>
                <TableCell sx={{ color: 'white' }} align="right">Rank</TableCell>
                <TableCell sx={{ color: 'white' }} align="right">Market Cap (USD)</TableCell>
                <TableCell sx={{ color: 'white' }} align="right">Pirce (USD)</TableCell>
                <TableCell sx={{ color: 'white' }} align="right">Volume Percent (%)</TableCell>
                <TableCell sx={{ color: 'white' }} align="right">ChangePercent (24Hr)</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>

              <TableRow>
                <TableCell component="th" scope="row">
                  {data?.data.name}
                </TableCell>
                <TableCell align="right">{data?.data.symbol}</TableCell>
                <TableCell align="right">{data?.data.rank}</TableCell>
                <TableCell align="right">{data?.data.marketCapUsd}</TableCell>
                <TableCell align="right">{data?.data.priceUsd}</TableCell>
                <TableCell align="right">{data?.data.volumeUsd24Hr}</TableCell>
                <TableCell align="right">{data?.data.changePercent24Hr}</TableCell>

              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
        {/* <p>{data?.data.name}</p> */}
        <Divider sx={{ my: 4 }} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell align="right">Base ID</StyledTableCell>
                    <StyledTableCell align="right">Quote ID</StyledTableCell>
                    <StyledTableCell align="right">Base Symbol</StyledTableCell>
                    <StyledTableCell align="right">Quote Symbol</StyledTableCell>
                    <StyledTableCell >Pirce (USD)</StyledTableCell>
                    <StyledTableCell >Volume Percent (%)</StyledTableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
                  {coinsmarkets?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.exchangeId}
                      </StyledTableCell>
                      <StyledTableCell align="right">{row.baseId}</StyledTableCell>
                      <StyledTableCell align="right">{row.quoteId}</StyledTableCell>
                      <StyledTableCell align="right">{row.baseSymbol}</StyledTableCell>
                      <StyledTableCell align="right">{row.quoteSymbol}</StyledTableCell>
                      <StyledTableCell align="right">{row.priceUsd}</StyledTableCell>
                      <StyledTableCell align="right">{row.volumePercent}</StyledTableCell>

                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={coinsmarkets?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
          <Grid item xs={6}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell >Pirce (USD)</StyledTableCell>
                    <StyledTableCell >Time</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {coinhistory?.data?.slice(histpage * rowsPerPageHist, histpage * rowsPerPageHist + rowsPerPageHist)?.map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.date}
                      </StyledTableCell>
                      <StyledTableCell >{row.priceUsd}</StyledTableCell>
                      <StyledTableCell >{row.time}</StyledTableCell>

                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={coinhistory?.data?.length}
              rowsPerPage={rowsPerPageHist}
              page={histpage}
              onPageChange={handleChangePageHist}
              onRowsPerPageChange={handleChangeRowsPerPageHist}
            />
          </Grid>
        </Grid>

      </Container>
    </>
  )
}

export default singlecoin