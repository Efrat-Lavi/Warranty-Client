// // import {
// //     MenuItem,
// //     Menu,
// //     ListItemIcon,
// //     ListItemText,
// //     IconButton,
// // } from "@mui/material"
// // import {
// //     MoreVert as MoreVertIcon,
// //     Edit as EditIcon,
// //     Delete as DeleteIcon,
// //     Share as ShareIcon,
// //     Download as DownloadIcon,
// // } from "@mui/icons-material"
// // import { useState } from "react"
// // import SharedDialog from "../sharedDialog"
// // import { Record } from "../../models/record"
// // import { downloadFile, downloadFileToComputer } from "../../services/fileServices"

// // const MenuWarranty = ({ record }: { record: Record }) => {

// //     const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
// //     const [sharedDialogOpen, setSharedDialogOpen] = useState<boolean>(false);
// //     const handleMenuClose = () => {
// //         setMenuAnchorEl(null)
// //     }
// //     const handleShareDialogOpen = () => {
// //         setSharedDialogOpen(true);
// //         handleMenuClose();

// //     }

// //     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
// //         setMenuAnchorEl(event.currentTarget)
// //     }

// //     const handleDownload = async() => {
// //         downloadFileToComputer(await downloadFile({ fileName: record.warranty.linkFile }), record.warranty.linkFile);
// //         handleMenuClose();
// //     }
// //     return (
// //         <>
// //             <IconButton onClick={handleMenuOpen}>
// //                 <MoreVertIcon />
// //             </IconButton>
// //             <Menu
// //                 anchorEl={menuAnchorEl}
// //                 open={Boolean(menuAnchorEl)}
// //                 onClose={handleMenuClose}
// //                 PaperProps={{
// //                     elevation: 0,
// //                     sx: {
// //                         overflow: "visible",
// //                         filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
// //                         mt: 1.5,
// //                         borderRadius: 2,
// //                         width: 200,
// //                         "& .MuiMenuItem-root": {
// //                             px: 2,
// //                             py: 1.5,
// //                         },
// //                     },
// //                 }}
// //             >
// //                 <MenuItem onClick={handleMenuClose}>
// //                     <ListItemIcon>
// //                         <EditIcon fontSize="small" />
// //                     </ListItemIcon>
// //                     <ListItemText>Edit</ListItemText>
// //                 </MenuItem>

// //                 {record?.roleWarranty === "OWNER" && (
// //                 <MenuItem onClick={handleShareDialogOpen}>
// //                     <ListItemIcon>
// //                         <ShareIcon fontSize="small" />
// //                     </ListItemIcon>
// //                     <ListItemText>Share</ListItemText>
// //                 </MenuItem>
// //             )}

// //                 <MenuItem onClick={handleDownload}>
// //                     <ListItemIcon>
// //                         <DownloadIcon fontSize="small" />
// //                     </ListItemIcon>
// //                     <ListItemText>Download</ListItemText>
// //                 </MenuItem>

// //                 {record.roleWarranty === "OWNER" && (
// //                     <MenuItem onClick={handleMenuClose}>
// //                         <ListItemIcon>
// //                             <DeleteIcon fontSize="small" color="error" />
// //                         </ListItemIcon>
// //                         <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
// //                     </MenuItem>
// //                 )}
// //             </Menu>
// //             {sharedDialogOpen &&  <SharedDialog record={record} showButton={false}/>}


// //         </>
// //     )
// // }
// // export default MenuWarranty
// import {
//     MenuItem,
//     Menu,
//     ListItemIcon,
//     ListItemText,
//     IconButton,
// } from "@mui/material";
// import {
//     MoreVert as MoreVertIcon,
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Share as ShareIcon,
//     Download as DownloadIcon,
// } from "@mui/icons-material";
// import { useState } from "react";
// import SharedDialog from "../sharedDialog";
// import DeleteDialog from "../deleteDialog"; // ייבוא הדיאלוג
// import { Record } from "../../models/record";
// import { downloadFile, downloadFileToComputer } from "../../services/fileServices";
// import { deleteWarranty } from "../../redux/warrantySlice";
// import { useSelector } from "react-redux";
// import { StoreType } from "../../redux/store";
// import { useNavigate } from "react-router-dom";

// const MenuWarranty = ({ record }: { record: Record }) => {
//     const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
//     const [sharedDialogOpen, setSharedDialogOpen] = useState<boolean>(false);
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false); // הוספת סטייט לדיאלוג מחיקה
//     const navigate = useNavigate()
//     const token = useSelector((store: StoreType) => store.auth.token)
//     const handleMenuClose = () => {
//         setMenuAnchorEl(null);
//     };

//     const handleShareDialogOpen = () => {
//         setSharedDialogOpen(true);
//         handleMenuClose();
//     };

//     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//         setMenuAnchorEl(event.currentTarget);
//     };

//     const handleDownload = async () => {
//         downloadFileToComputer(
//             await downloadFile({ fileName: record.warranty.linkFile }),
//             record.warranty.linkFile
//         );
//         handleMenuClose();
//     };

//     const handleDeleteDialogOpen = () => {
//         setDeleteDialogOpen(true);
//         handleMenuClose();
//     };

//     const handleDeleteConfirm = async () => {
//         setDeleteDialogOpen(false);
//         if (token)
//             await deleteWarranty({ token, warrantyId: record.warrantyId })
//         navigate("/record")
//     };

