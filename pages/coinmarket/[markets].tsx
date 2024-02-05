import { axiosInstance } from '@/api/axiosinstance'
import { endPoints } from '@/api/endpoints'
import { Container } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
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


const CoinMarket = () => {
    const router = useRouter()
    const { markets } = router.query
    // console.log(slug);

    const { isLoading, data, error } = useQuery({
        queryKey: ["allmarkets", { markets }],
        enabled: !!markets,
        queryFn: async () => {
            const data = await axiosInstance.get(
                // `/v2/assets/${slug}`
                endPoints.fetchedCoinDetails.marketdetails(`${markets}`)
            )
            console.log(data.data.data);
            return data?.data
        }
    })

  return (
    <Container sx={{my:4}}>
        
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Base ID</StyledTableCell>
            <StyledTableCell align="right">Quote ID</StyledTableCell>
            <StyledTableCell align="right">Base Symbol</StyledTableCell>
            <StyledTableCell align="right">Quote Symbol</StyledTableCell>
            <StyledTableCell align="right">Pirce (USD)</StyledTableCell>
            <StyledTableCell align="right">Volume Percent (%)</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {data?.data.map((row) => (
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
  
    </Container>
  )
}

export default CoinMarket