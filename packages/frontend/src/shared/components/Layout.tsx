import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { ToastProvider } from '~/shared/contexts/ToastContext';

const Layout = () => {
  return (
    <ToastProvider>
      <Box>
        <Outlet />
      </Box>
    </ToastProvider>
  );
};

export default Layout;
