import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { StoreType } from "../redux/store";
import { useEffect } from "react";

const Header = () => {
  const dispatch = useDispatch();
//   const { user, token } = useSelector((state: StoreType) => state.auth);
const { user, token } = useSelector((state: StoreType) => {
    console.log(state.auth); // בדיקת מצב הסטייט ב-Redux
    return state.auth;
  },shallowEqual);
  console.log(user); // בדיקת מצב הסטייט ב-Redux
  console.log(token); // בדיקת מצב הסטייט ב-Redux

  return (
    <header>
      <h1>Warranty Keeper</h1>
      {token ? (
        <>
          <span>Welcome, {user?.nameUser || "User"}</span>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <a href="/login">Login</a>
      )}
    </header>
  );
};

export default Header;
