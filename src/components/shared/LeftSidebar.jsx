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
    <nav className="flex flex-col h-screen justify-between bg-white border-r border-gray-200 p-4 fixed w-64">
      <div className="flex flex-col gap-8">
        {user.email && (
          <Link
            to={`/profile/${user.id}`}
            className="flex items-center gap-4 mb-8"
          >
            <img
              src={user.imageUrl || "/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-12 w-12 rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-500">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-6">
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
      </div>

      <Button
        variant="ghost"
        className="flex items-center gap-2 mt-auto py-2 px-4 hover:bg-gray-100 rounded-lg"
        onClick={handleSignOut}
      >
        <img src="/icons/logout.svg" alt="logout" className="h-6 w-6" />
        <span className="font-medium">Logout</span>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
