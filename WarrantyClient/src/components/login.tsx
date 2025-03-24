
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../redux/authSlice";
// import { AppDispatch, StoreType } from "../redux/store";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import "../style/auth.css";

// // ✅ סכמת אימות עם Yup
// const schema = yup.object().shape({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
// });

// const LoginPage = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading } = useSelector((state: StoreType) => state.auth);
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
import { loginUser } from "../redux/authSlice";
import { AddDispatch, StoreType } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../style/auth.css"

// ✅ סכמת אימות עם Yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const LoginPage = () => {
  const dispatch: AddDispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: StoreType) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ ניהול הטופס עם React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ פונקציה לטיפול בהתחברות
  const onSubmit = async (data: { email: string; password: string }) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      navigate("/"); // חזרה לעמוד הראשי לאחר התחברות מוצלחת
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign in to Warranty Keeper</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* שדה אימייל */}
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={errors.email ? "input-error" : ""}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          {/* שדה סיסמה עם כפתור עין */}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className={errors.password ? "input-error" : ""}
            />
            <button type="button" className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
          {errors.password && <p className="error">{errors.password.message}</p>}

          {/* הצגת הודעת שגיאה מהשרת */}
          {error && <p className="server-error">{error}</p>}

          {/* כפתורי פעולה */}
          <button className="primary-btn" type="submit" disabled={loading}>
            Sign In
          </button>
          <button className="google-btn">Sign in with Google</button>
          <button className="cancel-btn" onClick={() => navigate("/")}>
            Cancel
          </button>

          <p className="register-link">
            New here? <a href="/register">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
