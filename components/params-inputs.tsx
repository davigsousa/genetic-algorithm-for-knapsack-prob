import { Stack, Typography, TextField, Box, Button } from "@mui/material";
import { ChangeEvent, useState } from "react";

export default function ParamsInputs() {
  const [bagWidth, setBagWidth] = useState<number>();
  const [bagHeight, setBagHeight] = useState<number>();
  const [boxesQuantity, setBoxesQuantity] = useState<number>();

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(bagWidth, bagHeight, boxesQuantity);
  };

  return (
    <Box width="100%" maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Stack direction="column" padding={3}>
          <Stack direction="column">
            <Typography variant="h6" gutterBottom>
              Warehouse
            </Typography>

            <TextField
              fullWidth
              placeholder="only numbers"
              variant="standard"
              label="Width"
              type="number"
              onChange={(e) => setBagWidth(Number(e.target.value))}
            />

            <Box marginTop={2} width="100%">
              <TextField
                fullWidth
                placeholder="only numbers"
                variant="standard"
                label="Height"
                type="number"
                onChange={(e) => setBagHeight(Number(e.target.value))}
              />
            </Box>
          </Stack>

          <Stack marginTop={3} direction="column">
            <Typography variant="h6" gutterBottom>
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
            <Button type="submit" variant="contained">
              Confirm params
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}
