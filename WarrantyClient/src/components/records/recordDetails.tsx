// import type React from "react"

// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { useSelector, useDispatch } from "react-redux"
// import type { AddDispatch, StoreType } from "../../redux/store"
// import {
//     Box, Typography, Paper, Chip, Button, Dialog, DialogContent, IconButton, Divider, Menu, MenuItem, ListItemIcon, ListItemText, Skeleton, Alert,
// } from "@mui/material"
// import {
//     Calendar, Building, Tag, FileText, Download, Share2, ArrowLeft, MoreHorizontal, Users, Edit, Trash2, ExternalLink,
//     ShareIcon,
// } from "lucide-react"
// import { downloadFile } from "../../services/fileServices"
// import { Record } from "../../models/record"
// import ShoeFile from "../showFile"
// import SharedDialog from "../sharedDialog"
// import { getRecords } from "../../redux/recordSlice"


// const WarrantyDetails = () => {
//     const { id } = useParams<{ id: string }>()
//     const navigate = useNavigate()
//     const dispatch = useDispatch<AddDispatch>()


//     const { token } = useSelector((state: StoreType) => state.auth)
//     const { records, loading, error } = useSelector((state: StoreType) => state.records)
//     const [record, setRecord] = useState<Record>()
//     const [fileDialogOpen, setFileDialogOpen] = useState(false)
//     const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)

//     useEffect(() => {

//         if (id && token) {
//             console.log(records);

//             // Fetch the specific record if not already in state
//             if (!records.find((r) => r.id === +id) && token) {
//                 dispatch(getRecords({ token, userId: +id }))

//             } else {
//                 setRecord(records.find((r) => r.id === +id))
//             }
//         }

//     }, [])

//     useEffect(() => {
//         if (records.length > 0 && id) {
//             const foundRecord = records.find((r) => r.id === +id)
//             if (foundRecord) {
//                 setRecord(foundRecord)
//             }
//         }
//         console.log(record);
//         console.log(record?.roleWarranty);

//     }, [records, id])

//     const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
//         setMenuAnchorEl(event.currentTarget)
//     }
//     const getUrl = async () => {
//         if (record)
//             return await downloadFile({ fileName: record.warranty.linkFile })
//     }
//     const handleMenuClose = () => {
//         setMenuAnchorEl(null)
//     }

//     const handleFileOpen = () => {
//         setFileDialogOpen(true)
//     }

//     const handleFileClose = () => {
//         setFileDialogOpen(false)
//     }

//     const handleDownload = () => {
//         // Implement download functionality
//         if (record?.warranty.linkFile) {
//             window.open(record.warranty.linkFile, "_blank")
//         }
//     }

//     const handleShare = () => {
//         // Implement share functionality
//         handleMenuClose()
//         // This would open a sharing dialog in a real implementation
//         alert("Share functionality would open here")
//     }

//     const handleEdit = () => {
//         // Implement edit functionality
//         handleMenuClose()
//         navigate(`/warranty/edit/${id}`)
//     }

//     const handleDelete = () => {
//         // Implement delete functionality
//         handleMenuClose()
//         if (confirm("Are you sure you want to delete this warranty record?")) {
//             // Dispatch delete action
//             navigate("/dashboard")
//         }
//     }

//     const isExpired = (date: string) => {
//         return new Date(date) < new Date()
//     }

//     if (loading) {
//         return (
//             <Box className="max-w-3xl mx-auto p-6">
//                 <Box className="flex items-center mb-6">
//                     <IconButton onClick={() => navigate(-1)} className="mr-2">
//                         <ArrowLeft size={20} />
//                     </IconButton>
//                     <Skeleton variant="text" width={200} height={40} />
//                 </Box>
//                 <Paper className="p-6 rounded-lg shadow-sm">
//                     <Skeleton variant="text" width="70%" height={40} />
//                     <Skeleton variant="text" width="50%" height={30} className="mt-4" />
//                     <Skeleton variant="text" width="40%" height={30} className="mt-2" />
//                     <Skeleton variant="text" width="60%" height={30} className="mt-2" />
//                     <Skeleton variant="rectangular" width="100%" height={200} className="mt-6" />
//                 </Paper>
//             </Box>
//         )
//     }

//     if (error) {
//         return (
//             <Box className="max-w-3xl mx-auto p-6">
//                 <IconButton onClick={() => navigate(-1)} className="mb-4">
//                     <ArrowLeft size={20} />
//                 </IconButton>
//                 <Alert severity="error">Error loading warranty details: {error}</Alert>
//             </Box>
//         )
//     }

