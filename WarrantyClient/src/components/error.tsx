import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width:"80%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#121212",
        color: "white",
      }}
    >
      <Typography variant="h1" fontWeight="bold" color="error">
        404
      </Typography>
      <Typography variant="h5" mt={1}>
        Oops! The page you’re looking for doesn’t exist.
      </Typography>
      <Typography variant="body1" mt={1} color="gray">
        It might have been removed, renamed, or did not exist in the first place.
      </Typography>
      <Button
        variant="contained"
        sx={{ mt: 3, bgcolor: "primary.main" }}
        onClick={() => navigate("/")}
      >
        Go Back Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
