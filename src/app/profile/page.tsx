import React from "react";
import { Suspense } from "react";
import { ProfileHeader } from ".";

const page = () => {
  return (
    <>
      <Suspense>
        <ProfileHeader />
      </Suspense>
    </>
  );
};

export default page;
