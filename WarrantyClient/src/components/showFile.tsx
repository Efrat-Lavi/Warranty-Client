// import { Download } from "@mui/icons-material";
// import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { downloadFile } from "../services/fileServices";
// // import FileDownload from "../FileDownload";

// const ShoeFile = ({ fileName, userId }: { fileName: string, userId: string }) => {

//     const [imageUrl, setImageUrl] = useState<string | null>(null);
//     const [download, setDownload] = useState<boolean>(false);

//     useEffect(() => {
//         console.log("inshoeTemplte useEffect 1", imageUrl);

//         const fetchFileUrl = async () => {
//             try {
//                 console.log("fileName");
//                 console.log(fileName);

//                 //לקבלת ה-Presigned URL
//                 const res = await downloadFile({ fileName, userId })
//                 console.log("inshoeTemplte useEffect 2");
//                 console.log(res);

//                 setImageUrl(res); // הגדרת ה-URL לקבלת התמונה
//                 console.log(imageUrl);

//             } catch (error) {
//                 console.error('שגיאה בהבאת ה-URL:', error);
//                 alert(`שגיאה בהבאת ה-URL: ${error}`);
//             }
//         };

//         fetchFileUrl();
//     }, [fileName]); // מבצע את הקריאה כל פעם ששם הקובץ משתנה


//     return (
//         <div>

//             <Card sx={{ width: 350, boxShadow: 4, borderRadius: 3, overflow: 'hidden', position: 'relative' }}>
//                 {imageUrl ? (
//                     <>
//                         <CardMedia
//                             component="img"
//                             height="200"
//                             image={imageUrl}
//                             alt={fileName}
//                             sx={{ objectFit: 'contain', paddingTop: '25px' }}
//                         />
//                     </>
//                 ) : (
//                     <Typography variant="body1" align="center" sx={{ padding: 2 }}>טוען תבנית...</Typography>
//                 )}
//             </Card>


//         </div>
//     );
// };
// export default ShoeFile
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

    // const { id } = useParams<{ id: string }>()
    // const [warranty, setWarranty] = useState(mockWarranty)
    const [fileDialogOpen, setFileDialogOpen] = useState(false)


    const handleFileDialogOpen = () => {
        setFileDialogOpen(true)
    }

    const handleFileDialogClose = () => {
        setFileDialogOpen(false)
    }
    // const handleDownload = async (e: React.MouseEvent) => {
    //     e.stopPropagation(); // מונע פתיחת הדיאלוג אם נלחץ בתוך הכרטיסייה
    
    //     try {
    //         const response = await fetch(fileUrl);
    //         const blob = await response.blob();
    //         const url = window.URL.createObjectURL(blob);
    //         const a = document.createElement("a");
    
    //         a.href = url;
    //         a.download = fileName; // השם של הקובץ שיורד
    //         document.body.appendChild(a);
    //         a.click();
    
    //         window.URL.revokeObjectURL(url);
    //         document.body.removeChild(a);
    //     } catch (error) {
    //         console.error("שגיאה בהורדת הקובץ:", error);

    //     }
    // };
    
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
                onClick={(e) => {downloadFileToComputer(fileUrl||'',warranty.linkFile) }}
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
                        onClick={(e) => {downloadFileToComputer(fileUrl||'',warranty.linkFile) }}
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
