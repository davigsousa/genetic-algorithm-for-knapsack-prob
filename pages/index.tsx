import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Head from "next/head";

export default function Home() {
  return (
    <Stack direction="row" alignContent="center">
      <Head>
        <title>More complex Knapsack Problem</title>
        <meta
          name="description"
          content="Genetic Algorithm solving a more complex knapsack problem"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="sm">
        <Typography variant="h1" gutterBottom>
          Home
        </Typography>
      </Container>
    </Stack>
  );
}
