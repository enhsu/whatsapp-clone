import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "~/components/Sidebar";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Whatsapp clone</title>
      </Head>
      <Sidebar />
    </div>
  );
};

export default Home;
