import { ProblemParamsProvider } from "@/contexts/ProblemParams";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProblemParamsProvider>
      <Component {...pageProps} />
      <ToastContainer />
    </ProblemParamsProvider>
  );
}
