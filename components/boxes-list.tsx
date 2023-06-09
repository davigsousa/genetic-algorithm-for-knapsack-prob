import { Box, Paper, Stack, Typography } from "@mui/material";
import { Inventory } from "@mui/icons-material";
import { Box as BoxType } from "@/types/problem";

interface BoxesListProps {
  boxes: BoxType[];
}

export default function BoxesList({ boxes }: BoxesListProps) {
  const sortedBoxes = boxes.sort((a, b) => b.priceValue - a.priceValue) || [];

  return (
    <Stack width="100%" direction="column" marginTop={3}>
      <Typography display="flex" alignItems="center" variant="h6" gutterBottom>
        <Box
          marginRight={1}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Inventory />
        </Box>
        Generated boxes
      </Typography>

      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        {sortedBoxes.map((box, index) => (
          <Box key={index} margin={1}>
            <Paper>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                justifyContent="center"
                padding={1}
              >
                <Typography color="green" variant="h6" component="span">
                  ${box.priceValue}
                </Typography>
                <Typography variant="body2" component="span">
                  Weight: {box.weight} kg
                </Typography>
                <Typography color="gray" variant="body2" component="span">
                  Area: {box.width} x {box.height}
                </Typography>
              </Box>
            </Paper>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
