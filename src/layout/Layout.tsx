import { Outlet } from "react-router-dom";
import Header from "@/layout/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="mt-(--header-height) px-4 py-10 md:mt-0 md:px-25">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
