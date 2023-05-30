import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export interface rowData {
  token: string;
  createdDate: string;
}

const rows = [
    {token: "123", createdDate: "12343"},
    {token: "123", createdDate: "12343"},
    {token: "123", createdDate: "12343"},
    {token: "123", createdDate: "12343"},
];

function Row(props: { row: rowData }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell component="th" scope="row">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
                {row.token}
            </TableCell>
            <TableCell component="th" scope="row">
                {row.createdDate}
            </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6} className={`${open ? "collapsable-cell--opened" : "collapsable-cell--collapsed"}`}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div" color="red">
                  History
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
}

export default function AccordianTable() {
    return (
        <>
            <TableContainer component={Paper} className='table-container'>
              <Table aria-label="collapsible table" className='table'>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Token</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.token} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
        </>
    )
}