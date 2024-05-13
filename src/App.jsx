import { Routes, Route } from "react-router-dom";
import "./tailwind.css";
import "../ src/globals.css";
import Home from "./pages/Home";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import AuthLayout from "./auth/AuthLayout";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route index element={<Home />} />
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
