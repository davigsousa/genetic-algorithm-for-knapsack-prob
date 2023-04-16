import { Box, Button, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";
import { useProblemParams } from "@/contexts/ProblemParams";
import { useRouter } from "next/router";
import BoxesList from "@/components/boxes-list";
import { Check, Info, ArrowBack } from "@mui/icons-material";

export default function Boxes() {
  const router = useRouter();
  const { params } = useProblemParams();

  useEffect(() => {
    if (!params) {
      router.push("/");
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
        <Typography
          gutterBottom
          display="flex"
          alignItems="center"
          variant="h5"
          width="100%"
          marginTop={3}
        >
          <Box
            marginRight={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Info />
          </Box>
          Can we procced?
        </Typography>

        <Box width="100%" display="flex" flexWrap="wrap" alignItems="center">
          <Box marginTop={1} marginRight={2}>
            <Button
              onClick={() => router.push("/")}
              startIcon={<ArrowBack />}
              type="button"
              variant="outlined"
            >
              Try again
            </Button>
          </Box>

          <Box marginTop={1}>
            <Button
              onClick={() => router.push("/solving")}
              endIcon={<Check />}
              type="button"
              variant="contained"
            >
              Yes, let&apos;s go!
            </Button>
          </Box>
        </Box>

        <BoxesList />
      </Stack>
    </Stack>
  );
}
