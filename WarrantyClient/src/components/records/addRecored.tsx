import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddRecordButton = () => {
    const navigate = useNavigate();

    return (
        <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginBottom: 2 }}
            onClick={() => navigate("/add-warranty")}
        >
            Add Warranty
        </Button>
    );
};

export default AddRecordButton;
