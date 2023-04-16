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
        attempt to find the best combination of boxes to put in a warehouse, in
        wich you need to specify the warehouse area and the quantity of random
        boxes. For simplicity, assume both the warehouse and the boxes are
        squares.
      </Typography>
    </Stack>
  );
}
