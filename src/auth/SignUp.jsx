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
import { SignUpValidation } from "@/lib/validation";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  useCreateUserAccount,
  useSignInAccount,
} from "@/lib/react-query/queries";
import { useUserContext } from "@/context/authcontext";

const SignUp = () => {
  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: createUserAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount } = useSignInAccount();

  const handleSignup = async (user) => {
    try {
      const newUser = await createUserAccount(user);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again." });
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
      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        navigate("/");
      } else {
        toast({
          title: "Success",
          message: "User account created successfully",
          status: "success",
        });
      }
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
          Create A New Account
        </h2>
        <p className="text-center text-gray-600 mt-2">
          To use Instagram, please enter your details
        </p>
        <form onSubmit={form.handleSubmit(handleSignup)} className="mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="name"
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    id="username"
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
                <FormLabel
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    id="password"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full mt-6 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign up
          </Button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/sign-in" className="font-medium text-blue-600">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUp;
