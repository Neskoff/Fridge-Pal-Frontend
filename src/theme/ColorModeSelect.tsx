import * as React from "react";
import { useColorScheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectProps } from "@mui/material/Select";
import SunnyIcon from "@mui/icons-material/Sunny";
import BedtimeIcon from "@mui/icons-material/Bedtime";

export default function ColorModeSelect(props: SelectProps) {
  const { mode, setMode } = useColorScheme();
  return (
    <Select
      value={mode || "dark"}
      onChange={(event) => setMode(event.target.value as "light" | "dark")}
      {...props}
    >
      <MenuItem value="light">
        <SunnyIcon fontSize={"small"} />
        &nbsp; &nbsp;Light
      </MenuItem>
      <MenuItem value="dark">
        <BedtimeIcon fontSize={"small"} />
        &nbsp; &nbsp;Dark
      </MenuItem>
    </Select>
  );
}
