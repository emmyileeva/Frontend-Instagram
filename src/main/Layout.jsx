import { Outlet } from "react-router-dom";
import Bottom from "@/components/shared/Bottom";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Top from "@/components/shared/Top";

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      <Top />
      <div className="flex flex-col md:flex-row flex-1 overflow-auto">
        <LeftSidebar />
        <section className="flex-1">
          <Outlet />
        </section>
      </div>
      <Bottom />
    </div>
  );
};

export default Layout;
