import BasicTable from './components/table';
import { useRegisterConnection } from './hooks/useRegisterConnection';
import { WindowType } from './types';

export function Dashboard() {
  useRegisterConnection(WindowType.Dashboard);
  return <BasicTable />;
}
