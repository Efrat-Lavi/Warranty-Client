// import {
//     Box, Typography, Button, IconButton, Grid, TextField, CircularProgress
// } from "@mui/material";
// import { Edit as EditIcon, Save as SaveIcon } from "@mui/icons-material";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUserDetails } from "../redux/userSlice";
// import { AddDispatch, StoreType } from "../redux/store";
// import { getUserByEmail, loginUser } from "../redux/authSlice";
// import { useNavigate } from "react-router-dom";

// const UserProfile = () => {
//     const dispatch: AddDispatch = useDispatch();
//     const navigate = useNavigate();
//     const { user, token } = useSelector((store: StoreType) => store.auth);

//     const [editMode, setEditMode] = useState(false);
//     const [updatedUser, setUpdatedUser] = useState({
//         nameUser: user?.nameUser || "",
//         email: user?.email || "",
//     });
//     const [isLoading, setIsLoading] = useState(false);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
//     };

//     const handleSave = async () => {
//         console.log(updatedUser);

//         setIsLoading(true);
//         if (token && user?.id)
//             await dispatch(updateUserDetails({ token: token, user: updatedUser, userId: user?.id }))
//                 .then(() => dispatch(getUserByEmail({ token: token, email: updatedUser.email })));
//         setIsLoading(false);
//         setEditMode(false);
//         navigate("/");
//     };

//     return (
//         <Box sx={{ p: 3, maxWidth: 500, mx: "auto", boxShadow: 2, borderRadius: 2, backgroundColor: "white" }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//                 User Profile
//             </Typography>

//             <Grid container spacing={2} alignItems="center">
//                 <Grid item xs={12}>
//                     <TextField
//                         label="Full Name"
//                         name="nameUser"
//                         fullWidth
//                         value={updatedUser.nameUser}
//                         onChange={handleChange}
//                         disabled={!editMode}
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <TextField
//                         label="Email Address"
//                         name="email"
//                         fullWidth
//                         value={updatedUser.email}
//                         disabled
//                     />
//                 </Grid>
//             </Grid>

//             <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
//                 {editMode ? (
//                     <Button
//                         variant="contained"
//                         startIcon={<SaveIcon />}
//                         onClick={handleSave}
//                         disabled={isLoading}
//                     >
//                         {isLoading ? <CircularProgress size={24} /> : "Save Changes"}
//                     </Button>
//                 ) : (
//                     <Button
//                         variant="outlined"
//                         startIcon={<EditIcon />}
//                         onClick={() => setEditMode(true)}
//                     >
//                         Edit Profile
//                     </Button>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default UserProfile;
"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  CircularProgress,
  Paper,
  Avatar,
  Switch,
  Divider,
  alpha,
  Fade,
  Chip,
} from "@mui/material"
import { User, Edit, Save, Mail, Bell, BellOff, CheckCircle } from "lucide-react"
import { updateUserDetails } from "../redux/userSlice"
import { getUserByEmail } from "../redux/authSlice"
import type { AddDispatch, StoreType } from "../redux/store"
import { motion } from "framer-motion"

const MotionPaper = motion(Paper)

const UserProfile = () => {
  const dispatch: AddDispatch = useDispatch()
  const navigate = useNavigate()
  const { user, token } = useSelector((store: StoreType) => store.auth)

  const [editMode, setEditMode] = useState(false)
  const [updatedUser, setUpdatedUser] = useState({
    nameUser: user?.nameUser || "",
    email: user?.email || "",
    isAccessEmails: user?.isAccessEmails || false, // Adding email notification preference
  })
  const [isLoading, setIsLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value })
  }
  const handleToggleEmails = () => {
    setUpdatedUser(prev => {
        const newState = { ...prev, isAccessEmails: !prev.isAccessEmails };
        console.log("Updated state:", newState);
        return newState;
    });
};

  const handleSave = async () => {
    setIsLoading(true)
    if (token && user?.id) {
      console.log(updatedUser);
      
      await dispatch(updateUserDetails({ token: token, user: updatedUser, userId: user?.id })).then(() =>
        dispatch(getUserByEmail({ token: token, email: updatedUser.email })),
      )

      // Show success message briefly
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    }
    setIsLoading(false)
    setEditMode(false)
    navigate("/")
  }

  const handleCancel = () => {
    // Reset to original values
    setUpdatedUser({
      nameUser: user?.nameUser || "",
      email: user?.email || "",
      isAccessEmails: user?.isAccessEmails || false,
    })
    setEditMode(false)
  }

  // Get first letter of name for avatar
  const getInitial = () => {
    console.log(user);
    
    return updatedUser.nameUser.charAt(0).toUpperCase()
  }

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      elevation={0}
      sx={{
        p: 0,
        maxWidth: 550,
        mx: "auto",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: "primary.main",
              mr: 2,
            }}
          >
            {getInitial()}
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            User Profile
          </Typography>
        </Box>

        <Button
          variant={editMode ? "outlined" : "contained"}
          startIcon={editMode ? <Save size={18} /> : <Edit size={18} />}
          onClick={editMode ? handleSave : () => setEditMode(true)}
          disabled={isLoading}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            px: 2,
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : editMode ? "Save Changes" : "Edit Profile"}
        </Button>
      </Box>

      {/* Success message */}
      <Fade in={saveSuccess}>
        <Box
          sx={{
            p: 2,
            bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
            color: "success.main",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CheckCircle size={18} />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            Profile updated successfully!
          </Typography>
        </Box>
      </Fade>

      {/* Content */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Name Field */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
            >
              <User size={16} />
              Full Name
            </Typography>

            {editMode ? (
              <TextField
                name="nameUser"
                fullWidth
                value={updatedUser.nameUser}
                onChange={handleChange}
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            ) : (
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: (theme) => alpha(theme.palette.background.default, 0.5),
                }}
              >
                {updatedUser.nameUser}
              </Typography>
            )}
          </Grid>

          {/* Email Field */}
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
            >
              <Mail size={16} />
              Email Address
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                borderRadius: 2,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.5),
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 500,
                  flex: 1,
                }}
              >
                {updatedUser.email}
              </Typography>

              <Chip
                size="small"
                label="Primary"
                sx={{
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                  color: "primary.main",
                  fontWeight: 500,
                  height: 24,
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
          </Grid>

          {/* Email Notifications Toggle */}
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderRadius: 2,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.7),
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {updatedUser.isAccessEmails ? <Bell size={20} color="#10a37f" /> : <BellOff size={20} color="#6e6e80" />}
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Email Notifications
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {updatedUser.isAccessEmails
                      ? "You will receive email notifications"
                      : "Email notifications are disabled"}
                  </Typography>
                </Box>
              </Box>

              <Switch
                checked={updatedUser.isAccessEmails}
                onChange={handleToggleEmails}
                disabled={!editMode}
                color="primary"
              />
            </Box>
          </Grid>
        </Grid>

        {/* Cancel button (only in edit mode) */}
        {editMode && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="text"
              onClick={handleCancel}
              sx={{
                mr: 2,
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Cancel
            </Button>
          </Box>
        )}
      </Box>
    </MotionPaper>
  )
}

export default UserProfile

