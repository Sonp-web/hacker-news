import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";
import "./MainLayout.css";

export const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  );
};
