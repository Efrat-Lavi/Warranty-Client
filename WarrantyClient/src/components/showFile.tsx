import { Box, CardMedia, Typography, Button, Dialog, IconButton, DialogContent, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { DownloadIcon } from "lucide-react";
import { Close as CloseIcon } from "@mui/icons-material"
import { downloadFile, downloadFileToComputer } from "../services/fileServices";
import { Warranty } from "../models/warranties";
import { Receipt as ReceiptIcon } from "@mui/icons-material"

const ShowFile = ({ warranty, fileName }: { warranty: Warranty, fileName: string }) => {

    const [fileUrl, setFileUrl] = useState<string>();
    const [isImage, setIsImage] = useState<boolean>(false);

    useEffect(() => {
        const fetchFileUrl = async () => {
            try {
                const res = await downloadFile({ fileName });

                setFileUrl(res);
                console.log(fileUrl);

                // בדיקת סוג הקובץ לפי הסיומת
                const fileExtension = fileName.split(".").pop()?.toLowerCase();
                setIsImage(fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg");

            } catch (error) {
                console.error('שגיאה בהבאת ה-URL:', error);
                alert(`שגיאה בהבאת ה-URL: ${error}`);
            }
        };

        fetchFileUrl();
    }, [fileName]);


    const [fileDialogOpen, setFileDialogOpen] = useState(false)


    const handleFileDialogOpen = () => {
        setFileDialogOpen(true)
    }

    const handleFileDialogClose = () => {
        setFileDialogOpen(false)
    }
    return (<>
        <Paper
            onClick={handleFileDialogOpen}
            sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid rgba(0, 0, 0, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "all 0.2s",
                "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                },
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
                        backgroundColor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                    }}
                >
                    <ReceiptIcon sx={{ color: "white" }} />
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {warranty.nameProduct} Warranty
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Click to view document
                    </Typography>
                </Box>
            </Box>
            <Button
                startIcon={<DownloadIcon />}
                onClick={() => {downloadFileToComputer(fileUrl||'',warranty.linkFile) }}
                sx={{
                    textTransform: "none",
                    fontWeight: 500,
                }}
            >
                Download
            </Button>
        </Paper>


        <Dialog open={fileDialogOpen} onClose={handleFileDialogClose} maxWidth="md" fullWidth>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
                <Typography variant="h6">{warranty.nameProduct} Warranty</Typography>
                <Box>
                    <Button
                        startIcon={<DownloadIcon />}
                        onClick={() => {downloadFileToComputer(fileUrl||'',warranty.linkFile) }}
                        sx={{
                            mr: 1,
                            textTransform: "none",
                            fontWeight: 500,
                        }}
                    >
                        Download
                    </Button>
                    <IconButton onClick={handleFileDialogClose} size="small">
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>
            <DialogContent sx={{ p: 0, backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                <Box sx={{ height: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>

                    {isImage && <CardMedia
                        component="img"
                        height="90%"
                        image={fileUrl}
                        alt={fileName}
                        sx={{ objectFit: 'contain', paddingTop: '25px' }}
                    />}
                    {!isImage &&
                       <iframe
                       src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                       width="100%"
                       height="100%"
                       style={{ border: "none" }}
                   />
                  }
                </Box>
            </DialogContent>
        </Dialog>
    </>
    );
};

export default ShowFile;
