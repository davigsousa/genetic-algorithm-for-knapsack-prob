import { useProblemParams } from "@/contexts/ProblemParams";
import { Solution } from "@/types/problem";
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
      title: "Boxes",
      value: `${bestSolution.boxes.length} / ${params?.boxes.length}`,
    },
    {
      title: "Area",
      value: `${solutionArea} / ${warehouseArea}`,
    },
    {
      title: "Value",
      value: `$${bestSolution.fitness}`,
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
            <Typography variant="h6" gutterBottom>
              {item.title}
            </Typography>

            <Typography variant="body1" gutterBottom>
              {item.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
