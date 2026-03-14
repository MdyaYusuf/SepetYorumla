import { Outlet, ScrollRestoration } from "react-router-dom";
import { Box } from "@mui/material";

const RootLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollRestoration />

      <Outlet />
    </Box>
  );
};

export default RootLayout;