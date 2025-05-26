import { TextField } from "@mui/material";
import { SxProps, Theme } from "@mui/material";
export function UiInput({
  name,
  prop,
  type,
}: {
  name: string;
  type?: string;
  prop?: SxProps<Theme>;
}) {
  return (
    <TextField
      type={type || "text"}
      variant="outlined"
      color="primary"
      sx={{ ...prop }}
      placeholder={name}
    />
  );
}
