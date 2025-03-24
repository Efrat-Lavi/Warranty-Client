
// // import { useState } from "react";
// // import { Box, Button, Grid, TextField, MenuItem, Typography, Paper } from "@mui/material";
// // import { useDispatch, useSelector } from "react-redux";
// // import axios from "axios";
// // import { AddDispatch, StoreType } from "../redux/store";
// // import { addWarranty, getWarranties } from "../redux/warrantySlice";
// // import { Warranty } from "../models/warranties";
// // import { addRecord } from "../redux/recordSlice";
// // import { analyzeFile, downloadFile, extractWarrantyDetails, uploadFile } from "../services/fileServices";
// // import { useNavigate } from "react-router-dom";

// // const AddWarranty = () => {
// //     const dispatch = useDispatch<AddDispatch>();
// //     const { user, token } = useSelector((state: StoreType) => state.auth);
// //     const [file, setFile] = useState<File | null>(null);
// //     const [loading, setLoading] = useState(false);
// //     const navigate = useNavigate();
// //     const [formValues, setFormValues] = useState<Partial<Warranty>>({
// //         nameProduct: "",
// //         company: "",
// //         category: "",
// //         expirationDate: "",
// //         linkFile:""
// //     });

// //     const categories = ["Electronics", "Home Appliances", "Furniture", "Other"];

// //     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //         if (event.target.files && event.target.files[0]) {
// //             setFile(event.target.files[0]);
// //         }
// //     };

// //     const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
// //         event.preventDefault();
// //         if (event.dataTransfer.files && event.dataTransfer.files[0]) {
// //             setFile(event.dataTransfer.files[0]);
// //         }
// //     };

// //     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //         setFormValues({ ...formValues, [event.target.name]: event.target.value });
// //     };

// //     const handleFileUploadAndExtractData = async () => {
// //         if (!file || !user) return;
// //         setLoading(true);

// //         try {
// //             // שלב 1: קבלת URL חתום מהשרת
// //             const uploadUrl = await uploadFile({ fileName: `${user.id}/${file.name}`, contentType: file.type })
// //             console.log(uploadUrl);

// //             // שלב 2: העלאת הקובץ ל-S3
// //             await axios.put(uploadUrl, file, {
// //                 headers: { 'Content-Type': file.type },
// //             });

// //             // שלב 1: בקשת URL חתום מהשרת
// //             const downloadUrl = await downloadFile({ fileName:  `${user.id}/${file.name}`})
// //             console.log(downloadUrl);

// //             // שלב 3: שליחת ה-URL לשרת ה-AI
// //             const aiResponse = await analyzeFile(downloadUrl);
// //             console.log(aiResponse);
// //             console.log(file.type);
// //             const { product_name, company_name, expiration_date } = aiResponse;
// //             setFormValues({
// //                 nameProduct: product_name || "",
// //                 company: company_name || "",
// //                 category: "",
// //                 expirationDate: expiration_date||"",
// //                 linkFile:`${user.id}/${file.name}`
// //             });
// //         } catch (error) {
// //             console.error("שגיאה בהעלאת הקובץ או בקבלת נתונים מה-AI:", error);
// //             alert("התרחשה שגיאה במהלך התהליך.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleSubmit = async () => {
// //         if (user && token) {
// //             const res = await dispatch(addWarranty({ token, warranty: formValues })).unwrap();
// //             if (res) {
// //                 dispatch(addRecord({ token, record: { warrantyId: res.id, userId: user.id, roleWarranty: "OWNER" } }));
// //             }
// //         }
// //         navigate("/record");
// //     };

// //     return (
// //         <Box sx={{ p: 3, bgcolor: "#f9f9f9", borderRadius: 2 }}>
// //             <Grid container spacing={3}>
// //                 {/* אזור העלאת קובץ */}
// //                 <Grid item xs={12} md={6}>
// //                     <Paper
// //                         sx={{
// //                             p: 3,
// //                             textAlign: "center",
// //                             border: "2px dashed #888",
// //                             bgcolor: "#f0f0f0",
// //                             cursor: "pointer",
// //                         }}
// //                         onDrop={handleDrop}
// //                         onDragOver={(e) => e.preventDefault()}
// //                     >
// //                         <Typography variant="h6">
// //                             {file ? file.name : "גרור או בחר קובץ"}
// //                         </Typography>
// //                         <input type="file" onChange={handleFileChange} hidden id="file-upload" />
// //                         <Button
// //                             variant="contained"
// //                             color="primary"
// //                             sx={{ mt: 2 }}
// //                             onClick={() => document.getElementById("file-upload")?.click()}
// //                         >
// //                             בחר קובץ
// //                         </Button>
// //                         <Button
// //                             variant="contained"
// //                             color="secondary"
// //                             sx={{ mt: 2, ml: 2 }}
// //                             disabled={!file || loading}
// //                             onClick={handleFileUploadAndExtractData}
// //                         >
// //                             {loading ? "טוען..." : "העלה ומלא אוטומטית"}
// //                         </Button>
// //                     </Paper>
// //                 </Grid>

