import { Route, Routes } from "react-router-dom";
import HomeComponent from "./HomeComponent";
import HomeIndex from "./pages/HomeIndex";

const HomeRouting = () => {
  return (
    <Routes>
      <Route element={<HomeComponent />}>
        <Route path="/" element={<HomeIndex />} />
      </Route>

      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default HomeRouting;
