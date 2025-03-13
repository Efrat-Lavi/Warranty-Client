
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../redux/authSlice";
// import { StoreType } from "../redux/store";
// import { AccountCircle, Settings, ExitToApp } from "@mui/icons-material";
// import { Menu, MenuItem, IconButton, AppBar, Toolbar, Button, Avatar, Box } from "@mui/material";
// import { useState } from "react";

// const Header = () => {
//   const dispatch = useDispatch();
//   const { user, token } = useSelector((state: StoreType) => state.auth);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     handleMenuClose();
//   };

//   return (
//     <AppBar position="static" sx={{ backgroundColor: "#1c1c1c", padding: "0.5rem",width: "100%" }}>
//       <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
//         {token ? (
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
//               <Avatar sx={{ bgcolor: "#238636" }}>
//                 {user?.nameUser?.charAt(0).toUpperCase() || "U"}
//               </Avatar>
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleMenuClose}
//               MenuListProps={{ "aria-labelledby": "profile-button" }}
//             >
//               <MenuItem onClick={handleMenuClose}>
//                 <Settings sx={{ mr: 1 }} /> Settings
//               </MenuItem>
//               <MenuItem onClick={handleLogout}>
//                 <ExitToApp sx={{ mr: 1 }} /> Logout
//               </MenuItem>
//             </Menu>
//           </Box>
//         ) : (
//           <Button href="/login" variant="contained" sx={{ backgroundColor: "#238636", "&:hover": { backgroundColor: "#2ea043" } }}>
//             Login
//           </Button>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { StoreType } from "../redux/store";
import { AccountCircle, Settings, ExitToApp } from "@mui/icons-material";
import {
  Menu,
  MenuItem,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Box,
  Divider,
  Paper,
} from "@mui/material";
import { useState } from "react";

const Header = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: StoreType) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1c1c1c", padding: "0.5rem", width: "100%" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        {token ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
              <Avatar sx={{ bgcolor: "#238636" }}>
                {user?.nameUser?.charAt(0).toUpperCase() || "U"}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              MenuListProps={{ "aria-labelledby": "profile-button" }}
              PaperProps={{
                component: Paper,
                sx: {
                  borderRadius: "12px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                  minWidth: "180px",
                  padding: "0.5rem",
                  backgroundColor: "#fff",
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem sx={{ fontWeight: 500, color: "#333", "&:hover": { backgroundColor: "#f0f0f0" } }} onClick={handleMenuClose}>
                <AccountCircle sx={{ mr: 1, color: "#238636" }} /> Profile
              </MenuItem>
              <MenuItem sx={{ fontWeight: 500, color: "#333", "&:hover": { backgroundColor: "#f0f0f0" } }} onClick={handleMenuClose}>
                <Settings sx={{ mr: 1, color: "#238636" }} /> Settings
              </MenuItem>
              <Divider />
              <MenuItem sx={{ fontWeight: 500, color: "red", "&:hover": { backgroundColor: "#fce8e6" } }} onClick={handleLogout}>
                <ExitToApp sx={{ mr: 1, color: "red" }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
            <Button
            href="/login"
            variant="contained"
            sx={{
              backgroundColor: "#238636",
              "&:hover": { backgroundColor: "#2ea043",color:"black" },
              textTransform: 'none',  // מניעת שינוי לאותיות גדולות
              "&:focus": {
                outline: "none",  // הסרת קו המיקוד הכחול
                boxShadow: "none", // הסרת הצל של המיקוד
              },
            }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
