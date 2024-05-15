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
    <nav className="hidden md:flex flex-col h-screen justify-between bg-white border-r border-gray-200 p-4 fixed w-64">
      <div>
        <Link to="/" className="flex items-center mb-8 px-10">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-20 h-auto md:w-28"
          />
        </Link>
        {user.email && (
          <Link
            to={`/profile/${user.id}`}
            className="flex items-center gap-4 mb-8"
          >
            <img
              src={user.imageUrl || "/icons/profile.png"}
              alt="profile"
              className="h-12 w-12 rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-500">@{user.username}</p>
            </div>
          </Link>
        )}
      </div>

      <ul className="flex flex-col gap-6 flex-grow">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route;
          return (
            <li
              key={link.label}
              className={`${isActive ? "bg-gray-100" : ""} rounded-lg`}
            >
              <NavLink
                to={link.route}
                className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100"
              >
                <img src={link.imgURL} alt={link.label} className="h-6 w-6" />
                <span className="font-medium">{link.label}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className="mb-16">
        <Button
          variant="ghost"
          className="flex items-center gap-2 py-2 px-4 hover:bg-gray-100 rounded-lg"
          onClick={handleSignOut}
        >
          <img src="/icons/logout.png" alt="logout" className="h-6 w-6" />
          <span className="font-medium">Logout</span>
        </Button>
      </div>
    </nav>
  );
};

export default LeftSidebar;
