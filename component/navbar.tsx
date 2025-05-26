import { Box, Button, Divider, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import Image from "next/image";

export default function NavBar() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 2,
        padding: 2,
        height: "100px",
        backgroundColor: green[500],
        width: "100%",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Image
          src="/download.jpeg"
          alt="Logo"
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
        />

        <Divider
          orientation="vertical"
          flexItem
          sx={{ marginLeft: 2, marginRight: 2 }}
        />

        <Image
          src="/safari.jpeg"
          alt="Logo"
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
        />
      </Box>

      <Box
        sx={{
          width: { xs: "auto", md: "100%" },
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: { xs: 1, md: 3 },
          paddingRight: "40px",
        }}
      >
        <Typography sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
          Apply
        </Typography>
        <Typography sx={{ fontSize: { xs: "1rem", md: "1.25rem" } }}>
          Recommend
        </Typography>
        <Button
          sx={{
            color: green[500],
            backgroundColor: "white",
            minWidth: { xs: 80, md: 100 },
            display: "block",
            marginTop: { xs: 1, md: 0 },
            fontSize: { xs: "0.9rem", md: "1rem" },
            "&:hover": { backgroundColor: "#f0f0f0" },
          }}
          variant="contained"
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}
