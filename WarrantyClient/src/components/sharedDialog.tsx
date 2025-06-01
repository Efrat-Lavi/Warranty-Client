import {
    Box, Typography, Button, IconButton, Grid, Divider, Dialog, DialogContent, TextField, MenuItem, ListItemIcon, ListItemText,
    CircularProgress,
    Alert,
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
import { getUserByEmail } from "../services/userService"
import { Record } from "../models/record"
import { useParams } from "react-router-dom"
import { sendEmail } from "../services/emailServices"

const SharedDialog = ({ record, showButton }: { record: Record, showButton: boolean }) => {

    const dispatch: AddDispatch = useDispatch();
    const { token, user } = useSelector((store: StoreType) => store.auth)
    const email = useSelector((store: StoreType) => store.auth.user?.email)
    const { id } = useParams<{ id: string }>()
    const [shareEmail, setShareEmail] = useState<string>("")
    const [sharePermission, setSharePermission] = useState("VIEWER")
    const [linkCopied, setLinkCopied] = useState(false)
    const [shareDialogOpen, setShareDialogOpen] = useState(!showButton)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    // const [userToShare, setUserToShare] = useState<User | null>();

    const handleShareDialogClose = () => {
        setShareDialogOpen(false)
        setShareEmail("")
        setSharePermission("VIEWER")
    }

    const handleCopyLink = () => {
        const currentUrl = window.location.href; // לוקח את ה-URL הנוכחי
        navigator.clipboard.writeText(currentUrl); // מעתיק ללוח העריכה
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    };
    
    // const handleCopyLink = () => {
    //     // In a real app, this would copy a sharing link to the clipboard
    //     navigator.clipboard.writeText(`https://warrantykeeper.com/share`)
    //     setLinkCopied(true)
    //     setTimeout(() => setLinkCopied(false), 2000)
    // }

    const handleShareSubmit = async () => {
        // In a real app, this would send an invitation to the email
        setIsLoading(true)
        if (token && email && id) {
            const isExist = await getUserByEmail({ token, email: shareEmail })
            // setUserToShare(isExist);
            console.log(isExist);

            if (!isExist)
                setError(`${shareEmail} is not register`);
            else {
                console.log(record.warranty.records);
                if (user && user.id == isExist.id)
                    setError(`you can not share yourself`)

                else if (record.warranty.records.some(record => record.userId === isExist.id))

                    setError(`${isExist.nameUser} is already shared`)
                else {
                    console.log(record);
                    await dispatch(addRecord({ token, record: { userId: isExist.id, warrantyId: record.warrantyId, roleWarranty: sharePermission, emailOwner: user?.email } }))
                        .then(() => {
                            if (user && user.id)
                                dispatch(getRecords({ token, userId: user?.id }));
                        });
                        if (user?.email) {
                            await sendEmail(
                                shareEmail,
                                "You have been invited to a warranty",
                                user.email, // המזמין
                                sharePermission, // סוג ההרשאה
                                window.location.href // קישור לתעודת האחריות
                            );
                        }
                        
                    handleShareDialogClose()
                }
            }
        }
        setIsLoading(false)

        console.log("Sharing with:", shareEmail, "Permission:", sharePermission)
    }
    return (
        <>
            {showButton &&
                <Button
                    variant="outlined"
                    startIcon={<Share2 size={18} />}
                    onClick={() => { setShareDialogOpen(true) }}
                    className="text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                    Share this warranty
                </Button>
            }
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
                                {error && (
                                    <Box className="max-w-3xl mx-auto p-6">
                                        <Alert severity="error">Error: {error}</Alert>
                                    </Box>
                                )}
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
                                {window.location.href}
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