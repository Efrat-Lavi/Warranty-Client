
import { AppBar, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import { AddDispatch, StoreType } from "../redux/store";
import { useEffect } from "react";
import { getRecords } from "../redux/recordSlice";

const Layout = () => {
  const dispatch :AddDispatch= useDispatch();
  const records = useSelector((state: StoreType) => state.records.records);
  const userId = useSelector((state: StoreType) => state.auth.user?.id); // התאימי לשם המשתמש ב-Redux שלך
  const token = useSelector((state: StoreType) => state.auth.token); // במידה וה-token מאוחסן ב-Redux

  useEffect(() => {
    if (token && userId) {
      dispatch(getRecords({ token, userId }));
    }
  }, [dispatch, token, userId]);
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", minHeight: "100vh" }}>

      <AppBar position="fixed" color="default" elevation={2}>
        <Toolbar>
          <Header />
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* מרווח מתחת להדר */}
      <main style={{
        width: "100%",
        height: "100%",
        padding: "16px",
        display: "flex",
        flexDirection: "column"
      }}>
        <Outlet />
      </main>

    </div>
  );
};
export default Layout;
