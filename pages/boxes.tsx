import { Stack } from "@mui/material";
import Head from "next/head";
import Header from "@/components/header";
import { useEffect } from "react";
import { useProblemParams } from "@/contexts/ProblemParams";
import { useRouter } from "next/router";
import BoxesList from "@/components/boxes-list";

export default function Home() {
  const router = useRouter();
  const { params } = useProblemParams();

  useEffect(() => {
    if (!params) {
      router.replace("/");
    }
  }, [params, router]);

  return (
    <Stack direction="column" alignItems="center" justifyContent="center">
      <Head>
        <title>Knapsack Problem | Boxes</title>
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
        <BoxesList />
      </Stack>
    </Stack>
  );
}
