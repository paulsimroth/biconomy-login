'use client'

import dynamic from "next/dynamic";
import { Suspense } from "react";

const Home = () => {

  const SocialLoginDynamic = dynamic(
    () => import("../components/Auth").then((res) => res.default),
    {
      ssr: false,
    }
  )

  return (
    <main className="">
      <Suspense fallback={<div>LOADING...</div>}>
        <SocialLoginDynamic />
      </Suspense>
    </main>
  )
}

export default Home;