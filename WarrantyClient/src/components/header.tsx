
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { StoreType } from "../redux/store";
import { AccountCircle, Settings, ExitToApp, Menu as MenuIcon } from "@mui/icons-material";
import { Menu, MenuItem, IconButton, AppBar, Toolbar, Button, Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

interface HeaderProps {
  handleDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ handleDrawerToggle }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: StoreType) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/"); 
  };

  const handleProfile = () => {
    handleMenuClose();
    navigate("/profile");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.default,
        color: theme.palette.primary.main,
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
        padding: "0.5rem",
        width: "100%",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Left section with logo and menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
            Keep It
          </Typography>
          <img src="/warranty-vault-logo.png" alt="Logo" style={{ height: '50px', width: 'auto', marginRight: '10px' }} />

        </Box>
        
        {/* Right section with notifications and user menu */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* <IconButton size="large" aria-label="notifications" color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          {token ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton onClick={handleMenuOpen} sx={{ color: theme.palette.primary.main }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
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
                    backgroundColor: theme.palette.background.default,
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem sx={{ fontWeight: 500, color: theme.palette.secondary.main, "&:hover": { backgroundColor: "#f0f0f0" } }} onClick={handleProfile}>
                  <AccountCircle sx={{ mr: 1, color: theme.palette.primary.main }} /> Profile
                </MenuItem>
                <MenuItem sx={{ fontWeight: 500, color: theme.palette.secondary.main, "&:hover": { backgroundColor: "#f0f0f0" } }} onClick={handleProfile}>
                  <Settings sx={{ mr: 1, color: theme.palette.primary.main }} /> Settings
                </MenuItem>
                <Divider />
                <MenuItem sx={{ fontWeight: 500, color: "red", "&:hover": { backgroundColor: "#fce8e6" } }} onClick={handleLogout}>
                  <ExitToApp sx={{ mr: 1, color: "red" }} /> Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Button
              // href="/login"
              onClick={() => navigate("/login")}
              variant="contained"
              color="primary"
            >
              Login1
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
