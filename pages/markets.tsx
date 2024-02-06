import { axiosInstance } from '@/api/axiosinstance';
import { endPoints } from '@/api/endpoints';
import { Root4 } from '@/typescript/interface/marketlist';
import { Container, Typography } from '@mui/material';
import React from 'react'
import { useQuery } from 'react-query';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetServerSideProps } from 'next';

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


export async function getStaticProps() {
  const mtdata = await getMareketDetails()
  return { props: { mtdata }, revalidate: 60 }
}

export const getMareketDetails = async () => {

  const data = await axiosInstance.get<Root4>(
    endPoints.fetchedmarkets.allmarket
  )
  // const time = data
  console.log(data.data);
  return data?.data?.data

}

const markets = (props: any) => {
  const { data } = useQuery({
    queryKey: ["mkarketlist"],
    queryFn: getMareketDetails,

    //   return {
    //     props: {
    //       mtdata
    //     }, 
    //     revalidate: 60
    //   }

    // }
  })

  return (
    <Container>
      <Typography sx={{ my: 5 }}>Market List</Typography>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Rank</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell >Base Symbol</StyledTableCell>
              <StyledTableCell >Quote Id</StyledTableCell>
              <StyledTableCell>Pirce (USD)</StyledTableCell>
              <StyledTableCell >Volume Percent (%)</StyledTableCell>
              <StyledTableCell>Trades Count (24 Hr)</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any, index: number) => (
              <StyledTableRow key={index}>
                <StyledTableCell>
                  {row.rank}
                </StyledTableCell>
                {/* <StyledTableCell align="right">{row.id}</StyledTableCell> */}
                <StyledTableCell >{row.exchangeId}</StyledTableCell>
                <StyledTableCell >{row.baseSymbol}</StyledTableCell>
                <StyledTableCell >{row.quoteId}</StyledTableCell>
                <StyledTableCell >{row.priceUsd}</StyledTableCell>
                <StyledTableCell >{row.volumeUsd24Hr}</StyledTableCell>
                <StyledTableCell>{row.tradesCount24Hr}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default markets