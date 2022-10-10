import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import router from "next/router";
import { useEffect } from "react";
import AuthError from "../../components/AuthError";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import EmailIcon from "../../icons/Email";
import GenderIcon from "../../icons/Gender";
import LockIcon from "../../icons/Lock";
import PhoneIcon from "../../icons/Phone";
import ProfileIcon from "../../icons/Profile";
import { trpc } from "../../utils/trpc";

const Register: NextPage = () => {
  const registerMutation = trpc.user.register.useMutation();

  useEffect(() => {
    if (window !== undefined && localStorage.getItem("authToken")) {
      router.push("/");
    }
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    registerMutation.mutate({
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      password: e.target.password.value,
      gender: e.target.gender.value,
    });
  };

  if (registerMutation.isSuccess) {
    if (window !== undefined) {
      localStorage.setItem("authToken", registerMutation.data.token);
      router.push("/");
    }
  }

  const { status } = useSession();

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="h-screen flex items-center p-8 max-w-screen-xl mx-auto">
      <div className="">
        <h1 className="text-4xl font-bold mb-2">Hey There</h1>
        <p>Welcome, it's great to have you here, Please sign up</p>
        <form className="mt-8 sm:w-96" onSubmit={handleSubmit}>
          {registerMutation.isError && (
            <AuthError message={registerMutation.error.message} />
          )}

          <InputField
            placeholder="Name"
            type="text"
            leftIcon={<ProfileIcon />}
            id="name"
            invalid={true}
          />
          <InputField
            placeholder="Email"
            type="email"
            leftIcon={<EmailIcon />}
            id="email"
          />
          <InputField
            placeholder="Phone"
            type="tel"
            leftIcon={<PhoneIcon />}
            id="phone"
          />
          <InputField
            placeholder="Password"
            type="password"
            leftIcon={<LockIcon />}
            id="password"
          />
          <InputField
            placeholder="Gender"
            type="select"
            options={["Male", "Female", "Prefer not to say"]}
            leftIcon={<GenderIcon />}
            id="gender"
          />
          <Button
            className="my-5"
            label="Submit"
            type="submit"
            disabled={registerMutation.isLoading || registerMutation.isSuccess}
          />
        </form>

        <div className="divider flex items-center gap-2 mb-3">
          <div className="h-px bg-gray-300 w-full rounded"></div>
          <div className="text-sm">or</div>
          <div className="h-px bg-gray-300 w-full rounded"></div>
        </div>

        <div className="third-party flex items-center gap-4">
          <button
            className="border rounded-full p-2 flex items-center justify-center"
            onClick={() => signIn("google")}
          >
            <Image src="/images/googlelogo.png" width={30} height={30} />
          </button>

          <button className="border rounded-full p-2 flex items-center justify-center">
            <Image src="/images/facebooklogo.png" width={30} height={30} />
          </button>
        </div>

        <div className="my-6">
          <p className="flex gap-2">
            Already a member?{" "}
            <Link href="/auth/login">
              <small className="underline text-blue-700 font-semibold cursor-pointer">
                Log In
              </small>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
