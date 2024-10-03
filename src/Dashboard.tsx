import { Paper } from '@mui/material';
import data from './data/bart-stations.json';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Controls } from './components/baseball-card/controls';
import { MapEvents } from './events/events';
import { BroadcastEventChannel } from './channels/broadcast-event-channel';
import { createEventBus } from 'ts-event-bus';

const DashboardEventBus = createEventBus({
  events: MapEvents,
  channels: [new BroadcastEventChannel('map')],
});

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
    headerName: 'controls',
    sortable: false,
    renderCell: ({ row }) => {
      return <Controls coordinates={row.coordinates} />;
    },
    width: 200,
  },
];
const rows = data.map((el) => ({ id: el.code, ...el }));

DashboardEventBus.ping.on((args) =>
  console.log(`pong from ${args} in dashboard`)
);

// setInterval(() => {
//   DashboardEventBus.ping('dashboard');
// }, 3000);

export function Dashboard() {
  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
