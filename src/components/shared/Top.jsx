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
      navigate(0);
    }
  }, [isSuccess, navigate]);

  return (
    <section className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <Link to="/" className="flex items-center">
          <img src="/images/logo.jpg" alt="logo" className="w-20 h-auto" />
        </Link>
        <div className="flex items-center">
          <Button variant="ghost" className="ml-4" onClick={() => signOut()}>
            <img src="/icons/logout.png" alt="logout" className="w-8 h-auto" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Top;
