import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { AppDispatch, StoreType } from "../redux/store";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch:AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: StoreType) => state.auth);

  const handleLogin = async () => {
    await dispatch(loginUser({ email, password }));
    
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} disabled={loading}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
