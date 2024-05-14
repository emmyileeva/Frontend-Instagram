import Bottom from "@/shared/Bottom";
import LeftSidebar from "@/shared/LeftSidebar";
import Top from "@/shared/Top";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full md:flex">
      <Top />
      <LeftSidebar />
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottom />
    </div>
  );
};

export default Layout;
