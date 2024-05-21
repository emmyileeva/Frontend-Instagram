import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useSignInAccount } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/authcontext";
import { useState } from "react";

const SignIn = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signInAccount } = useSignInAccount();

  const handleSignIn = async (user) => {
    try {
      // Check if a session is already active
      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        toast({ title: "You're already logged in." });
        navigate("/");
        return;
      }

      const session = await signInAccount({
        email: user.email,
        password: user.password,
      });

      if (!session) {
        toast({ title: "Something went wrong. Please login your account" });
        navigate("/sign-in");
        return;
      }

      form.reset();
      navigate("/");
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Form {...form}>
      <div className="max-w-sm mx-auto">
        <img
          src="/images/logo.png"
          alt="logo"
          className="mx-auto w-48 h-auto"
        />
        <h2 className="text-center font-bold text-xl mt-5">
          Log in to your account
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Welcome back! Please sign in to your account.
        </p>
        <form onSubmit={form.handleSubmit(handleSignIn)} className="mt-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    id="email"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Password</FormLabel>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} {...field} />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <FormMessage error={form.formState.errors.password?.message} />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
          </Button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/sign-up" className="font-medium text-blue-600">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignIn;
