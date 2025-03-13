
import { AppBar, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./header";

const Layout = () => {
  return (
    <div>
      <AppBar position="fixed" color="default" elevation={2}>
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
      <div style={{ height: "64px" }} /> {/* רווח מתחת להדר */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
