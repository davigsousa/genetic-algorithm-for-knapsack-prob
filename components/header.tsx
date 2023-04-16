import { Stack, Typography } from "@mui/material";

export default function Header() {
  return (
    <Stack direction="column" alignItems="flex-start">
      <Typography variant="h6">A little bit</Typography>
      <Typography variant="h5">more complex</Typography>
      <Typography variant="h3">Knapsack Problem</Typography>
    </Stack>
  );
}
