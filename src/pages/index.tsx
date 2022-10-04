import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.user.hello.useQuery();
  if (hello.isLoading) {
    return <div>loading.....</div>;
  }

  return (
    <div className="text-3xl font-bold underline">
      Find A Roommate [ {hello.data?.msg} ]
    </div>
  );
};

export default Home;
