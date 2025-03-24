
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../redux/authSlice";
import { AddDispatch, StoreType } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../style/auth.css";

// ✅ סכמת אימות עם Yup
const schema = yup.object().shape({
  NameUser: yup.string().required("Full name is required"),
  Email: yup.string().email("Invalid email").required("Email is required"),
  Password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const RegisterPage = () => {
  const dispatch: AddDispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state: StoreType) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ ניהול הטופס עם React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ פונקציה לטיפול בהרשמה
  const onSubmit = async (data: { NameUser: string; Email: string; Password: string }) => {
    const result = await dispatch(registerUser({ ...data, Role: "User" }));
    if (registerUser.fulfilled.match(result)) {
      // התחברות אוטומטית לאחר הרשמה
      const loginResult = await dispatch(loginUser({ email: data.Email, password: data.Password }));
      if (loginUser.fulfilled.match(loginResult)) {
        navigate("/"); // ניווט לעמוד הראשי
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* שם מלא */}
          <input
            type="text"
            placeholder="Full Name"
            {...register("NameUser")}
            className={errors.NameUser ? "input-error" : ""}
          />
          {errors.NameUser && <p className="error">{errors.NameUser.message}</p>}

          {/* אימייל */}
          <input
            type="email"
            placeholder="Email"
            {...register("Email")}
            className={errors.Email ? "input-error" : ""}
          />
          {errors.Email && <p className="error">{errors.Email.message}</p>}

          {/* סיסמה עם אייקון עין */}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("Password")}
              className={errors.Password ? "input-error" : ""}
            />
            <button type="button" className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
          {errors.Password && <p className="error">{errors.Password.message}</p>}

          {/* כפתורים */}
          <button className="primary-btn" type="submit" disabled={loading}>
            Register
          </button>
          <button className="google-btn">Sign up with Google</button>
          <button className="cancel-btn" onClick={() => navigate("/")}>
            Cancel
          </button>

          <p className="register-link">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
