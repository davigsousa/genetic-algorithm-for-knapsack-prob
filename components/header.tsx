import { Box, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import backpack from "@/public/backpack.png";
import Link from "next/link";

export default function Header() {
  return (
    <Paper>
      <Stack
        padding={3}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Link href="/">
          <Box marginRight={2}>
            <Image src={backpack} alt="Backpack" width={100} height={100} />
          </Box>
        </Link>

        <Stack direction="column" alignItems="flex-start">
          <Typography variant="body1">A little bit</Typography>
          <Typography variant="h6">more complex</Typography>
          <Typography variant="h5">Knapsack Problem</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
