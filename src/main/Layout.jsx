import { Outlet } from "react-router-dom";
import Bottom from "@/components/shared/Bottom";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Top from "@/components/shared/Top";

const Layout = () => {
  return (
    <div className="w-full md:flex pt-14">
      {" "}
      <Top />
      <div className="md:flex">
        <LeftSidebar />
        <section className="flex flex-1 h-full">
          <Outlet />
        </section>
      </div>
      <Bottom />
    </div>
  );
};

export default Layout;