//     if (!record) {
//         return (
//             <Box className="max-w-3xl mx-auto p-6">
//                 <IconButton onClick={() => navigate(-1)} className="mb-4">
//                     <ArrowLeft size={20} />
//                 </IconButton>
//                 <Alert severity="info">Warranty record not found.</Alert>
//             </Box>
//         )
//     }

//     const expired = isExpired(record.warranty.expirationDate)

//     return (
//         <>
//             <Box className="max-w-3xl mx-auto p-6">
//                 <Box className="flex items-center justify-between mb-6">
//                     <Box className="flex items-center">
//                         <IconButton onClick={() => navigate(-1)} className="mr-2">
//                             <ArrowLeft size={20} />
//                         </IconButton>
//                         <Typography variant="h5" className="font-medium">
//                             Warranty Details
//                         </Typography>
//                     </Box>

//                     <IconButton onClick={handleMenuOpen}>
//                         <MoreHorizontal size={20} />
//                     </IconButton>

//                     <Menu
//                         anchorEl={menuAnchorEl}
//                         open={Boolean(menuAnchorEl)}
//                         onClose={handleMenuClose}
//                         PaperProps={{
//                             elevation: 0,
//                             sx: {
//                                 overflow: "visible",
//                                 filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.1))",
//                                 mt: 1.5,
//                                 borderRadius: 1,
//                                 width: 200,
//                                 "& .MuiMenuItem-root": {
//                                     px: 2,
//                                     py: 1.5,
//                                 },
//                             },
//                         }}
//                     >
//                         {record.roleWarranty === "OWNER" && (
//                             <MenuItem onClick={handleShare}>
//                                 <ListItemIcon>
//                                     <Share2 size={18} />
//                                 </ListItemIcon>
//                                 <ListItemText>Share</ListItemText>
//                             </MenuItem>
//                         )}

//                         {(record.roleWarranty === "OWNER" || record.roleWarranty === "EDITOR") && (
//                             <MenuItem onClick={handleEdit}>
//                                 <ListItemIcon>
//                                     <Edit size={18} />
//                                 </ListItemIcon>
//                                 <ListItemText>Edit</ListItemText>
//                             </MenuItem>
//                         )}

//                         {record.roleWarranty === "OWNER" && (
//                             <MenuItem onClick={handleDelete}>
//                                 <ListItemIcon>
//                                     <Trash2 size={18} className="text-red-500" />
//                                 </ListItemIcon>
//                                 <ListItemText className="text-red-500">Delete</ListItemText>
//                             </MenuItem>
//                         )}
//                     </Menu>
//                 </Box>
//                 <ShoeFile warranty={record.warranty} fileName={record.warranty.linkFile}></ShoeFile>

//                 <Paper className="p-6 rounded-lg shadow-sm border border-gray-100">
//                     <Box className="flex justify-between items-start mb-4">
//                         <Typography variant="h4" className="font-medium text-gray-900">
//                             {record.warranty.nameProduct}
//                         </Typography>

//                         <Box className="flex items-center space-x-2">
//                             <Chip
//                                 label={expired ? "Expired" : "Valid"}
//                                 size="small"
//                                 color={expired ? "error" : "success"}
//                                 sx={{
//                                     fontWeight: 500,
//                                     backgroundColor: expired ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)",
//                                     color: expired ? "rgb(220, 38, 38)" : "rgb(22, 163, 74)",
//                                     borderRadius: "4px",
//                                 }}
//                             />

//                             <Chip
//                                 label={record.roleWarranty}
//                                 size="small"
//                                 sx={{
//                                     fontWeight: 500,
//                                     backgroundColor: "rgba(59, 130, 246, 0.1)",
//                                     color: "rgb(37, 99, 235)",
//                                     borderRadius: "4px",
//                                 }}
//                             />
//                         </Box>
//                     </Box>

//                     <Box className="space-y-3 mb-6">
//                         <Box className="flex items-center text-gray-600">
//                             <Building size={18} className="mr-2" />
//                             <Typography variant="body1">
//                                 <span className="font-medium">Company:</span> {record.warranty.company}
//                             </Typography>
//                         </Box>

//                         <Box className="flex items-center text-gray-600">
//                             <Calendar size={18} className="mr-2" />
//                             <Typography variant="body1">
//                                 <span className="font-medium">Expiration Date:</span>{" "}
//                                 {new Date(record.warranty.expirationDate).toLocaleDateString()}
//                             </Typography>
//                         </Box>

