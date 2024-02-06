import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Container, TablePagination, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { axiosInstance } from "@/api/axiosinstance";
import { endPoints } from "@/api/endpoints";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Root } from "@/typescript/interface/coins";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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

export default function Home() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["coinlists"],
    queryFn: async () => {
      const data = await axiosInstance.get<Root>(
        endPoints.fetchedCoinDetails.allcoins
      )
      console.log(data?.data?.data);
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

  if (isLoading) {
    return (
      <h2>
        Loading...
      </h2>
    )

  }


  return (
    <>
      <Container maxWidth='xl' sx={{ my: 3 }}>

        {/* <Typography variant="h2" textAlign={'center'} sx={{ my: 3 }}>Home page</Typography> */}
        {/* <div style={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: listperpage, pageSize: noOfPages },
              },
            }}
            pageSizeOptions={[listperpage, listperpage+listperpage]}
          />
          
        </div> */}
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Rank</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell >Base Symbol</StyledTableCell>
                <StyledTableCell>Supply</StyledTableCell>
                <StyledTableCell>Pirce (USD)</StyledTableCell>
                <StyledTableCell >MarketCap (USD)</StyledTableCell>
                <StyledTableCell >Volume Percent (%)</StyledTableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: number) => {
                  return (
                    <>
                      <StyledTableRow key={index}
                        // component={Link} href={`/singlecoin/${row?.name?.toLowerCase()}`}
                        style={{ textDecoration: 'none' }}>
                        <StyledTableCell>
                          {row.rank}
                        </StyledTableCell>
                        <Link href={`/singlecoin/${row?.name?.toLowerCase()}`}>
                          <StyledTableCell >{row.name}</StyledTableCell>
                        </Link>
                        <StyledTableCell >
                          {row.symbol}</StyledTableCell>
                        <StyledTableCell >{row.supply}</StyledTableCell>
                        <StyledTableCell >{row.priceUsd}</StyledTableCell>
                        <StyledTableCell >{row.marketCapUsd}</StyledTableCell>
                        <StyledTableCell >{row.volumeUsd24Hr}</StyledTableCell>
                      </StyledTableRow>
                    </>
                  )
                })}

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

      </Container>

    </>
  );
}
