import { useEffect } from "react";
import NProgress from "nprogress";

const useProgressBar = (isLoading: boolean) => {
  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);
};

export default useProgressBar;
