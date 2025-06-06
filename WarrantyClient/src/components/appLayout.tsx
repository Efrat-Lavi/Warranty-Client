import type React from "react"
import { useState } from "react"
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Toolbar,
  Container,
  Divider,
  Tooltip,
} from "@mui/material"
import { Link, useLocation, Outlet } from "react-router-dom"
import Header from "./header"
import { People as PeopleIcon, Menu as MenuIcon } from "@mui/icons-material"
import { LayoutDashboardIcon, SearchIcon, SettingsIcon, UploadIcon } from "lucide-react"

const drawerWidthOpen = 260
const drawerWidthClosed = 72

const AppLayout: React.FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [open, setOpen] = useState(!isMobile)
  const [pinned, setPinned] = useState(!isMobile)
  const [hovered, setHovered] = useState(false)
  const location = useLocation()

  const isExpanded = isMobile ? open : pinned || hovered
  const currentWidth = isExpanded ? drawerWidthOpen : drawerWidthClosed

  // Calculate text container width and opacity for Gemini-like effect
  const textContainerWidth = Math.max(0, currentWidth - 80)
  const maxTextWidth = drawerWidthOpen - 80
  const textOpacity = Math.min(1, textContainerWidth / 100) // Fade in gradually

  const handleDrawerToggle = () => {
    if (isMobile) {
      setOpen(!open)
    } else {
      setPinned(!pinned)
    }
  }

  const handleMouseEnter = () => {
    if (!isMobile && !pinned) {
      setHovered(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile && !pinned) {
      setHovered(false)
    }
  }

  const mainMenuItems = [
    { text: "Dashboard", icon: <LayoutDashboardIcon />, path: "/dashboard" },
    { text: "Upload Warranty", icon: <UploadIcon />, path: "/add-warranty" },
    { text: "My Warranties", icon: <SearchIcon />, path: "/record" },
    { text: "Shared With Me", icon: <PeopleIcon />, path: "/SharedWithMe" },
  ]

  const settingsItems = [{ text: "Settings", icon: <SettingsIcon />, path: "/settings" }]

  const renderMenuItem = (item: any) => {
    const isActive = location.pathname === item.path

    const listItem = (
      <ListItem
        key={item.text}
        component={Link}
        to={item.path}
        sx={{
          py: 1.5,
          px: isExpanded ? 3 : 1.5,
          mb: 0.8,
          borderRadius: isExpanded ? "0 24px 24px 0" : "12px",
          mr: isExpanded ? 2 : 1,
          ml: isExpanded ? 0 : 1,
          backgroundColor: isActive ? theme.palette.primary.main : "transparent",
          transition: theme.transitions.create(["padding", "margin", "border-radius", "background-color"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
          minHeight: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: isExpanded ? "flex-start" : "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: isActive ? `0 4px 12px ${theme.palette.primary.main}40` : "none",
          "&:hover": {
            backgroundColor: isActive
              ? theme.palette.primary.dark
              : theme.palette.mode === "light"
                ? "rgba(0, 0, 0, 0.04)"
                : "rgba(255, 255, 255, 0.08)",
            boxShadow: isActive ? `0 6px 16px ${theme.palette.primary.main}60` : "none",
          },
          "&::before": isActive
            ? {
                content: '""',
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: 4,
                height: "60%",
                backgroundColor: "white",
                borderRadius: "0 4px 4px 0",
              }
            : {},
        }}
      >
        <ListItemIcon
          sx={{
            color: isActive ? "white" : theme.palette.secondary.dark,
            minWidth: isExpanded ? 40 : "auto",
            justifyContent: "center",
            transition: theme.transitions.create(["color", "min-width"], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
            "& svg": {
              fontSize: 22,
              transition: theme.transitions.create(["transform"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.shorter,
              }),
              transform: isActive ? "scale(1.1)" : "scale(1)",
            },
          }}
        >
          {item.icon}
        </ListItemIcon>

        {/* Gemini-style text reveal with gradient fade */}
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            width: `${textContainerWidth}px`,
            transition: theme.transitions.create(["width"], {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
            ml: 0.5,
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "20px",
              background: `linear-gradient(to right, transparent, ${
                isActive ? theme.palette.primary.main : theme.palette.background.default
              })`,
              pointerEvents: "none",
              opacity: textContainerWidth < maxTextWidth ? 1 : 0,
              transition: theme.transitions.create(["opacity"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.standard,
              }),
            },
          }}
        >
          <ListItemText
            primary={item.text}
            primaryTypographyProps={{
              fontWeight: isActive ? 600 : 400,
              variant: "body2",
            }}
            sx={{
              color: isActive ? "white" : theme.palette.secondary.dark,
              opacity: textOpacity,
              whiteSpace: "nowrap",
              transition: theme.transitions.create(["opacity"], {
                easing: theme.transitions.easing.easeInOut,
                duration: theme.transitions.duration.standard,
              }),
              "& .MuiListItemText-primary": {
                overflow: "visible",
              },
            }}
          />
        </Box>
      </ListItem>
    )

    // Show tooltip when text is not fully visible
    if (textContainerWidth < maxTextWidth && !isMobile) {
      return (
        <Tooltip key={item.text} title={item.text} placement="right" arrow>
          {listItem}
        </Tooltip>
      )
    }

    return listItem
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* <Header handleDrawerToggle={handleDrawerToggle} /> */}
<Header></Header>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{
          width: currentWidth,
          flexShrink: 0,
          position: "fixed",
          zIndex: theme.zIndex.drawer,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
          "& .MuiDrawer-paper": {
            width: currentWidth,
            boxSizing: "border-box",
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.default,
            boxShadow: theme.shadows[3],
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.easeInOut,
              duration: theme.transitions.duration.standard,
            }),
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <Divider sx={{ mx: isExpanded ? 2 : 1, mb: 2 }} />

        {/* Menu toggle button */}
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: isExpanded ? "flex-end" : "center",
              px: isExpanded ? 3 : 1,
              mb: 1,
              mt:3
            }}
          >
            <Tooltip title={pinned ? "Collapse sidebar" : "Expand sidebar"}>
              <IconButton
                onClick={handleDrawerToggle}
                size="small"
                sx={{
                  color: theme.palette.text.secondary,
                  bgcolor: theme.palette.background.paper,
                  boxShadow: theme.shadows[1],
                  width: 32,
                  height: 32,
                  "&:hover": {
                    bgcolor: theme.palette.action.hover,
                  },
                }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {/* Main menu items */}
        <List sx={{ mt: 1, flexGrow: 1, px: 0 }}>
          {mainMenuItems.map((item, index) => (
            <Box key={item.text}>
              {renderMenuItem(item)}
              {/* Add separator line between icons */}
              {index < mainMenuItems.length - 1 && (
                <Divider
                  sx={{
                    mx: isExpanded ? 3 : 2,
                    my: 0.5,
                    opacity: 0.3,
                  }}
                />
              )}
            </Box>
          ))}
        </List>

        {/* Divider before settings */}
        <Divider sx={{ mx: isExpanded ? 2 : 1, my: 1 }} />

        {/* Settings at bottom */}
        <List sx={{ pb: 2, px: 0 }}>{settingsItems.map((item) => renderMenuItem(item))}</List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          marginLeft: isMobile ? 0 : `${currentWidth}px`, // Changed this line to use currentWidth
          transition: theme.transitions.create(["margin"], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.standard,
          }),
          backgroundColor: theme.palette.background.default,
          minHeight: "100vh",
          position: "relative",
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
