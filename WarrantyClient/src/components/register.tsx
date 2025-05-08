import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  alpha,
  useTheme,
} from "@mui/material"
import { Eye, EyeOff, UserPlus, AlertCircle, Mail, Lock, User, ArrowRight, Shield } from "lucide-react"
import { registerUser, loginUser } from "../redux/authSlice"
import type { AddDispatch, StoreType } from "../redux/store"
import { motion } from "framer-motion"
import { sendEmailOnRegistration } from "../services/emailServices"

const MotionPaper = motion(Paper)

// Validation schema
const schema = yup.object().shape({
  NameUser: yup.string().required("Full name is required"),
  Email: yup.string().email("Invalid email address").required("Email is required"),
  Password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

const RegisterPage = () => {
  const dispatch: AddDispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error } = useSelector((state: StoreType) => state.auth)
  const [showPassword, setShowPassword] = useState(false)
  const theme = useTheme()

  // Form handling with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // Handle registration submission
  const onSubmit = async (data: { NameUser: string; Email: string; Password: string }) => {
    const result = await dispatch(registerUser({ ...data, Role: "User" }))
    if (registerUser.fulfilled.match(result)) {
      // Auto login after registration
      const loginResult = await dispatch(loginUser({ email: data.Email, password: data.Password }))
      if (loginUser.fulfilled.match(loginResult)) {
        navigate("/")
      //   const newUser = {
      //     email: data.Email,
      // };
      
      sendEmailOnRegistration({email:data.Email,warrantyLink:window.location.href});
      
      }
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03),
      }}
    >
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 4,
            pb: 3,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <Shield size={32} color={theme.palette.primary.main} />
          </Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join Warranty Keeper to manage your warranties
          </Typography>
        </Box>

        {/* Error message */}
        {error && (
          <Box sx={{ px: 4 }}>
            <Alert
              severity="error"
              icon={<AlertCircle size={18} />}
              sx={{
                mb: 3,
                alignItems: "center",
                "& .MuiAlert-icon": {
                  alignItems: "center",
                  pt: 0,
                },
              }}
            >
              {error}
            </Alert>
          </Box>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 4, pt: 2 }}>
          {/* Full Name field */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Full Name"
              variant="outlined"
              error={!!errors.NameUser}
              helperText={errors.NameUser?.message}
              {...register("NameUser")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User size={18} color={errors.NameUser ? theme.palette.error.main : undefined} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: (theme) => alpha(theme.palette.background.default, 0.8),
                },
              }}
            />
          </Box>

          {/* Email field */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Email address"
              variant="outlined"
              error={!!errors.Email}
              helperText={errors.Email?.message}
              {...register("Email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={18} color={errors.Email ? theme.palette.error.main : undefined} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: (theme) => alpha(theme.palette.background.default, 0.8),
                },
              }}
            />
          </Box>

          {/* Password field */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              variant="outlined"
              error={!!errors.Password}
              helperText={errors.Password?.message}
              {...register("Password")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={18} color={errors.Password ? theme.palette.error.main : undefined} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  bgcolor: (theme) => alpha(theme.palette.background.default, 0.8),
                },
              }}
            />
          </Box>

          {/* Register button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <UserPlus size={18} />}
            sx={{
              py: 1.5,
              mt: 1,
              mb: 2,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Divider */}
          <Box sx={{ position: "relative", my: 3 }}>
            <Divider>
              <Typography variant="body2" sx={{ px: 1, color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>
          </Box>

          {/* Google sign up */}
          <Button
            fullWidth
            variant="outlined"
            sx={{
              py: 1.5,
              mb: 2,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              fontSize: "1rem",
              borderColor: "divider",
              color: "text.primary",
              bgcolor: (theme) => alpha(theme.palette.background.default, 0.8),
              "&:hover": {
                bgcolor: (theme) => alpha(theme.palette.background.default, 1),
                borderColor: "divider",
              },
            }}
          >
            <Box component="img" src="/google-icon.svg" alt="Google" sx={{ width: 18, height: 18, mr: 1 }} />
            Sign up with Google
          </Button>

          {/* Cancel button */}
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate("/")}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
              color: "text.secondary",
            }}
          >
            Cancel
          </Button>

          {/* Login link */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Typography
                component="a"
                variant="body2"
                href="/login"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Sign in
                <ArrowRight size={14} style={{ marginLeft: 4 }} />
              </Typography>
            </Typography>
          </Box>
        </Box>
      </MotionPaper>
    </Box>
  )
}

export default RegisterPage

