import { Stack, Typography } from "@mui/material";

export function ProblemDescription() {
  return (
    <Stack
      padding={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Typography variant="body2">
        In this version of the knapsack problem, a Genetic Algorithm will
        attempt to find the best combination of items to put in a knapsack, in
        wich you need to specify the knapsack volume and the quantity of random
        items. For simplicity, assume both the knapsack and the items are cubes.
      </Typography>
    </Stack>
  );
}
