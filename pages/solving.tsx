import { Stack, Typography } from "@mui/material";
import Head from "next/head";
import Header from "@/components/header";
import { useGeneticAlgorithm } from "@/hooks/genetic-algorithm";
import BoxesList from "@/components/boxes-list";
import { ProblemSummary } from "@/components/problem-summary";
import React from "react";

export default function Solving() {
  const { generation, bestSolution } = useGeneticAlgorithm();

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

        <Typography mt={3} variant="h4" component="h1" gutterBottom>
          Generation: {generation}K
        </Typography>

        {bestSolution && <ProblemSummary bestSolution={bestSolution} />}

        {bestSolution?.boxes && <BoxesList boxes={bestSolution?.boxes} />}
      </Stack>
    </Stack>
  );
}
