import type { NextPage } from "next";
import InputField from "../../components/InputField";
import EmailIcon from "../../icons/Email";
import GenderIcon from "../../icons/Gender";
import LockIcon from "../../icons/Lock";
import PhoneIcon from "../../icons/Phone";
import ProfileIcon from "../../icons/Profile";

const Register: NextPage = () => {
  return (
    <div className="h-screen flex items-center p-8 max-w-screen-2xl ml-auto">
      <div className="">
        <h1 className="text-4xl font-bold mb-2">Hey There</h1>
        <p>Welcome, it's great to have you here, Please signup</p>
        <form className="mt-4">
          <InputField
            placeholder="Name"
            type="text"
            leftIcon={<ProfileIcon />}
            onChange={(value) => console.log(value)}
          />
          {/* <InputField
            placeholder="Email"
            type="email"
            leftIcon={<EmailIcon />}
          />
          <InputField placeholder="Phone" type="tel" leftIcon={<PhoneIcon />} />
          <InputField
            placeholder="Password"
            type="password"
            leftIcon={<LockIcon />}
          />
          <InputField
            placeholder="Gender"
            type="select"
            options={["Male", "Female", "Prefer not to say"]}
            leftIcon={<GenderIcon />}
          /> */}
        </form>
      </div>
    </div>
  );
};

export default Register;
