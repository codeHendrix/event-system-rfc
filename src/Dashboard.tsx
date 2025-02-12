import { Paper } from '@mui/material';
import data from './data/bart-stations.json';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Controls } from './components/controls';
import { SCATTERPLOT_LAYER_1 } from './constants';

const columns: GridColDef[] = [
  { field: 'code', headerName: 'Id', width: 70 },
  { field: 'name', headerName: 'City', width: 120 },
  { field: 'address', headerName: 'Address', width: 250 },
  {
    field: 'entries',
    headerName: 'Entries',
    type: 'number',
    width: 90,
  },
  {
    field: 'coordinates',
    headerName: 'Coordinates',
    type: 'custom',
    width: 200,
  },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    renderCell: ({ row }) => {
      // again this is silly but just for example sake.
      const eventInfo = {
        layer: SCATTERPLOT_LAYER_1,
        id: row.name,
        picked: true,
        coordinates: row.coordinates,
      };
      return (
        <Controls
          coordinates={row.coordinates}
          hideControls={['close card']}
          cardEventInfo={eventInfo}
        />
      );
    },
    width: 200,
  },
];
const rows = data.map((el) => ({ id: el.code, ...el }));

export function Dashboard() {
  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
