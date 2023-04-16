import { Box, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import backpack from "@/public/backpack.png";

export default function Header() {
  return (
    <Paper>
      <Stack
        padding={3}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Box marginRight={2}>
          <Image src={backpack} alt="Backpack" width={100} height={100} />
        </Box>

        <Stack direction="column" alignItems="flex-start">
          <Typography variant="body1">A little bit</Typography>
          <Typography variant="h6">more complex</Typography>
          <Typography variant="h5">Knapsack Problem</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
