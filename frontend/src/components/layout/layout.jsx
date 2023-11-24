import Menu from '../menu';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
}
