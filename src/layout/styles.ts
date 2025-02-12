import { styled } from '@mui/material/styles';

export const Grid = styled('div')`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const TopGridItem = styled('div')`
  grid-row: 1; /* App bar is in the first row */
  grid-column: 1 / -1; /* App bar spans all columns */
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
`;

export const MapContainer = styled('div')`
  grid-row: 2; /* Map is in the second row */
  grid-column: 1; /* Map takes the first column */
  overflow: hidden;
  position: relative;
`;
