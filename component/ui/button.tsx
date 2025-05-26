import { Button, SxProps, Theme } from "@mui/material";

export function UiButton({
  name,
  prop,
}: {
  name: string;
  prop?: SxProps<Theme>;
}) {
  return (
    <Button
      variant="contained"
      color="success"
      sx={{ fontSize: "14px", ...prop }}
    >
      {name}
    </Button>
  );
}
