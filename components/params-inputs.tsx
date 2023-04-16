import { Stack, Typography, TextField, Box, Button } from "@mui/material";

export default function ParamsInputs() {
  return (
    <Box width="100%" maxWidth="sm">
      <form>
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
            />

            <Box marginTop={2} width="100%">
              <TextField
                fullWidth
                placeholder="only numbers"
                variant="standard"
                label="Height"
                type="number"
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
