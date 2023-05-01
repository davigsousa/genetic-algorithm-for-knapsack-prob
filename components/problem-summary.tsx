import { useProblemParams } from "@/contexts/ProblemParams";
import { Solution } from "@/types/problem";
import {
  AttachMoney,
  Inventory,
  Lightbulb,
  LineWeight,
  Map,
  TipsAndUpdates,
} from "@mui/icons-material";
import { Stack, Typography, Box } from "@mui/material";

interface ProblemSummaryProps {
  bestSolution: Solution;
}

export function ProblemSummary({ bestSolution }: ProblemSummaryProps) {
  const { params } = useProblemParams();

  const warehouseArea = params
    ? params?.warehouse.height * params?.warehouse.width
    : 0;
  const solutionArea = bestSolution.boxes.reduce(
    (acc, box) => acc + box.width * box.height,
    0
  );
  const solutionWeight = bestSolution.boxes.reduce(
    (acc, box) => acc + box.weight,
    0
  );

  const summaryItems = [
    {
      Icon: Inventory,
      title: "Boxes",
      value: `${bestSolution.boxes.length} / ${params?.boxes.length}`,
    },
    {
      Icon: Map,
      title: "Area",
      value: `${solutionArea} / ${warehouseArea}`,
    },
    {
      Icon: LineWeight,
      title: "Weight",
      value: `${solutionWeight} / ${params?.warehouse.weightLimit}`,
    },
    {
      Icon: AttachMoney,
      title: "Total price",
      value: `${bestSolution.fitness}`,
      isValue: true,
    },
  ];

  return (
    <Stack mt={3} width="100%">
      <Typography variant="h4" gutterBottom>
        <TipsAndUpdates style={{ marginRight: 5 }} />
        Best Solution
      </Typography>

      <Stack
        direction="column"
        flexWrap="wrap"
        spacing={1}
        justifyContent="center"
      >
        {summaryItems.map((item) => (
          <Box key={item.title} display="flex" flexDirection="column">
            <Typography variant="body1" display="flex" alignItems="center">
              {item.title}
            </Typography>

            <Typography
              color={item.isValue ? "green" : "black"}
              variant={"h6"}
              gutterBottom
              display="flex"
              alignItems="center"
            >
              {<item.Icon style={{ marginRight: item.isValue ? 0 : 1 }} />}
              {item.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
