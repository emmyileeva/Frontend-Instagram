import Bottom from "@/components/shared/Bottom";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Top from "@/components/shared/Top";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Top />

      <div className="flex flex-1">
        <LeftSidebar />

        <section className="flex-1">
          <Outlet />
        </section>

        <Bottom />
      </div>
    </div>
  );
};

export default Layout;
