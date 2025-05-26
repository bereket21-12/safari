"use client";
import React, { useState } from "react";
import NavBar from "../component/navbar";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import { green } from "@mui/material/colors";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import DeleteIcon from "@mui/icons-material/Delete";
import MobileScreenShareIcon from "@mui/icons-material/MobileScreenShare";
import ArticleIcon from "@mui/icons-material/Article";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Minimum 8 characters")
  .regex(/[A-Z]/, "At least one uppercase letter")
  .regex(/[a-z]/, "At least one lowercase letter")
  .regex(/[0-9]/, "At least one number")
  .regex(/[^A-Za-z0-9]/, "At least one special character");

function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleLogin = () => {
    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }
    setError("");
    router.push("/dashboard");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        // padding: 3,
        backgroundColor: "#fff",
        borderRadius: 2,
        // height: "100vh",
      }}
    >
      <NavBar />
      <Box>
        <Box>
          <Typography
            sx={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}
          >
            M-PESA AQUISTATION PORTAL
          </Typography>
          <Typography sx={{ fontSize: "1rem", color: "gray" }}>
            Welcome to the M-PESA Aquistation Portal. Here you can manage your
            M-PESA transactions and settings.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            width: "100%",
            marginTop: 4,
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: "100%", md: 120 },
              height: { xs: 120, md: 120 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              order: { xs: 1, md: 2 },
              marginBottom: { xs: 3, md: 0 },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translate(-50%, 0)",
                background: "white",
                borderRadius: "50%",
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 2,
              }}
            >
              <ArrowOutwardIcon sx={{ color: green[500], fontSize: 32 }} />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translate(0, -50%)",
                background: "white",
                borderRadius: "50%",
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 2,
              }}
            >
              <DeleteIcon sx={{ color: green[500], fontSize: 32 }} />
            </Box>
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translate(-50%, 0)",
                background: "white",
                borderRadius: "50%",
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 2,
              }}
            >
              <MobileScreenShareIcon sx={{ color: green[500], fontSize: 32 }} />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                right: 0,
                transform: "translate(0, -50%)",
                background: "white",
                borderRadius: "50%",
                width: 56,
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 2,
              }}
            >
              <ArticleIcon sx={{ color: green[500], fontSize: 32 }} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", md: 400 },
              padding: 3,
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 1,
              order: { xs: 2, md: 1 },
            }}
          >
            <TextField
              type="email"
              variant="outlined"
              color="primary"
              sx={{
                width: "400px",
                marginBottom: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
              }}
              InputProps={{
                style: { color: "#222" },
              }}
            />

            <TextField
              type={showPassword ? "text" : "password"}
              variant="outlined"
              color="primary"
              sx={{
                width: "400px",
                marginBottom: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
              }}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error}
              helperText={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { color: "#222" },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: "300px",
                backgroundColor: green[500],
                color: "white",
                "&:hover": {
                  backgroundColor: green[700],
                  color: "white",
                },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
