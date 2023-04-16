import { useProblemParams } from "@/contexts/ProblemParams";
import { Check, Inventory, Warehouse } from "@mui/icons-material";
import { Stack, Typography, TextField, Box, Button } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

export default function ParamsInputs() {
  const { updateParamsFromInputs, generatingParams } = useProblemParams();
  const [warehouseWidth, setWarehouseWidth] = useState<number>();
  const [warehouseHeight, setWarehouseHeight] = useState<number>();
  const [warehouseWeight, setWarehouseWeight] = useState<number>();
  const [boxesQuantity, setBoxesQuantity] = useState<number>();

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
        width: warehouseWidth,
        height: warehouseHeight,
        weightLimit: warehouseWeight,
      },
      numberOfBoxes: boxesQuantity,
    });
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
              onChange={(e) => setWarehouseWidth(Number(e.target.value))}
            />

            <Box marginTop={2} width="100%">
              <TextField
                fullWidth
                placeholder="only numbers"
                variant="standard"
                label="Height"
                type="number"
                onChange={(e) => setWarehouseHeight(Number(e.target.value))}
              />
            </Box>

            <Box marginTop={2} width="100%">
              <TextField
                fullWidth
                placeholder="only numbers"
                variant="standard"
                label="Weight limit"
                type="number"
                onChange={(e) => setWarehouseWeight(Number(e.target.value))}
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
              onChange={(e) => setBoxesQuantity(Number(e.target.value))}
            />
          </Stack>

          <Box marginTop={5}>
            <Button
              disabled={generatingParams}
              endIcon={<Check />}
              type="submit"
              variant="contained"
            >
              Confirm params
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
