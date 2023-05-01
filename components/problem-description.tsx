import { Stack, Typography } from "@mui/material";

export default function ProblemDescription() {
  return (
    <Stack
      padding={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <Typography variant="body2">
        A Genetic Algorithm will attempt to find the best combination (which
        produces the higher price amount) of boxes to put in a warehouse, in
        which you need to specify the warehouse area, weight limit and the
        quantity of random boxes. For simplicity, assume all boxes fit in the
        specified warehouse area.
      </Typography>
    </Stack>
  );
}
