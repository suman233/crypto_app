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
const markets = () => {
    const { isLoading, data, error } = useQuery({
        queryKey: ["marketlists"],
        queryFn: async () => {
          const data = await axiosInstance.get<Root4>(
            endPoints.fetchedmarkets.allmarket
          )
          console.log(data.data.data);
          return data?.data
        }
      })

  
    //   const [page, setPage] = useState(1);
    
    //   const listperpage: number = 10
    //   const lastIndex: number = page * listperpage
    //   const firstIndex: number = lastIndex - listperpage
    //   const listrecords = data?.slice(firstIndex, lastIndex)
    //   const noOfPages = Math.ceil(data?.length / listperpage)
    //   const handlePage = (event, value) => {
    //     setPage(value);
    //   };
    
    
    //   const rows = listrecords?.map((item, index) => {
    //     item["index"] = index;
    //     return (
    //       item
    //     )
    //   })
  return (
    <Container>
        <Typography sx={{my:5}}>Market List</Typography>
        <TableContainer component={Paper}>
          <Table  aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Rank</StyledTableCell>
                {/* <StyledTableCell align="right">ID</StyledTableCell> */}
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell >Base Symbol</StyledTableCell>
                <StyledTableCell >Quote Id</StyledTableCell>
                <StyledTableCell>Pirce (USD)</StyledTableCell>
                <StyledTableCell >Volume Percent (%)</StyledTableCell>
                <StyledTableCell>Trades Count (24 Hr)</StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((row, index) => (
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