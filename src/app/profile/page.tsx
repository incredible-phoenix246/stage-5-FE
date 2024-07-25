import React from "react";
import { Suspense } from "react";
import { PhoneScreen, ProfileHeader } from ".";

const page = () => {
  return (
    <>
      <Suspense>
        <ProfileHeader />
      </Suspense>
      <PhoneScreen />
    </>
  );
};

export default page;
