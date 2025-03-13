import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../redux/authSlice";
import { AppDispatch, StoreType } from "../redux/store";

const RegisterPage = () => {
  const [userData, setUserData] = useState({ email: "", password: "", fullName: "" });
  const dispatch :AppDispatch= useDispatch();
  const { loading, error } = useSelector((state: StoreType) => state.auth);

  const handleRegister = async () => {
    await dispatch(registerUser(userData));
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Full Name" onChange={(e) => setUserData({ ...userData, fullName: e.target.value })} />
      <input type="email" placeholder="Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
      <button onClick={handleRegister} disabled={loading}>Register</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default RegisterPage;
