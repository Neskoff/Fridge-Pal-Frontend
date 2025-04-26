import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers";
import * as React from "react";
import { DateTime } from "luxon";

interface DateTimeInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  maxDate?: DateTime;
  minDate?: DateTime;
}

export const DateTimeInput = <T extends FieldValues>({
  name,
  label,
  control,
  maxDate,
  minDate,
}: DateTimeInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field }) => (
        <DateTimePicker
          maxDateTime={maxDate}
          minDateTime={minDate}
          label={label}
          {...field}
        />
      )}
    />
  );
};
