import { Link, useLocation } from "react-router-dom";
import { bottomLinks } from "@/constants";

const Bottom = () => {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar fixed bottom-0 left-0 right-0 z-50 bg-white shadow-md md:hidden w-full">
      <div className="flex justify-around py-3">
        {bottomLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <Link
              key={`bottom-${link.label}`}
              to={link.route}
              className={`${
                isActive && "text-blue-600"
              } flex-center flex-col gap-1 p-2 transition`}
            >
              <div className="flex items-center">
                <img
                  src={link.imgURL}
                  alt={link.label}
                  width={24}
                  height={24}
                  className={`${isActive && "invert-blue"}`}
                />
                {isActive && <p className="text-xs ml-1">{link.label}</p>}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Bottom;
