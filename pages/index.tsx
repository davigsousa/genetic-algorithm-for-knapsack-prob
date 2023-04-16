import { Stack } from "@mui/material";
import Head from "next/head";
import Header from "@/components/header";
import ProblemDescription from "@/components/problem-description";
import ParamsInputs from "@/components/params-inputs";

export default function Home() {
  return (
    <Stack direction="column" alignItems="center" justifyContent="center">
      <Head>
        <title>Knapsack Problem</title>
        <meta
          name="description"
          content="Genetic Algorithm solving a little bit more complex knapsack problem"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack
        direction="column"
        maxWidth="sm"
        alignItems="center"
        justifyContent="center"
      >
        <Header />
        <ProblemDescription />
        <ParamsInputs />
      </Stack>
    </Stack>
  );
}
