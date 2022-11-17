import { NextPage } from "next";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { useEffect } from "react";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import EmailIcon from "../../icons/Email";
import LockIcon from "../../icons/Lock";
import { trpc } from "../../utils/trpc";

const Login: NextPage = () => {
  const loginMutation = trpc.user.login.useMutation();

  useEffect(() => {
    if (window !== undefined && localStorage.getItem("authToken")) {
      router.push("/");
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginMutation.mutate({
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };

  if (loginMutation.isSuccess) {
    localStorage.setItem("authToken", loginMutation.data.token);
    router.push("/");
  }

  return (
    <div className="h-screen flex items-center justify-end p-8 max-w-screen-xl mx-auto">
      <div className="">
        <h1 className="text-4xl font-bold mb-2 text-right">Welcome Back</h1>
        <p className="text-right">Please log in to continue</p>
        <form className="mt-8 sm:w-96" onSubmit={handleSubmit}>
          <InputField
            placeholder="Email"
            type="email"
            leftIcon={<EmailIcon />}
            id="email"
            flip={true}
          />
          <InputField
            placeholder="Password"
            type="password"
            leftIcon={<LockIcon />}
            id="password"
            flip={true}
          />
          <Button
            className="my-5"
            label="Submit"
            type="submit"
            disabled={loginMutation.isLoading || loginMutation.isSuccess}
          />
        </form>

        <div className="divider flex items-center gap-2 mb-3">
          <div className="h-px bg-gray-300 w-full rounded"></div>
          <div className="text-sm">or</div>
          <div className="h-px bg-gray-300 w-full rounded"></div>
        </div>

        <div className="third-party flex items-center justify-end gap-4">
          <button
            className="border rounded-full p-2 flex items-center justify-center"
            onClick={() => signIn("google")}
          >
            <Image
              src="/images/googlelogo.png"
              width={30}
              height={30}
              alt="google logo"
            />
          </button>

          <button className="border rounded-full p-2 flex items-center justify-center">
            <Image
              src="/images/facebooklogo.png"
              width={30}
              height={30}
              alt="facebook logo"
            />
          </button>
        </div>

        <div className="my-6">
          <p className="flex gap-2 justify-end">
            A new member?{" "}
            <Link href="/auth/register">
              <small className="underline text-blue-700 font-semibold cursor-pointer">
                Sign Up
              </small>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
