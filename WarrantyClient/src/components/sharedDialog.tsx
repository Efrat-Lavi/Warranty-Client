import {
    Box, Typography, Button, IconButton, Grid, Divider, Dialog, DialogContent, TextField, MenuItem, ListItemIcon, ListItemText,
    CircularProgress,
} from "@mui/material"
import {
    Edit as EditIcon, Close as CloseIcon, Email as EmailIcon, ContentCopy as CopyIcon,
    Link as LinkIcon, Person as PersonIcon, PersonAdd as PersonAddIcon, Check as CheckIcon,
} from "@mui/icons-material"
import { useState } from "react"
import { Share2 } from "lucide-react"
import { AddDispatch, StoreType } from "../redux/store"
import { useDispatch, useSelector } from "react-redux"
import { addRecord, getRecords } from "../redux/recordSlice"
import { User } from "../models/user"
import { getUserByEmail } from "../services/userService"
import { Record } from "../models/record"
import { useParams } from "react-router-dom"

const SharedDialog = ({ record }: { record: Record }) => {

    const dispatch: AddDispatch = useDispatch();
    const token = useSelector((store: StoreType) => store.auth.token)
    const email = useSelector((store: StoreType) => store.auth.user?.email)
    const { id } = useParams<{ id: string }>()
    const [shareEmail, setShareEmail] = useState<string>("")
    const [sharePermission, setSharePermission] = useState("VIEWER")
    const [linkCopied, setLinkCopied] = useState(false)
    const [shareDialogOpen, setShareDialogOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [userToShare, setUserToShare] = useState<User | null>();

    const handleShareDialogClose = () => {
        setShareDialogOpen(false)
        setShareEmail("")
        setSharePermission("VIEWER")
    }


    const handleCopyLink = () => {
        // In a real app, this would copy a sharing link to the clipboard
        navigator.clipboard.writeText(`https://warrantykeeper.com/share`)
        setLinkCopied(true)
        setTimeout(() => setLinkCopied(false), 2000)
    }

    const handleShareSubmit = async () => {
        // In a real app, this would send an invitation to the email
        setIsLoading(true)
        if (token && email && id) {
            const isExist = await getUserByEmail({ token, email: shareEmail })
            setUserToShare(isExist);
            console.log(isExist);

            if (!isExist)
                setError("this user is not register");
            else {
                console.log(record);
                await dispatch(addRecord({ token, record: { userId: isExist.id, warrantyId: record.warrantyId, roleWarranty: sharePermission } }))
                    // .then(() => {
                    //     dispatch(getRecords({ token, userId: +id })); // מרענן את הרשומות
                    // });

            }
        }
        setIsLoading(false)

        console.log("Sharing with:", shareEmail, "Permission:", sharePermission)
        handleShareDialogClose()
    }
    return (
        <>
            <Button
                variant="outlined"
                startIcon={<Share2 size={18} />}
                onClick={() => { setShareDialogOpen(true) }}
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
            >
                Share this warranty
            </Button>

            <Dialog open={shareDialogOpen} onClose={handleShareDialogClose} maxWidth="sm" fullWidth>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
                    <Typography variant="h6">Share Warranty</Typography>
                    <IconButton onClick={handleShareDialogClose} size="small">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Share this warranty with others. They will be able to view or edit the warranty based on the permission you
                        grant.
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Share via Email
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Email Address"
                                    fullWidth
                                    value={shareEmail}
                                    onChange={(e) => setShareEmail(e.target.value)}
                                    placeholder="Enter email address"
                                    InputProps={{
                                        startAdornment: <EmailIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    select
                                    label="Permission"
                                    fullWidth
                                    value={sharePermission}
                                    onChange={(e) => setSharePermission(e.target.value)}
                                >
                                    <MenuItem value="VIEWER">
                                        <ListItemIcon>
                                            <PersonIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Viewer</ListItemText>
                                    </MenuItem>
                                    <MenuItem value="EDITOR">
                                        <ListItemIcon>
                                            <EditIcon fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText>Editor</ListItemText>
                                    </MenuItem>
                                </TextField>
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            startIcon={<PersonAddIcon />}
                            onClick={handleShareSubmit}
                            sx={{
                                mt: 2,
                                textTransform: "none",
                                fontWeight: 500,
                                borderRadius: "8px",
                            }}
                        >
                            Send Invitation
                            {isLoading && <CircularProgress size={30} thickness={4} sx={{ mb: 2 }} />}


                        </Button>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Share via Link
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                p: 2,
                                borderRadius: 1,
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                            }}
                        >
                            <LinkIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                            <Typography variant="body2" sx={{ flexGrow: 1, overflow: "hidden", textOverflow: "ellipsis" }}>
                                https://warrantykeeper.com/share
                            </Typography>
                            <Button
                                startIcon={linkCopied ? <CheckIcon /> : <CopyIcon />}
                                onClick={handleCopyLink}
                                sx={{
                                    ml: 1,
                                    textTransform: "none",
                                    fontWeight: 500,
                                }}
                            >
                                {linkCopied ? "Copied" : "Copy"}
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default SharedDialog;