//                         {record.warranty.category && (
//                             <Box className="flex items-center text-gray-600">
//                                 <Tag size={18} className="mr-2" />
//                                 <Typography variant="body1">
//                                     <span className="font-medium">Category:</span> {record.warranty.category}
//                                 </Typography>
//                             </Box>
//                         )}
//                     </Box>

//                     <Divider className="my-6" />

//                     <Box>
//                         <Typography variant="h6" className="mb-4 font-medium">
//                             Warranty Document
//                         </Typography>

//                         <Paper
//                             onClick={handleFileOpen}
//                             className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between"
//                         >
//                             <Box className="flex items-center">
//                                 <FileText size={24} className="mr-3 text-blue-500" />
//                                 <Typography>{record.warranty.nameProduct} Warranty</Typography>
//                             </Box>

//                             <IconButton
//                                 onClick={(e) => {
//                                     e.stopPropagation()
//                                     handleDownload()
//                                 }}
//                             >
//                                 <Download size={18} />
//                             </IconButton>
//                         </Paper>
//                     </Box>

                  
//                     {record.roleWarranty === "OWNER" && (
//                         <Paper
//                             elevation={0}
//                             sx={{
//                                 p: 3,
//                                 borderRadius: 2,
//                                 border: "1px solid rgba(0, 0, 0, 0.08)",
//                                 mb: 3,
//                             }}
//                         >
//                             <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
//                                 Sharing
//                             </Typography>

//                             <SharedDialog record={record}></SharedDialog>
//                             {record.warranty.records && record.warranty.records.length > 0 && (
//                                 <Box sx={{ mt: 3 }}>
//                                     <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                                         Shared with:
//                                     </Typography>

//                                     {record.warranty.records.map((record) => (
//                                         <Box
//                                             key={record.user.id}
//                                             sx={{
//                                                 display: "flex",
//                                                 alignItems: "center",
//                                                 justifyContent: "space-between",
//                                                 py: 1.5,
//                                                 borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
//                                                 "&:last-child": {
//                                                     borderBottom: "none",
//                                                 },
//                                             }}
//                                         >
//                                             <Box sx={{ display: "flex", alignItems: "center" }}>
//                                                 <Box
//                                                     sx={{
//                                                         width: 32,
//                                                         height: 32,
//                                                         borderRadius: "50%",
//                                                         backgroundColor: "primary.main",
//                                                         display: "flex",
//                                                         alignItems: "center",
//                                                         justifyContent: "center",
//                                                         mr: 2,
//                                                         color: "white",
//                                                         fontSize: "0.875rem",
//                                                         fontWeight: 600,
//                                                     }}
//                                                 >
//                                                     {record.user.nameUser.charAt(0)}
//                                                 </Box>
//                                                 <Box>
//                                                     <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                                                         {record.user.nameUser}
//                                                     </Typography>
//                                                     <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
//                                                         {record.user.email}
//                                                     </Typography>
//                                                 </Box>
//                                             </Box>
//                                             <Chip
//                                                 label={record.roleWarranty}
//                                                 size="small"
//                                                 sx={{
//                                                     fontWeight: 500,
//                                                     backgroundColor: "rgba(0, 0, 0, 0.04)",
//                                                     color: "text.primary",
//                                                 }}
//                                             />
//                                         </Box>
//                                     ))}
//                                 </Box>
//                             )}
//                         </Paper>
//                     )}

//                     {expired && (
//                         <>
//                             <Divider className="my-6" />

//                             <Box className="bg-blue-50 p-4 rounded-lg">
//                                 <Typography variant="h6" className="font-medium text-blue-700 mb-2">
//                                     Warranty has expired
//                                 </Typography>

//                                 <Typography variant="body2" className="text-blue-600 mb-3">
//                                     Your warranty for this product has expired. Consider the following options:
//                                 </Typography>

//                                 <Box className="flex gap-3">
//                                     <Button
//                                         variant="outlined"
//                                         size="small"
//                                         startIcon={<ExternalLink size={16} />}
//                                         className="text-blue-700 border-blue-300 hover:bg-blue-100"
//                                     >
//                                         Contact Support
//                                     </Button>

//                                     <Button
//                                         variant="outlined"
//                                         size="small"
//                                         startIcon={<Building size={16} />}
//                                         className="text-blue-700 border-blue-300 hover:bg-blue-100"
//                                     >
//                                         Visit {record.warranty.company}
//                                     </Button>
//                                 </Box>
//                             </Box>
//                         </>
//                     )}
//                 </Paper>

             
//             </Box>


//         </>
//     )
// }

// export default WarrantyDetails

