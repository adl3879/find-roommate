import type { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
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

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Home;
