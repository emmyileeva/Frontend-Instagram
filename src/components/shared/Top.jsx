import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/authcontext";

const Top = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) {
      console.log("Navigating to /sign-in");
      navigate("/sign-in");
    }
  }, [isSuccess, navigate]);

  const handleSignOut = () => {
    console.log("signOut called");
    console.log("Current user:", user);
    if (user) {
      signOut();
    } else {
      console.log("User is already signed out");
    }
  };

  return (
    <section className="bg-white shadow-sm relative top-0 w-full z-10 md:hidden">
      <div className="mx-auto flex justify-center items-center px-10 py-2">
        <Link to="/" className="flex items-center">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-20 h-auto md:w-28"
          />
        </Link>
        <div className="ml-auto">
          <div className="flex items-center space-x-2">
            <Link to={`/profile/${user.id}`} className="md:block">
              <img
                src={user.imageUrl || "/icons/profile.png"}
                alt="profile"
                className="h-8 w-8 rounded-full md:h-10 md:w-10"
              />
            </Link>
            <Button variant="ghost" onClick={handleSignOut}>
              <img
                src="/icons/logout.png"
                alt="logout"
                className="w-6 h-6 md:w-8 md:h-8"
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Top;
