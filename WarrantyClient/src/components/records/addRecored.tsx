// // // import { Button } from "@mui/material";
// // // import { useNavigate } from "react-router-dom";

// // // const AddRecordButton = () => {
// // //     const navigate = useNavigate();

// // //     return (
// // //         <Button
// // //             variant="contained"
// // //            sx={{color:"#10a37f", backgroundColor: "white", "&:hover": { backgroundColor: "#f9fafb" }}}
// // //             fullWidth
// // //             onClick={() => navigate("/add-warranty")}
// // //         >
// // //             New +
// // //         </Button>
// // //     );
// // // };

// // // export default AddRecordButton;
// // import { IconButton } from "@mui/material";
// // import { Add } from "@mui/icons-material";
// // import { useNavigate } from "react-router-dom";

// // const AddRecordButton = () => {
// //     const navigate = useNavigate();

// //     return (
// //         <IconButton
// //             onClick={() => navigate("/add-warranty")}
// //             sx={{
// //                 color: "#10a37f",
// //                 backgroundColor: "transparent",
// //                 "&:hover": {
// //                     backgroundColor: "#f0f0f0"
// //                 }
// //             }}
// //         >
// //             <Add />
// //         </IconButton>
// //     );
// // };

// // export default AddRecordButton;
// import { IconButton } from "@mui/material";
// import { Add } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// const AddRecordButton = () => {
//     const navigate = useNavigate();

//     return (
//         <IconButton
//             onClick={() => navigate("/add-warranty")}
//             sx={{
//                 color: "#10a37f",
//                 backgroundColor: "transparent",
//                 ml: 1.5, // רווח מצד שמאל
//                 borderRadius: "6px", // פינות פחות עגולות
//                 "&:hover": {
//                     backgroundColor: "#f0f0f0",
//                     borderRadius: "6px" // נשאר גם בהובר
//                 }
//             }}
//         >
//             <Add />
//         </IconButton>
//     );
// };

// export default AddRecordButton;
import { IconButton, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AddRecordButton = () => {
    const navigate = useNavigate();

    return (
        <Tooltip title="Add New Warranty" >
            <IconButton
                onClick={() => navigate("/add-warranty")}
                sx={{
                    color: "#10a37f",
                    backgroundColor: "transparent",
                    ml: 3, // רווח מצד שמאל
                    borderRadius: "6px", // פינות פחות עגולות
                    "&:hover": {
                        backgroundColor: "#f0f0f0",
                        borderRadius: "6px"
                    }
                }}
            >
                <Add />
            </IconButton>
        </Tooltip>
    );
};

export default AddRecordButton;
