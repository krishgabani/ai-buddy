"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="4px"
        color="#3498db"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  );
};

export default LoadingProvider;
