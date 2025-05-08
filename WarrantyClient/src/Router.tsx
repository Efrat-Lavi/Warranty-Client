
import { HashRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import ErrorPage from "./components/error";
import RecordPage from "./components/records/recordPage";
import AddWarranty from "./components/add-warranty";
import WarrantyDetails from "./components/records/WarrantyDetails";
import Dashboard from "./components/dashbord";
import UserProfile from "./components/userProfile";
import AppLayout from "./components/appLayout";
import SharedWithMe from "./components/sharedWithMe";
import ProtectedRoute from "./components/protectedRouter";
import LoginWrapper from "./components/loginWrapper";

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="login" element={<LoginPage />} /> */}
          <Route path="/login" element={<LoginWrapper />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<Dashboard />} />

          {/* ניתובים מוגנים */}
          <Route element={<ProtectedRoute />}>
            <Route path="record" element={<RecordPage />} />
            <Route path="record/:id" element={<WarrantyDetails />} />
            <Route path="add-warranty" element={<AddWarranty />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<UserProfile />} />
            <Route path="SharedWithMe" element={<SharedWithMe />} />
          </Route>
        </Route>

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </HashRouter>
  );
}
