import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddRecordButton = () => {
    const navigate = useNavigate();

    return (
        <Button
            variant="contained"
           sx={{color:"#10a37f", backgroundColor: "white", "&:hover": { backgroundColor: "#f9fafb" }}}
            fullWidth
            onClick={() => navigate("/add-warranty")}
        >
            New +
        </Button>
    );
};

export default AddRecordButton;
