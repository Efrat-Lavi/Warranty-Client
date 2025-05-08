
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../redux/authSlice";
// import { AddDispatch, StoreType } from "../redux/store";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import "../style/auth.css"
// import { Alert, Box } from "@mui/material";

// // ✅ סכמת אימות עם Yup
// const schema = yup.object().shape({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
// });

// const LoginPage = () => {
//   const dispatch: AddDispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state: StoreType) => state.auth);
//   const [showPassword, setShowPassword] = useState(false);

//   // ✅ ניהול הטופס עם React Hook Form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   // ✅ פונקציה לטיפול בהתחברות
//   const onSubmit = async (data: { email: string; password: string }) => {
//     const result = await dispatch(loginUser(data));
//     if (loginUser.fulfilled.match(result)) {
//       navigate("/"); // חזרה לעמוד הראשי לאחר התחברות מוצלחת
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign in to Warranty Keeper</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* שדה אימייל */}
//           <input
//             type="email"
//             placeholder="Email"
//             {...register("email")}
//             className={errors.email ? "input-error" : ""}
//           />
//           {errors.email && <p className="error">{errors.email.message}</p>}

//           {/* שדה סיסמה עם כפתור עין */}
//           <div className="password-container">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               {...register("password")}
//               className={errors.password ? "input-error" : ""}
//             />
//             <button type="button" className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? <VisibilityOff /> : <Visibility />}
//             </button>
//           </div>
//           {errors.password && <p className="error">{errors.password.message}</p>}

//           {/* הצגת הודעת שגיאה מהשרת */}
//           {error && (
//                 <Box className="max-w-3xl mx-auto p-6">
//                     <Alert severity="error">Error: {error}</Alert>
//                 </Box>
//             )}

//           {/* כפתורי פעולה */}
//           <button className="primary-btn" type="submit" disabled={loading}>
//             Sign In
//           </button>
//           <button className="google-btn">Sign in with Google</button>
//           <button className="cancel-btn" onClick={() => navigate("/")}>
//             Cancel
//           </button>

//           <p className="register-link">
//             New here? <a href="/register">Create an account</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
  useTheme
} from "@mui/material";
import { Eye, EyeOff, LogIn, AlertCircle, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import { googleLoginUser, loginUser } from "../redux/authSlice";
import { AddDispatch, StoreType } from "../redux/store";
import { motion } from "framer-motion";
import { GoogleLogin } from '@react-oauth/google';

const MotionPaper = motion(Paper);

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginPage = () => {
  const dispatch: AddDispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: StoreType) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();

  // Form handling with React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle login submission
  const onSubmit = async (data: { email: string; password: string }) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.03)
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
          borderColor: "divider"
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 4,
            pb: 3,
            textAlign: "center"
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}
          >
            <Shield size={32} color={theme.palette.primary.main} />
          </Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to your Warranty Keeper account
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
                alignItems: 'center',
                '& .MuiAlert-icon': {
                  alignItems: 'center',
                  pt: 0
                }
              }}
            >
              {error}
            </Alert>
          </Box>
        )}

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ p: 4, pt: 2 }}
        >
          {/* Email field */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Email address"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={18} color={errors.email ? theme.palette.error.main : undefined} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: (theme) => alpha(theme.palette.background.default, 0.8)
                }
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
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={18} color={errors.password ? theme.palette.error.main : undefined} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  bgcolor: (theme) => alpha(theme.palette.background.default, 0.8)
                }
              }}
            />
          </Box>

          {/* Sign in button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LogIn size={18} />}
            sx={{
              py: 1.5,
              mt: 1,
              mb: 2,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem"
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>

          {/* Divider */}
          <Box sx={{ position: "relative", my: 3 }}>
            <Divider>
              <Typography variant="body2" sx={{ px: 1, color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>
          </Box>
          {/* Google login button */}
          <Box sx={{ mb: 2 }}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const googleToken = credentialResponse.credential;
                  console.log("Google credential", googleToken);
                  // שלח את הטוקן לשרת לצורך אימות
                  await dispatch(googleLoginUser({ token: googleToken }));
                } catch (error) {
                  console.error('Google login error:', error);
                }
              }}
              onError={() => {
                console.log('Login Failed');
              }}
              useOneTap
            />
          </Box>

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
              color: "text.secondary"
            }}
          >
            Cancel
          </Button>

          {/* Register link */}
          {/* <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              New to Warranty Keeper?{" "}
              <Typography
                component="a"
                variant="body2"
                href="/register"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  '&:hover': {
                    textDecoration: "underline"
                  }
                }}
              >
                Create an account
                <ArrowRight size={14} style={{ marginLeft: 4 }} />
              </Typography>
            </Typography>
          </Box> */}

          {/* Register link */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              New to Warranty Keeper?{" "}
              <Typography
                component="span"
                variant="body2"
                onClick={() => navigate("/register")}
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  cursor: "pointer",
                  '&:hover': {
                    textDecoration: "underline"
                  }
                }}
              >
                Create an account
                <ArrowRight size={14} style={{ marginLeft: 4 }} />
              </Typography>
            </Typography>
          </Box>

        </Box>
      </MotionPaper>
    </Box>
  );
};

export default LoginPage;