//     return (
//         <>
//             <IconButton onClick={handleMenuOpen}>
//                 <MoreVertIcon />
//             </IconButton>
//             <Menu
//                 anchorEl={menuAnchorEl}
//                 open={Boolean(menuAnchorEl)}
//                 onClose={handleMenuClose}
//                 PaperProps={{
//                     elevation: 0,
//                     sx: {
//                         overflow: "visible",
//                         filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
//                         mt: 1.5,
//                         borderRadius: 2,
//                         width: 200,
//                         "& .MuiMenuItem-root": {
//                             px: 2,
//                             py: 1.5,
//                         },
//                     },
//                 }}
//             >
//                 <MenuItem onClick={handleMenuClose}>
//                     <ListItemIcon>
//                         <EditIcon fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText>Edit</ListItemText>
//                 </MenuItem>

//                 {record?.roleWarranty === "OWNER" && (
//                     <MenuItem onClick={handleShareDialogOpen}>
//                         <ListItemIcon>
//                             <ShareIcon fontSize="small" />
//                         </ListItemIcon>
//                         <ListItemText>Share</ListItemText>
//                     </MenuItem>
//                 )}

//                 <MenuItem onClick={handleDownload}>
//                     <ListItemIcon>
//                         <DownloadIcon fontSize="small" />
//                     </ListItemIcon>
//                     <ListItemText>Download</ListItemText>
//                 </MenuItem>

//                 {record.roleWarranty === "OWNER" && (
//                     <MenuItem onClick={handleDeleteDialogOpen}>
//                         <ListItemIcon>
//                             <DeleteIcon fontSize="small" color="error" />
//                         </ListItemIcon>
//                         <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
//                     </MenuItem>
//                 )}
//             </Menu>

//             {sharedDialogOpen && <SharedDialog record={record} showButton={false} />}

//             <DeleteDialog
//                 open={deleteDialogOpen}
//                 onClose={() => setDeleteDialogOpen(false)}
//                 onConfirm={handleDeleteConfirm}
//             />
//         </>
//     );
// };

// export default MenuWarranty;
import {
    MenuItem,
    Menu,
    ListItemIcon,
    ListItemText,
    IconButton,
} from "@mui/material";
import {
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Share as ShareIcon,
    Download as DownloadIcon,
} from "@mui/icons-material";
import { useState } from "react";
import SharedDialog from "../sharedDialog";
import DeleteDialog from "../deleteDialog";
import EditWarrantyDialog, { WarrantyData } from "../editWarrantyForm"; // ייבוא דיאלוג העריכה
import { Record } from "../../models/record";
import { downloadFile, downloadFileToComputer } from "../../services/fileServices";
import { deleteWarranty, updateWarranty } from "../../redux/warrantySlice";
import { useSelector } from "react-redux";
import { StoreType } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Warranty } from "../../models/warranties";

const MenuWarranty = ({ record }: { record: Record }) => {
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [sharedDialogOpen, setSharedDialogOpen] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false); // הוספת סטייט לדיאלוג עריכה
    const navigate = useNavigate();
    const token = useSelector((store: StoreType) => store.auth.token);

    const handleMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const handleShareDialogOpen = () => {
        setSharedDialogOpen(true);
        handleMenuClose();
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleDownload = async () => {
        downloadFileToComputer(
            await downloadFile({ fileName: record.warranty.linkFile }),
            record.warranty.linkFile
        );
        handleMenuClose();
    };

    const handleDeleteDialogOpen = () => {
        setDeleteDialogOpen(true);
        handleMenuClose();
    };

    const handleDeleteConfirm = async () => {
        setDeleteDialogOpen(false);
        if (token)
            await deleteWarranty({ token, warrantyId: record.warrantyId });
        navigate("/record");
    };

    const handleEditDialogOpen = () => {
        setEditDialogOpen(true);
        handleMenuClose();
    };

    const handleEditSubmit = async (updatedData: WarrantyData) => {
        setEditDialogOpen(false);
        if (token)
            await updateWarranty({ token, id: record.warrantyId, warranty: updatedData });
    };

    return (
        <>
            <IconButton onClick={handleMenuOpen}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
                        mt: 1.5,
                        borderRadius: 2,
                        width: 200,
                        "& .MuiMenuItem-root": {
                            px: 2,
                            py: 1.5,
                        },
                    },
                }}
            >
                {record?.roleWarranty === "EDITOR"||record?.roleWarranty === "OWNER" && (
                    <MenuItem onClick={handleEditDialogOpen}>
                        <ListItemIcon>
                            <EditIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Edit</ListItemText>
                    </MenuItem>
                )}

                {record?.roleWarranty === "OWNER" && (
                    <MenuItem onClick={handleShareDialogOpen}>
                        <ListItemIcon>
                            <ShareIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Share</ListItemText>
                    </MenuItem>
                )}

                <MenuItem onClick={handleDownload}>
                    <ListItemIcon>
                        <DownloadIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Download</ListItemText>
                </MenuItem>

                {record.roleWarranty === "OWNER" && (
                    <MenuItem onClick={handleDeleteDialogOpen}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" color="error" />
                        </ListItemIcon>
                        <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
                    </MenuItem>
                )}
            </Menu>

            {sharedDialogOpen && <SharedDialog record={record} showButton={false} />}
            <DeleteDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
            <EditWarrantyDialog
                open={editDialogOpen}
                initialData={record.warranty}
                onClose={() => setEditDialogOpen(false)}
                onSubmit={handleEditSubmit}
            />
        </>
    );
};

export default MenuWarranty;
