import * as React from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { THETA_DATA_URL } from '../constants/config';
import { Link } from '@mui/material';

function Row({ token }: { token: string }) {
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
            {open ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Link href={`${THETA_DATA_URL}/${token}`}>{token}</Link>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          sx={{ p: 0 }}
          colSpan={6}
          className={`${
            open
              ? 'collapsable-cell--opened'
              : 'collapsable-cell--collapsed'
          }`}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <iframe
              name={token}
              src={`${THETA_DATA_URL}/${token}`}
              style={{
                width: '100%',
                height: '300px',
                border: 'none',
              }}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export interface AccordionTableProps {
  rows: string[];
}

export default function AccordianTable({
  rows,
}: AccordionTableProps) {
  return (
    <>
      <TableContainer component={Paper} className="table-container">
        <Table aria-label="collapsible table" className="table">
          <TableHead>
            <TableRow>
              <TableCell size="small" />
              <TableCell>Token</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <Row key={index} token={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
