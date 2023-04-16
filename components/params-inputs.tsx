import { useProblemParams } from "@/contexts/ProblemParams";
import { Check, Inventory, Warehouse, Info } from "@mui/icons-material";
import { Stack, Typography, TextField, Box, Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

export default function ParamsInputs() {
  const { updateParamsFromInputs, generatingParams } = useProblemParams();
  const [warehouseWidth, setWarehouseWidth] = useState<string>("");
  const [warehouseHeight, setWarehouseHeight] = useState<string>("");
  const [warehouseWeight, setWarehouseWeight] = useState<string>("");
  const [boxesQuantity, setBoxesQuantity] = useState<string>("");

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !warehouseWidth ||
      !warehouseHeight ||
      !warehouseWeight ||
      !boxesQuantity
    ) {
      toast.error("Please, fill all the fields");
      return;
    }

    updateParamsFromInputs({
      warehouse: {
        width: Number(warehouseWidth),
        height: Number(warehouseHeight),
        weightLimit: Number(warehouseWeight),
      },
      numberOfBoxes: Number(boxesQuantity),
    });
  };

  const fillWithRecommendedParams = () => {
    setWarehouseWidth("100");
    setWarehouseHeight("100");
    setWarehouseWeight("50");
    setBoxesQuantity("20");
  };

  return (
    <Box width="100%" maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Stack direction="column" padding={3}>
          <Stack direction="column">
            <Typography
              display="flex"
              alignItems="center"
              variant="h6"
              gutterBottom
            >
              <Box
                marginRight={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Warehouse />
              </Box>
              Warehouse
            </Typography>

            <TextField
              fullWidth
              placeholder="only numbers"
              variant="standard"
              label="Width"
              type="number"
              value={warehouseWidth}
              onChange={(e) => setWarehouseWidth(e.target.value)}
            />

            <Box marginTop={2} width="100%">
              <TextField
                fullWidth
                placeholder="only numbers"
                variant="standard"
                label="Height"
                type="number"
                value={warehouseHeight}
                onChange={(e) => setWarehouseHeight(e.target.value)}
              />
            </Box>

            <Box marginTop={2} width="100%">
              <TextField
                fullWidth
                placeholder="only numbers"
                variant="standard"
                label="Weight limit"
                type="number"
                value={warehouseWeight}
                onChange={(e) => setWarehouseWeight(e.target.value)}
              />
            </Box>
          </Stack>

          <Stack marginTop={3} direction="column">
            <Typography
              display="flex"
              alignItems="center"
              variant="h6"
              gutterBottom
            >
              <Box
                marginRight={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Inventory />
              </Box>
              Boxes
            </Typography>

            <TextField
              placeholder="only numbers"
              variant="standard"
              label="Quantity of random boxes"
              type="number"
              value={boxesQuantity}
              onChange={(e) => setBoxesQuantity(e.target.value)}
            />
          </Stack>

          <Box
            marginTop={5}
            width="100%"
            display="flex"
            flexWrap="wrap"
            alignItems="center"
          >
            <Box marginTop={1} marginRight={2}>
              <Button
                disabled={generatingParams}
                endIcon={<Check />}
                type="submit"
                variant="contained"
              >
                Confirm params
              </Button>
            </Box>

            <Box marginTop={1}>
              <Button
                onClick={fillWithRecommendedParams}
                endIcon={<Info />}
                type="button"
                variant="outlined"
              >
                recommended params
              </Button>
            </Box>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