// //                 {/* שדות קלט */}
// //                 <Grid item xs={12} md={6}>
// //                     <TextField
// //                         label="שם המוצר"
// //                         name="nameProduct"
// //                         value={formValues.nameProduct}
// //                         onChange={handleInputChange}
// //                         fullWidth
// //                         margin="normal"
// //                         disabled={!file}
// //                     />
// //                     <TextField
// //                         label="שם החברה"
// //                         name="company"
// //                         value={formValues.company}
// //                         onChange={handleInputChange}
// //                         fullWidth
// //                         margin="normal"
// //                         disabled={!file}
// //                     />
// //                     <TextField
// //                         select
// //                         label="קטגוריה"
// //                         name="category"
// //                         value={formValues.category}
// //                         onChange={handleInputChange}
// //                         fullWidth
// //                         margin="normal"
// //                         disabled={!file}
// //                     >
// //                         {categories.map((option) => (
// //                             <MenuItem key={option} value={option}>
// //                                 {option}
// //                             </MenuItem>
// //                         ))}
// //                     </TextField>
// //                     <TextField
// //                         label="תאריך פקיעת האחריות"
// //                         name="expirationDate"
// //                         type="date"
// //                         InputLabelProps={{ shrink: true }}
// //                         value={formValues.expirationDate}
// //                         onChange={handleInputChange}
// //                         fullWidth
// //                         margin="normal"
// //                         disabled={!file}
// //                     />

// //                     <Button
// //                         variant="contained"
// //                         color="primary"
// //                         fullWidth
// //                         sx={{ mt: 2 }}
// //                         disabled={!file}
// //                         onClick={handleSubmit}
// //                     >
// //                         שמור שינויים
// //                     </Button>
// //                 </Grid>
// //             </Grid>
// //         </Box>
// //     );
// // };

// // export default AddWarranty;
// import { useState } from "react";
// import { Box, Button, Grid, TextField, MenuItem, Typography, Paper, CircularProgress } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { AddDispatch, StoreType } from "../redux/store";
// import { addWarranty, getWarranties } from "../redux/warrantySlice";
// import { Warranty } from "../models/warranties";
// import { addRecord } from "../redux/recordSlice";
// import { analyzeFile, downloadFile, extractWarrantyDetails, uploadFile } from "../services/fileServices";
// import { useNavigate } from "react-router-dom";

// const AddWarranty = () => {
//     const dispatch = useDispatch<AddDispatch>();
//     const { user, token } = useSelector((state: StoreType) => state.auth);
//     const [file, setFile] = useState<File | null>(null);
//     const [disabled,setDisabled]= useState(false);
//     const [loading, setLoading] = useState(false);
//     const [formValues, setFormValues] = useState<Partial<Warranty>>({
//         nameProduct: "",
//         company: "",
//         category: "",
//         expirationDate: "",
//         linkFile: ""
//     });
//     const navigate = useNavigate();

//     const categories = ["Electronics", "Home Appliances", "Furniture", "Other"];

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             setFile(event.target.files[0]);
//         }
//     };

//     const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//         event.preventDefault();
//         if (event.dataTransfer.files && event.dataTransfer.files[0]) {
//             setFile(event.dataTransfer.files[0]);
//         }
//     };

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setFormValues({ ...formValues, [event.target.name]: event.target.value });
//     };

//     const handleFileUploadAndExtractData = async () => {
//         if (!file || !user) return;
//         setLoading(true);

//         try {
//             // Step 1: Get signed URL from the server
//             const uploadUrl = await uploadFile({ fileName: `${user.id}/${file.name}`, contentType: file.type });

//             // Step 2: Upload the file to S3
//             await axios.put(uploadUrl, file, {
//                 headers: { 'Content-Type': file.type },
//             });

