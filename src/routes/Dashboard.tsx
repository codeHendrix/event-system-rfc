import BasicTable from '../components/table';
import { useRegisterWindow } from '../hooks/useRegisterWindow';
import { WindowProvider } from '../hooks/useWindows';
import { WindowType } from '../types';

export function Dashboard() {
  const id = useRegisterWindow(WindowType.Dashboard);
  return (
    <WindowProvider id={id} type={WindowType.Dashboard}>
      <BasicTable />
    </WindowProvider>
  );
}
