import Navbar from "@/components/navbar/ver1";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";

const MainLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/") {
      navigate("/version1", { replace: true });
    }
  }, [pathname]);

  return (
    <main className="w-full">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default MainLayout;