//             // Step 3: Get download URL from the server
//             const downloadUrl = await downloadFile({ fileName: `${user.id}/${file.name}` });

//             // Step 4: Send the download URL to the AI server
//             const aiResponse = await analyzeFile(downloadUrl);
//             const { product_name, company_name, expiration_date } = aiResponse;

//             setFormValues({
//                 nameProduct: product_name || "",
//                 company: company_name || "",
//                 category: "",
//                 expirationDate: expiration_date || "",
//                 linkFile: `${user.id}/${file.name}`
//             });
//             setDisabled(true);
//         } catch (error) {
//             console.error("Error uploading file or receiving AI data:", error);
//             alert("An error occurred during the process.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleSubmit = async () => {
//         if (user && token) {
//             const res = await dispatch(addWarranty({ token, warranty: formValues })).unwrap();
//             if (res) {
//                 dispatch(addRecord({ token, record: { warrantyId: res.id, userId: user.id, roleWarranty: "OWNER" } }));
//             }
//         }
//         navigate("/record");
//     };

//     return (
//         <Box sx={{ p: 3, bgcolor: "#f9fafb", borderRadius: 2 }}>
//             <Grid container spacing={3}>
//                 {/* File upload area */}
//                 <Grid item xs={12} md={6}>
//                     <Paper
//                         sx={{
//                             p: 3,
//                             textAlign: "center",
//                             border: "2px dashed #10a37f", // OpenAI green
//                             bgcolor: "#f0f0f0",
//                             cursor: "pointer",
//                         }}
//                         onDrop={handleDrop}
//                         onDragOver={(e) => e.preventDefault()}
//                     >
//                         <Typography variant="h6">
//                             {file ? file.name : "Drag or select a file"}
//                         </Typography>
//                         <input type="file" onChange={handleFileChange} hidden id="file-upload" />
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             sx={{ mt: 2 }}
//                             onClick={() => document.getElementById("file-upload")?.click()}
//                         >
//                             Select File
//                         </Button>
//                         <Button
//                             variant="contained"
//                             color="secondary"
//                             sx={{ mt: 2, ml: 2 }}
//                             disabled={!file || loading}
//                             onClick={handleFileUploadAndExtractData}
//                         >
//                             {loading ? "Loading..." : "Upload and Auto-fill"}
//                         </Button>
//                     </Paper>
//                 </Grid>

//                 {/* Input fields */}
//                 <Grid item xs={12} md={6}>
//                     <TextField
//                         label="Product Name"
//                         name="nameProduct"
//                         value={formValues.nameProduct}
//                         onChange={handleInputChange}
//                         fullWidth
//                         margin="normal"
//                         disabled={!disabled}
//                     />
//                     <TextField
//                         label="Company Name"
//                         name="company"
//                         value={formValues.company}
//                         onChange={handleInputChange}
//                         fullWidth
//                         margin="normal"
//                         disabled={!disabled}
//                     />
//                     <TextField
//                         select
//                         label="Category"
//                         name="category"
//                         value={formValues.category}
//                         onChange={handleInputChange}
//                         fullWidth
//                         margin="normal"
//                         disabled={!disabled}
//                     >
//                         {categories.map((option) => (
//                             <MenuItem key={option} value={option}>
//                                 {option}
//                             </MenuItem>
//                         ))}
//                     </TextField>
//                     <TextField
//                         label="Expiration Date"
//                         name="expirationDate"
//                         type="date"
//                         InputLabelProps={{ shrink: true }}
//                         value={formValues.expirationDate}
//                         onChange={handleInputChange}
//                         fullWidth
//                         margin="normal"
//                         disabled={!disabled}
//                     />

//                     <Button
//                         variant="contained"
//                         color="primary"
//                         fullWidth
//                         sx={{ mt: 2 }}
//                         disabled={loading || !file}
//                         onClick={handleSubmit}
//                     >
//                         Save Changes
//                     </Button>
//                 </Grid>
//             </Grid>

//             {/* Loading spinner */}
//             {loading && (
//                 <Box sx={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", textAlign: "center" }}>
//                     <CircularProgress />
//                     <Typography sx={{ mt: 2 }}>Please wait...</Typography>
//                 </Box>
//             )}
//         </Box>
//     );
// };

