"use client";
import React from "react";
import { Box, Drawer, Avatar, Typography } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PreviewIcon from "@mui/icons-material/Preview";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: "border-box",
            background: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 2,
          },
        }}
        anchor="left"
        open
      >
        <Avatar
          alt="User Avatar"
          src="/download.jpeg"
          sx={{ width: 80, height: 80, mb: 2 }}
        />
        <Box
          sx={{
            width: "100%",
            padding: 2,
            alignItems: "flex-start",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              alignSelf: "flex-start",
              color: "#000",
              cursor: "pointer",
            }}
          >
            <DashboardIcon sx={{ fontSize: 24, color: "#1976d2", mr: 1 }} />
            <Typography variant="body1" sx={{ color: "#000" }}>
              Dashboard
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              alignSelf: "flex-start",
              color: "#000",
              cursor: "pointer",
            }}
          >
            <AccountBalanceIcon
              sx={{ fontSize: 24, color: "#1976d2", mr: 1 }}
            />
            <Typography variant="body1" sx={{ color: "#000" }}>
              onboading
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              alignSelf: "flex-start",
              color: "#000",
              cursor: "pointer",
            }}
          >
            <PreviewIcon sx={{ fontSize: 24, color: "#1976d2", mr: 1 }} />
            <Typography variant="body1" sx={{ color: "#000" }}>
              Profile
            </Typography>
          </Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mt: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
