import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow as MuiTableRow,
} from '@mui/material';
import { Controls } from './controls';
import data from '../data/bart-stations.json';
import { useStore, selectors } from '../state';
import { PropsWithChildren } from 'react';

const baseSx = { '&:last-child td, &:last-child th': { border: 0 } };
const activeSx = {
  backgroundColor: '#ffcccb',
};

function TableRow({ id, children }: PropsWithChildren<{ id: string }>) {
  const activeId = useStore(selectors.activeId);

  const sx = activeId === id ? { ...baseSx, ...activeSx } : baseSx;

  return <MuiTableRow sx={sx}>{children}</MuiTableRow>;
}

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <MuiTableRow>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Entries</TableCell>
            <TableCell align="right">Coordinates</TableCell>
            <TableCell align="right">Actions</TableCell>
          </MuiTableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.code} id={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.entries}</TableCell>
              <TableCell align="right">{row.coordinates}</TableCell>
              <TableCell align="right">
                <Controls
                  context={'dashboard'}
                  coordinates={row.coordinates as [number, number]}
                  id={row.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