// export default AddWarranty;
import { useState } from "react";
import { Box, Button, Grid, TextField, MenuItem, Typography, Paper, IconButton, CircularProgress } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AddDispatch, StoreType } from "../redux/store";
import { addWarranty, getWarranties } from "../redux/warrantySlice";
import { Warranty } from "../models/warranties";
import { addRecord } from "../redux/recordSlice";
import { analyzeFile, downloadFile, uploadFile } from "../services/fileServices";
import { useNavigate } from "react-router-dom";

const AddWarranty = () => {
    const dispatch = useDispatch<AddDispatch>();
    const { user, token } = useSelector((state: StoreType) => state.auth);
    const [file, setFile] = useState<File | null>(null);
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState<Partial<Warranty>>({
        nameProduct: "",
        company: "",
        category: "",
        expirationDate: "",
        linkFile: ""
    });
    const navigate = useNavigate();

    const categories = ["Electronics", "Home Appliances", "Furniture", "Other"];

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            setFile(event.dataTransfer.files[0]);
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        setFormValues({
            nameProduct: "",
            company: "",
            category: "",
            expirationDate: "",
            linkFile: ""
        });
        setDisabled(false);
    };

    const handleFileUploadAndExtractData = async () => {
        if (!file || !user) return;
        setLoading(true);

        try {
            const uploadUrl = await uploadFile({ fileName: `${user.id}/${file.name}`, contentType: file.type });
            await axios.put(uploadUrl, file, { headers: { 'Content-Type': file.type } });

            const downloadUrl = await downloadFile({ fileName: `${user.id}/${file.name}` });
            const aiResponse = await analyzeFile(downloadUrl);

            setFormValues({
                nameProduct: aiResponse.product_name || "",
                company: aiResponse.company_name || "",
                category: "",
                expirationDate: aiResponse.expiration_date || "",
                linkFile: `${user.id}/${file.name}`
            });
            setDisabled(true);
        } catch (error) {
            console.error("Error uploading file or extracting data:", error);
            alert("An error occurred during the process.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (user && token) {
            const res = await dispatch(addWarranty({ token, warranty: formValues })).unwrap();
            if (res) {
                dispatch(addRecord({ token, record: { warrantyId: res.id, userId: user.id, roleWarranty: "OWNER" } }));
            }
        }
        navigate("/record");
    };

    return (
        <Box sx={{ p: 3, bgcolor: "#f9fafb", borderRadius: 2 }}>
            {/* אזור העלאת הקובץ */}
            <Paper
                sx={{
                    p: 3,
                    textAlign: "center",
                    border: "2px dashed #10a37f",
                    bgcolor: "#f0f0f0",
                    cursor: "pointer",
                    mb: 2
                }}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
            >
                {!file ? (
                    <>
                        <Typography variant="h6">Drag or select a file</Typography>
                        <input type="file" onChange={handleFileChange} hidden id="file-upload" />
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => document.getElementById("file-upload")?.click()}>
                            Select File
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography variant="h6">{file.name} <IconButton color="error" onClick={handleRemoveFile} sx={{ ml: 2 }}>
                                <DeleteIcon />
                            </IconButton></Typography>
                          
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                disabled={loading}
                                onClick={handleFileUploadAndExtractData}
                            >
                                {loading ? <CircularProgress size={24} /> : "Upload and Auto-fill"}
                            </Button>
                         
                        </Box>
                    </>
                )}
            </Paper>

            {/* טופס הקלט */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Product Name"
                        name="nameProduct"
                        value={formValues.nameProduct}
                        onChange={(e) => setFormValues({ ...formValues, nameProduct: e.target.value })}
                        fullWidth
                        margin="normal"
                        disabled={!disabled}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Company Name"
                        name="company"
                        value={formValues.company}
                        onChange={(e) => setFormValues({ ...formValues, company: e.target.value })}
                        fullWidth
                        margin="normal"
                        disabled={!disabled}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        select
                        label="Category"
                        name="category"
                        value={formValues.category}
                        onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
                        fullWidth
                        margin="normal"
                        disabled={!disabled}
                    >
                        {categories.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Expiration Date"
                        name="expirationDate"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={formValues.expirationDate}
                        onChange={(e) => setFormValues({ ...formValues, expirationDate: e.target.value })}
                        fullWidth
                        margin="normal"
                        disabled={!disabled}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={!file || loading}
                        onClick={handleSubmit}
                    >
                        Save Changes
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddWarranty;
