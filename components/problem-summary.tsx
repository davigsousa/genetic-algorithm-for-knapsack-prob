import { useProblemParams } from "@/contexts/ProblemParams";
import { Solution } from "@/types/problem";
import { AttachMoney, Inventory, Map } from "@mui/icons-material";
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

  const summaryItems = [
    {
      Icon: AttachMoney,
      title: "Value",
      value: `${bestSolution.fitness}`,
      isValue: true,
    },
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
  ];

  return (
    <Stack mt={3} width="100%">
      <Typography variant="h4" gutterBottom>
        Problem summary
      </Typography>

      <Stack direction="row" spacing={2}>
        {summaryItems.map((item) => (
          <Box key={item.title} display="flex" flexDirection="column">
            <Typography variant="h6">{item.title}</Typography>

            <Typography
              color={item.isValue ? "green" : "black"}
              variant={item.isValue ? "h6" : "body1"}
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
