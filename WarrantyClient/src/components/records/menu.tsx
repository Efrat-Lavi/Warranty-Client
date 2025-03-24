import {
    MenuItem,
    Menu,
    ListItemIcon,
    ListItemText,
    IconButton,
} from "@mui/material"
import {
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Share as ShareIcon,
    Download as DownloadIcon,
} from "@mui/icons-material"
import { useState } from "react"
import SharedDialog from "../sharedDialog"
import { Record } from "../../models/record"

const MenuWarranty = ({record}:{record:Record}) => {

    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
    const [sharedDialogOpen, setSharedDialogOpen] = useState<boolean>(false);
    const handleMenuClose = () => {
        setMenuAnchorEl(null)
    }
    const handleShareDialogOpen = () => {
        setSharedDialogOpen(true);
    }

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchorEl(event.currentTarget)
      }
    

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
            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
            </MenuItem>

            {record?.roleWarranty === "OWNER" && (
                <MenuItem onClick={handleShareDialogOpen}>
                    <ListItemIcon>
                        <ShareIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Share</ListItemText>
                </MenuItem>
            )}

            <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                    <DownloadIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Download</ListItemText>
            </MenuItem>

            {record.roleWarranty === "OWNER" && (
                <MenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
                </MenuItem>
            )}
        </Menu>
        {sharedDialogOpen&& <SharedDialog record={record}></SharedDialog>}
        </>
    )
}
export default MenuWarranty