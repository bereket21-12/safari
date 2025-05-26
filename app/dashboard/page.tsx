"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const bankOptions = ["Bank A", "Bank B", "Bank C"];
const branchOptions = ["Branch X", "Branch Y", "Branch Z"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [flowType, setFlowType] = React.useState("onboarding");

  const [bankName, setBankName] = React.useState("");
  const [branchName, setBranchName] = React.useState("");
  const [accountName, setAccountName] = React.useState("");
  const [accountNumber, setAccountNumber] = React.useState("");
  const [accountNumberError, setAccountNumberError] = React.useState("");
  const [proofFile, setProofFile] = React.useState<File | null>(null);
  const [proofFileError, setProofFileError] = React.useState("");

  const [modalOpen, setModalOpen] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  const onboardingSteps = [
    "Bank Name",
    "Branch Name",
    "Account Name",
    "Account Number",
    "Proof of Bank Account",
  ];
  const withdrawalSteps = [
    "Withdrawal Amount",
    "Withdrawal Reason",
    "Proof of Identity",
  ];
  const steps = flowType === "onboarding" ? onboardingSteps : withdrawalSteps;

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 3) {
      if (!/^\d+$/.test(accountNumber)) {
        setAccountNumberError("Account number must be numeric");
        return;
      } else {
        setAccountNumberError("");
      }
    }
    if (activeStep === 4) {
      if (!proofFile) {
        setProofFileError("Please upload a file");
        return;
      }
      const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
      if (!allowedTypes.includes(proofFile.type)) {
        setProofFileError("File must be PDF, PNG, or JPG");
        return;
      }
      setProofFileError("");
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => {
      const nextStep = prevActiveStep + 1;
      if (nextStep === steps.length) {
        setModalOpen(true);
        setIsSaved(true);
      }
      return nextStep;
    });
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setIsSaved(false);
    setModalOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        partner {flowType === "onboarding" ? "onboarding" : "withdrawal"}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <label>
          <input
            type="radio"
            value="onboarding"
            checked={flowType === "onboarding"}
            onChange={() => {
              setFlowType("onboarding");
              setActiveStep(0);
            }}
          />
          Onboarding
        </label>
        <label style={{ marginLeft: 16 }}>
          <input
            type="radio"
            value="withdrawal"
            checked={flowType === "withdrawal"}
            onChange={() => {
              setFlowType("withdrawal");
              setActiveStep(0);
            }}
          />
          Withdrawal
        </label>
      </Box>
      <Stepper activeStep={activeStep}>
        {steps.map((label: string) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: 2, mb: 1 }}>
            {flowType === "onboarding" && (
              <>
                {activeStep === 0 && (
                  <Box>
                    <Typography>Bank Name</Typography>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      style={{ width: "100%", padding: 8, marginTop: 8 }}
                    >
                      <option value="">Select Bank</option>
                      {bankOptions.map((bank) => (
                        <option key={bank} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box>
                    <Typography>Branch Name</Typography>
                    <select
                      value={branchName}
                      onChange={(e) => setBranchName(e.target.value)}
                      style={{ width: "100%", padding: 8, marginTop: 8 }}
                    >
                      <option value="">Select Branch</option>
                      {branchOptions.map((branch) => (
                        <option key={branch} value={branch}>
                          {branch}
                        </option>
                      ))}
                    </select>
                  </Box>
                )}
                {activeStep === 2 && (
                  <Box>
                    <Typography>Account Name</Typography>
                    <input
                      type="text"
                      value={accountName}
                      onChange={(e) => setAccountName(e.target.value)}
                      style={{ width: "100%", padding: 8, marginTop: 8 }}
                    />
                  </Box>
                )}
                {activeStep === 3 && (
                  <Box>
                    <Typography>Account Number</Typography>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      style={{ width: "100%", padding: 8, marginTop: 8 }}
                    />
                    {accountNumberError ? (
                      <Typography color="error" variant="caption">
                        {accountNumberError}
                      </Typography>
                    ) : null}
                  </Box>
                )}
                {activeStep === 4 && (
                  <Box>
                    <Typography>Proof of Bank Account</Typography>
                    <input
                      type="file"
                      accept=".pdf, .png, .jpg, .jpeg"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setProofFile(e.target.files[0]);
                        }
                      }}
                      style={{ marginTop: 8 }}
                    />
                    {proofFileError ? (
                      <Typography color="error" variant="caption">
                        {proofFileError}
                      </Typography>
                    ) : null}
                  </Box>
                )}
              </>
            )}
            {flowType === "withdrawal" && (
              <>
                {activeStep === 0 && (
                  <Box>
                    <Typography>Withdrawal Amount</Typography>
                    <input
                      type="number"
                      min="1"
                      style={{ width: "100%", padding: 8, marginTop: 8 }}
                    />
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box>
                    <Typography>Withdrawal Reason</Typography>
                    <input
                      type="text"
                      style={{ width: "100%", padding: 8, marginTop: 8 }}
                    />
                  </Box>
                )}
                {activeStep === 2 && (
                  <Box>
                    <Typography>Proof of Identity</Typography>
                    <input
                      type="file"
                      accept=".pdf, .png, .jpg, .jpeg"
                      style={{ marginTop: 8 }}
                    />
                  </Box>
                )}
              </>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleNext}>{isSaved ? "Saved" : "Draft"}</Button>
          </Box>
        </React.Fragment>
      )}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            minWidth: 300,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Submitted Details
          </Typography>
          {flowType === "onboarding" ? (
            <>
              <Typography sx={{ color: "black" }}>
                Bank Name: {bankName}
              </Typography>
              <Typography sx={{ color: "black" }}>
                Branch Name: {branchName}
              </Typography>
              <Typography sx={{ color: "black" }}>
                Account Name: {accountName}
              </Typography>
              <Typography sx={{ color: "black" }}>
                Account Number: {accountNumber}
              </Typography>
              <Typography sx={{ color: "black" }}>
                Proof File: {proofFile ? proofFile.name : "-"}
              </Typography>
            </>
          ) : (
            <>{/* Add withdrawal details here if needed */}</>
          )}
          <Button sx={{ mt: 2 }} onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
