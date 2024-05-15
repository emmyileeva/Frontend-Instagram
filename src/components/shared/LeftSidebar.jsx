import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { sidebarLinks } from "@/constants/index";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { INITIAL_USER, useUserContext } from "@/context/authcontext";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated } = useUserContext();
  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (e) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };

  return (
    <nav className="hidden md:flex flex-col bg-white border-r border-gray-200 fixed top-0 left-0 h-full w-64 shadow-md">
      <div className="pt-4 px-8">
        <Link to="/" className="flex items-center mb-4 px-6">
          <img src="/images/logo.png" alt="logo" className="w-32 h-auto" />
        </Link>
        {user.email && (
          <Link
            to={`/profile/${user.id}`}
            className="flex items-center gap-4 px-6 py-2 rounded-lg hover:bg-gray-100"
          >
            <img
              src={user.imageUrl || "/icons/profile.png"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-500">@{user.username}</p>
            </div>
          </Link>
        )}
      </div>

      <ul className="flex flex-col gap-2">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <li key={link.label} className={`${isActive ? "bg-gray-100" : ""}`}>
              <NavLink
                to={link.route}
                className="flex items-center px-6 py-2 rounded-lg hover:bg-gray-100"
              >
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className="w-6 h-auto"
                />
                <span className="ml-4">{link.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto">
        <Button
          variant="ghost"
          className="flex items-center justify-center w-full py-2 px-6 hover:bg-gray-100 rounded-lg"
          onClick={handleSignOut}
        >
          <img src="/icons/logout.png" alt="logout" className="w-6 h-auto" />
          <span className="ml-4">Logout</span>
        </Button>
      </div>
    </nav>
  );
};

export default LeftSidebar;
