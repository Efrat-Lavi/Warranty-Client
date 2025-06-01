import React, { useState } from "react"
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useTheme, useMediaQuery, Toolbar, Container } from "@mui/material"
import { Link, useLocation, Outlet } from "react-router-dom"
import Header from "./header"
import { People as PeopleIcon, ChevronLeft as ChevronLeftIcon } from "@mui/icons-material"
import { LayoutDashboardIcon, SearchIcon, SettingsIcon, UploadIcon } from "lucide-react"
const drawerWidth = 260

const AppLayout: React.FC = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down("md"))
    const [open, setOpen] = useState(!isMobile)
    const location = useLocation()

    const handleDrawerToggle = () => {
        setOpen(!open)
    }

    const menuItems = [
        { text: "Dashboard", icon: <LayoutDashboardIcon />, path: "/dashboard" },
        { text: "Upload Warranty", icon: <UploadIcon />, path: "/add-warranty" },
        { text: "My Warranties", icon: <SearchIcon />, path: "/record" },
        { text: "Shared With Me", icon: <PeopleIcon />, path: "/SharedWithMe" },
        { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    ]

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Header
                handleDrawerToggle={handleDrawerToggle}
            />
            <Drawer
                variant={isMobile ? "temporary" : "persistent"}
                open={open}
                onClose={isMobile ? handleDrawerToggle : undefined}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        borderRight: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.default,
                    },
                }}
            >
                <Toolbar />
                {!isMobile && (
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", p: 1 }}>
                        <IconButton onClick={handleDrawerToggle}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Box>
                )}
                <List sx={{ mt: 2 }}>
                    {menuItems.map((item) => (
                        <ListItem
                            // button
                            key={item.text}
                            component={Link}
                            to={item.path}
                            sx={{
                                py: 1.5,
                                px: 3,
                                mb: 0.5,
                                borderRadius: "0 24px 24px 0",
                                mr: 2,
                                backgroundColor:
                                    location.pathname === item.path ? theme.palette.primary.main : "transparent",
                                "&:hover": {
                                    // backgroundColor:  location.pathname === item.path ? theme.palette.grey: theme.palette.grey,
                                    // backgroundColor: theme.palette.grey,
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    color: location.pathname === item.path ? "white" : theme.palette.secondary.dark, // צבע ברירת מחדל
                                    "&:hover": {
                                    color: location.pathname === item.path ? "black" : theme.palette.primary.dark,
                                        // color: location.pathname === item.path ? theme.palette.primary.dark[300] : theme.palette.grey[700], // צבע אחר לפי בחירה
                                    },
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontWeight: location.pathname === item.path ? 600 : 400,
                                }}
                                sx={{
                                    color: location.pathname === item.path ? "white" : theme.palette.secondary.dark, // צבע ברירת מחדל
                                    "&:hover": {
                                        fontWeight: location.pathname === item.path ? 600 : 400,
                                    color: location.pathname === item.path ? "black" : theme.palette.primary.dark,
                                        // color: location.pathname === item.path ? theme.palette.primary.dark[300] : theme.palette.grey[700], // צבע אחר לפי בחירה
                                    },
                                }}
                            />

                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: "100%" },
                    //   width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
                    //   ml: { sm: `${open ? drawerWidth : 0}px` },
                    transition: theme.transitions.create(["margin", "width"], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    backgroundColor: theme.palette.background.default,
                    minHeight: "100vh",
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 2 }}>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    )
}

export default AppLayout
