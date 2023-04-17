import { Stack } from "@mui/material";
import Head from "next/head";
import Header from "@/components/header";
import { useGeneticAlgorithm } from "@/contexts/GeneticAlgorithm";
import { useEffect } from "react";

export default function Solving() {
  const { bestSolution, startAlgorithm } = useGeneticAlgorithm();

  useEffect(() => {
    startAlgorithm();
  }, [startAlgorithm]);

  return (
    <Stack direction="column" alignItems="center" justifyContent="center">
      <Head>
        <title>Knapsack Problem | Solving</title>
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
        <h1>{bestSolution?.fitness}</h1>
      </Stack>
    </Stack>
  );
}
