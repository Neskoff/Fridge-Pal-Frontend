import React from "react";
import { Box, IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import DialogContentText from "@mui/material/DialogContentText";

type NumberInputIncrementalProps<
  TFormValues extends FieldValues,
  TFieldName extends FieldPath<TFormValues>,
> = {
  field: ControllerRenderProps<TFormValues, TFieldName>;
};
const NumberInputIncremental = <
  TFormValues extends FieldValues,
  TFieldName extends FieldPath<TFormValues>,
>({
  field,
}: NumberInputIncrementalProps<TFormValues, TFieldName>) => {
  return (
    <>
      <DialogContentText>Quantity</DialogContentText>{" "}
      <Box display="flex" alignItems="center" gap={1}>
        <IconButton onClick={() => field.onChange(field.value - 1)}>
          <RemoveIcon />
        </IconButton>
        <TextField
          value={field.value}
          slotProps={{
            htmlInput: { style: { textAlign: "center" } },
          }}
          sx={{ width: 80 }}
        />
        <IconButton onClick={() => field.onChange(field.value + 1)}>
          <AddIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default NumberInputIncremental;
