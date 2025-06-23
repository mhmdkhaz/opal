import { Route, Routes } from "react-router-dom";
import UserRouting from "./modules/user/UserRouting";
import AdminRouting from "./modules/admin/AdminRouting";

const AppRouting = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserRouting />} />
      <Route path="/admin/*" element={<AdminRouting />} />
    </Routes>
  );
};

export default AppRouting;
