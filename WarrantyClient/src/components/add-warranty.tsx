// import type React from "react"
// import { useState } from "react"
// import {
//   Box,
//   Button,
//   Grid,
//   TextField,
//   MenuItem,
//   Typography,
//   Paper,
//   IconButton,
//   CircularProgress,
//   alpha,
//   Divider,
//   Fade,
//   useTheme,
// } from "@mui/material"
// import {
//   FileText,
//   Upload,
//   X,
//   FileUp,
//   Save,
//   CheckCircle,
//   AlertTriangle,
//   Package,
//   Building,
//   Tag,
//   Calendar,
// } from "lucide-react"
// import { useDispatch, useSelector } from "react-redux"
// import axios from "axios"
// import type { AddDispatch, StoreType } from "../redux/store"
// import { addWarranty } from "../redux/warrantySlice"
// import type { Warranty } from "../models/warranties"
// import { addRecord } from "../redux/recordSlice"
// import { analyzeFile, downloadFile, uploadFile } from "../services/fileServices"
// import { useNavigate } from "react-router-dom"
// import { motion } from "framer-motion"

// const MotionPaper = motion(Paper)
// const MotionBox = motion(Box)

// const AddWarranty = () => {
//   const dispatch = useDispatch<AddDispatch>()
//   const { user, token } = useSelector((state: StoreType) => state.auth)
//   const [file, setFile] = useState<File | null>(null)
//   const [disabled, setDisabled] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [saving, setSaving] = useState(false)
//   const [analyzing, setAnalyzing] = useState(false)
//   const [formValues, setFormValues] = useState<Partial<Warranty>>({
//     nameProduct: "",
//     company: "",
//     category: "",
//     expirationDate: "",
//     linkFile: "",
//   })
//   const [error, setError] = useState<string | null>(null)
//   const [success, setSuccess] = useState<string | null>(null)
//   const [dragActive, setDragActive] = useState(false)
//   const navigate = useNavigate()
//   const theme = useTheme()

//   const categories = ["Electronics", "Home Appliances", "Furniture", "Automotive", "Clothing", "Other"]

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setFile(event.target.files[0])
//       setError(null)
//     }
//   }

//   const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault()
//     setDragActive(true)
//   }

//   const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault()
//     setDragActive(false)
//   }

//   const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault()
//     setDragActive(false)
//     if (event.dataTransfer.files && event.dataTransfer.files[0]) {
//       setFile(event.dataTransfer.files[0])
//       setError(null)
//     }
//   }

//   const handleRemoveFile = () => {
//     setFile(null)
//     setFormValues({
//       nameProduct: "",
//       company: "",
//       category: "",
//       expirationDate: "",
//       linkFile: "",
//     })
//     setDisabled(false)
//     setError(null)
//     setSuccess(null)
//   }

//   const handleFileUploadAndExtractData = async () => {
//     if (!file || !user) return
//     setLoading(true)
//     setAnalyzing(true)
//     setError(null)
//     setSuccess(null)

//     try {
//       const uploadUrl = await uploadFile({ fileName: `${user.id}/${file.name}`, contentType: file.type })
//       await axios.put(uploadUrl, file, { headers: { "Content-Type": file.type } })

//       const downloadUrl = await downloadFile({ fileName: `${user.id}/${file.name}` })
//       const aiResponse = await analyzeFile(downloadUrl)

//       if (aiResponse.status === 200) {
        
//         const response = aiResponse.data

//         setFormValues({
//           nameProduct: response.product_name || "",
//           company: response.company_name || "",
//           category: "",
//           expirationDate: response.expiration_date || "",
//           linkFile: `${user.id}/${file.name}`,
//         })
//         setDisabled(true)
//         setSuccess("Document analyzed successfully! Please review and complete the form.")
//       } else {
//         setError(aiResponse.data.message || "An unknown error occurred.")
//       }
//     } catch (error: any) {
//       console.error("Error:", error)
//       setError(error.response?.data?.error || "There was an error processing your file.")
//     } finally {
//       setLoading(false)
//       setAnalyzing(false)
//     }
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormValues({ ...formValues, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async () => {
//     if (!formValues.nameProduct || !formValues.expirationDate) {
//       setError("Please fill in all required fields.")
//       return
//     }

//     setSaving(true)
//     try {
//       if (user && token) {
//         const res = await dispatch(addWarranty({ token, warranty: formValues })).unwrap()
//         if (res) {
//           await dispatch(addRecord({ token, record: { warrantyId: res.id, userId: user.id, roleWarranty: "OWNER",emailOwner:user.email } }))
//           navigate("/record")
//         }
//       }
//     } catch (error: any) {
//       setError("Failed to save warranty. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <MotionPaper
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       elevation={0}
//       sx={{
//         p: 0,
//         maxWidth: 1000,
//         mx: "auto",
//         borderRadius: 3,
//         overflow: "hidden",
//         border: "1px solid",
//         borderColor: "divider",
//       }}
//     >
//       {/* Header */}
//       <Box
//         sx={{
//           p: 3,
//           bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
//           borderBottom: "1px solid",
//           borderColor: "divider",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <FileText size={24} color={theme.palette.primary.main} />
//           <Typography variant="h5" sx={{ fontWeight: 600 }}>
//             Add New Warranty
//           </Typography>
//         </Box>
//       </Box>

//       {/* Success/Error Messages */}
//       {success && (
//         <Fade in={Boolean(success)}>
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
//               color: "success.main",
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <CheckCircle size={18} />
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>
//               {success}
//             </Typography>
//           </Box>
//         </Fade>
//       )}

//       {error && (
//         <Fade in={Boolean(error)}>
//           <Box
//             sx={{
//               p: 2,
//               bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
//               color: "error.main",
//               display: "flex",
//               alignItems: "center",
//               gap: 1,
//             }}
//           >
//             <AlertTriangle size={18} />
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>
//               {error}
//             </Typography>
//           </Box>
//         </Fade>
//       )}

//       {/* Content */}
//       <Box sx={{ p: 3 }}>
//         <Grid container spacing={3}>
//           {/* Form Fields - Left Side */}
//           <Grid item xs={12} md={6}>
//             <Typography
//               variant="h6"
//               sx={{
//                 mb: 3,
//                 fontWeight: 600,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//               }}
//             >
//               <Package size={20} />
//               Warranty Details
//             </Typography>

//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
//               >
//                 <Package size={16} />
//                 Product Name*
//               </Typography>
//               <TextField
//                 name="nameProduct"
//                 value={formValues.nameProduct}
//                 onChange={handleInputChange}
//                 fullWidth
//                 placeholder="Enter product name"
//                 disabled={!disabled && !file}
//                 variant="outlined"
//                 size="small"
//                 required
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               />
//             </Box>

//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
//               >
//                 <Building size={16} />
//                 Company Name
//               </Typography>
//               <TextField
//                 name="company"
//                 value={formValues.company}
//                 onChange={handleInputChange}
//                 fullWidth
//                 placeholder="Enter company name"
//                 disabled={!disabled && !file}
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               />
//             </Box>

//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
//               >
//                 <Tag size={16} />
//                 Category
//               </Typography>
//               <TextField
//                 select
//                 name="category"
//                 value={formValues.category}
//                 onChange={handleInputChange}
//                 fullWidth
//                 placeholder="Select category"
//                 disabled={!disabled && !file}
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               >
//                 {categories.map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Box>

//             <Box sx={{ mb: 3 }}>
//               <Typography
//                 variant="body2"
//                 color="text.secondary"
//                 sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
//               >
//                 <Calendar size={16} />
//                 Expiration Date*
//               </Typography>
//               <TextField
//                 name="expirationDate"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 value={formValues.expirationDate}
//                 onChange={handleInputChange}
//                 fullWidth
//                 required
//                 disabled={!disabled && !file}
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     borderRadius: 2,
//                   },
//                 }}
//               />
//             </Box>
//           </Grid>

//           {/* File Upload - Right Side */}
//           <Grid item xs={12} md={6}>
//             <Typography
//               variant="h6"
//               sx={{
//                 mb: 3,
//                 fontWeight: 600,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 1,
//               }}
//             >
//               <Upload size={20} />
//               Warranty Document
//             </Typography>

//             <MotionBox
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.3, delay: 0.2 }}
//               sx={{
//                 height: "100%",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//               }}
//             >
//               <Box
//                 sx={{
//                   p: 3,
//                   textAlign: "center",
//                   border: "2px dashed",
//                   borderColor: dragActive ? "primary.main" : (theme) => alpha(theme.palette.primary.main, 0.3),
//                   borderRadius: 3,
//                   bgcolor: dragActive
//                     ? (theme) => alpha(theme.palette.primary.main, 0.05)
//                     : (theme) => alpha(theme.palette.background.default, 0.7),
//                   cursor: "pointer",
//                   transition: "all 0.2s ease",
//                   mb: 2,
//                   minHeight: 200,
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center",
//                 }}
//                 onDrop={handleDrop}
//                 onDragOver={(e) => e.preventDefault()}
//                 onDragEnter={handleDragEnter}
//                 onDragLeave={handleDragLeave}
//                 onClick={() => document.getElementById("file-upload")?.click()}
//               >
//                 {!file ? (
//                   <>
//                     <FileUp size={48} color={theme.palette.primary.main} style={{ opacity: 0.7, marginBottom: 16 }} />
//                     <Typography variant="h6" sx={{ mb: 1 }}>
//                       Drag & Drop Warranty Document
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//                       or click to browse files
//                     </Typography>
//                     <input
//                       type="file"
//                       onChange={handleFileChange}
//                       hidden
//                       id="file-upload"
//                       accept=".pdf,.jpg,.jpeg,.png"
//                     />
//                     <Button
//                       variant="outlined"
//                       color="primary"
//                       sx={{
//                         mt: 1,
//                         borderRadius: 2,
//                         textTransform: "none",
//                         fontWeight: 500,
//                       }}
//                     >
//                       Select File
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-between",
//                         width: "100%",
//                         p: 2,
//                         bgcolor: (theme) => alpha(theme.palette.background.default, 0.7),
//                         borderRadius: 2,
//                         border: "1px solid",
//                         borderColor: "divider",
//                       }}
//                     >
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                         <FileText size={24} color={theme.palette.primary.main} />
//                         <Typography
//                           variant="body1"
//                           sx={{
//                             fontWeight: 500,
//                             maxWidth: "200px",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                             whiteSpace: "nowrap",
//                           }}
//                         >
//                           {file.name}
//                         </Typography>
//                       </Box>
//                       <IconButton
//                       disabled={loading || analyzing||saving}
//                         color="error"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleRemoveFile()
//                         }}
//                         sx={{
//                           width: 36,
//                           height: 36,
//                           "&:hover": {
//                             bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
//                           },
//                         }}
//                       >
//                         <X size={18} />
//                       </IconButton>
//                     </Box>

//                     <Button
//                       variant="contained"
//                       color="primary"
//                       disabled={loading || analyzing}
//                       onClick={(e) => {
//                         e.stopPropagation()
//                         handleFileUploadAndExtractData()
//                       }}
//                       sx={{
//                         mt: 3,
//                         borderRadius: 2,
//                         textTransform: "none",
//                         fontWeight: 500,
//                         px: 3,
//                       }}
//                     >
//                       {analyzing ? (
//                         <>
//                           <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
//                           Analyzing Document...
//                         </>
//                       ) : (
//                         "Analyze Document"
//                       )}
//                     </Button>
//                   </>
//                 )}
//               </Box>

//               {file && (
//                 <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 1 }}>
//                   Our AI will analyze your document and extract warranty details automatically
//                 </Typography>
//               )}
//             </MotionBox>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         {/* Submit Button */}
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <Button
//             variant="outlined"
//             color="inherit"
//             onClick={() => navigate("/record")}
//             sx={{
//               mr: 2,
//               borderRadius: 2,
//               textTransform: "none",
//               fontWeight: 500,
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             color="primary"
//             disabled={!success ||!file || loading || saving || !formValues.nameProduct || !formValues.expirationDate}
//             onClick={handleSubmit}
//             startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Save size={18} />}
//             sx={{
//               borderRadius: 2,
//               textTransform: "none",
//               fontWeight: 500,
//               px: 3,
//             }}
//           >
//             {saving ? "Saving..." : "Save Warranty"}
//           </Button>
//         </Box>
//       </Box>
//     </MotionPaper>
//   )
// }

// export default AddWarranty

"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
  alpha,
  Divider,
  Fade,
  useTheme,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material"
import {
  FileText,
  Upload,
  X,
  FileUp,
  Save,
  CheckCircle,
  AlertTriangle,
  Package,
  Building,
  Tag,
  Calendar,
  Edit,
  Check,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import type { AddDispatch, StoreType } from "../redux/store"
import { addWarranty } from "../redux/warrantySlice"
import type { Warranty } from "../models/warranties"
import { addRecord } from "../redux/recordSlice"
import { analyzeFile, downloadFile, uploadFile } from "../services/fileServices"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const MotionPaper = motion(Paper)
const MotionBox = motion(Box)

const AddWarranty = () => {
  const dispatch = useDispatch<AddDispatch>()
  const { user, token } = useSelector((state: StoreType) => state.auth)
  const [activeStep, setActiveStep] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [formValues, setFormValues] = useState<Partial<Warranty>>({
    nameProduct: "",
    company: "",
    category: "",
    expirationDate: "",
    linkFile: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const navigate = useNavigate()
  const theme = useTheme()

  const categories = ["Electronics", "Home Appliances", "Furniture", "Automotive", "Clothing", "Other"]

  const steps = [
    {
      label: "Upload Document",
      description: "Upload your warranty document",
      icon: <Upload size={20} />,
    },
    {
      label: "Review Details",
      description: "Review and edit warranty information",
      icon: <Edit size={20} />,
    },
    {
      label: "Save Warranty",
      description: "Confirm and save your warranty",
      icon: <Save size={20} />,
    },
  ]

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
      setError(null)
    }
  }

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragActive(false)
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      setFile(event.dataTransfer.files[0])
      setError(null)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setFormValues({
      nameProduct: "",
      company: "",
      category: "",
      expirationDate: "",
      linkFile: "",
    })
    setDisabled(false)
    setError(null)
    setSuccess(null)
    setActiveStep(0)
  }

  const handleFileUploadAndExtractData = async () => {
    if (!file || !user) return
    setLoading(true)
    setAnalyzing(true)
    setError(null)
    setSuccess(null)

    try {
      const uploadUrl = await uploadFile({ fileName: `${user.id}/${file.name}`, contentType: file.type })
      await axios.put(uploadUrl, file, { headers: { "Content-Type": file.type } })

      const downloadUrl = await downloadFile({ fileName: `${user.id}/${file.name}` })
      const aiResponse = await analyzeFile(downloadUrl)

      if (aiResponse.status === 200) {
        const response = aiResponse.data

        setFormValues({
          nameProduct: response.product_name || "",
          company: response.company_name || "",
          category: "",
          expirationDate: response.expiration_date || "",
          linkFile: `${user.id}/${file.name}`,
        })
        setDisabled(true)
        setSuccess("Document analyzed successfully! Please review and complete the form.")
        setActiveStep(1) // Move to next step
      } else {
        setError(aiResponse.data.message || "An unknown error occurred.")
      }
    } catch (error: any) {
      console.error("Error:", error)
      setError(error.response?.data?.error || "There was an error processing your file.")
    } finally {
      setLoading(false)
      setAnalyzing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleNext = () => {
    if (activeStep === 1) {
      if (!formValues.nameProduct || !formValues.expirationDate) {
        setError("Please fill in all required fields.")
        return
      }
    }
    setError(null)
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    setError(null)
  }

  const handleSubmit = async () => {
    if (!formValues.nameProduct || !formValues.expirationDate) {
      setError("Please fill in all required fields.")
      return
    }

    setSaving(true)
    try {
      if (user && token) {
        const res = await dispatch(addWarranty({ token, warranty: formValues })).unwrap()
        if (res) {
          await dispatch(
            addRecord({
              token,
              record: { warrantyId: res.id, userId: user.id, roleWarranty: "OWNER", emailOwner: user.email },
            }),
          )
          navigate("/record")
        }
      }
    } catch (error: any) {
      setError("Failed to save warranty. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            sx={{ mt: 2 }}
          >
            <Box
              sx={{
                p: 4,
                textAlign: "center",
                border: "2px dashed",
                borderColor: dragActive ? "primary.main" : (theme) => alpha(theme.palette.primary.main, 0.3),
                borderRadius: 3,
                bgcolor: dragActive
                  ? (theme) => alpha(theme.palette.primary.main, 0.05)
                  : (theme) => alpha(theme.palette.background.default, 0.7),
                cursor: "pointer",
                transition: "all 0.2s ease",
                minHeight: 300,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              {!file ? (
                <>
                  <FileUp size={64} color={theme.palette.primary.main} style={{ opacity: 0.7, marginBottom: 24 }} />
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    Upload Warranty Document
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
                    Drag & drop your warranty document here, or click to browse files. We support PDF, JPG, and PNG
                    formats.
                  </Typography>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    hidden
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 500,
                      px: 4,
                    }}
                  >
                    Select File
                  </Button>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      maxWidth: 400,
                      p: 3,
                      bgcolor: (theme) => alpha(theme.palette.background.default, 0.9),
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: "divider",
                      mb: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <FileText size={32} color={theme.palette.primary.main} />
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            maxWidth: "250px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {file.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton
                      disabled={loading || analyzing}
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveFile()
                      }}
                      sx={{
                        "&:hover": {
                          bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                        },
                      }}
                    >
                      <X size={20} />
                    </IconButton>
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading || analyzing}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleFileUploadAndExtractData()
                    }}
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 500,
                      px: 4,
                    }}
                  >
                    {analyzing ? (
                      <>
                        <CircularProgress size={24} sx={{ mr: 2, color: "white" }} />
                        Analyzing Document...
                      </>
                    ) : (
                      <>
                        <Upload size={20} style={{ marginRight: 8 }} />
                        Analyze Document
                      </>
                    )}
                  </Button>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2, maxWidth: 400, textAlign: "center" }}>
                    Our AI will analyze your document and extract warranty details automatically
                  </Typography>
                </>
              )}
            </Box>
          </MotionBox>
        )

      case 1:
        return (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            sx={{ mt: 2 }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Package size={20} />
              Review Warranty Details
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Package size={16} />
                  Product Name*
                </Typography>
                <TextField
                  name="nameProduct"
                  value={formValues.nameProduct}
                  onChange={handleInputChange}
                  fullWidth
                  placeholder="Enter product name"
                  variant="outlined"
                  size="small"
                  required
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Building size={16} />
                  Company Name
                </Typography>
                <TextField
                  name="company"
                  value={formValues.company}
                  onChange={handleInputChange}
                  fullWidth
                  placeholder="Enter company name"
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Tag size={16} />
                  Category
                </Typography>
                <TextField
                  select
                  name="category"
                  value={formValues.category}
                  onChange={handleInputChange}
                  fullWidth
                  placeholder="Select category"
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                >
                  {categories.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Calendar size={16} />
                  Expiration Date*
                </Typography>
                <TextField
                  name="expirationDate"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={formValues.expirationDate}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>
            </Grid>

            {file && (
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                }}
              >
                <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 500 }}>
                  <FileText size={16} />
                  Attached Document: {file.name}
                </Typography>
              </Box>
            )}
          </MotionBox>
        )

      case 2:
        return (
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            sx={{ mt: 2 }}
          >
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Check size={20} />
              Confirm Warranty Details
            </Typography>

            <Box
              sx={{
                p: 3,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.5),
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Product Name
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                    {formValues.nameProduct || "Not specified"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Company
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                    {formValues.company || "Not specified"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Category
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                    {formValues.category || "Not specified"}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Expiration Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>
                    {formValues.expirationDate || "Not specified"}
                  </Typography>
                </Grid>

                {file && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      Document
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {file.name}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>

            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={saving || !formValues.nameProduct || !formValues.expirationDate}
              onClick={handleSubmit}
              startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <Save size={20} />}
              sx={{
                mt: 3,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 500,
                px: 4,
              }}
            >
              {saving ? "Saving Warranty..." : "Save Warranty"}
            </Button>
          </MotionBox>
        )

      default:
        return null
    }
  }

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      elevation={0}
      sx={{
        p: 0,
        maxWidth: 1000,
        mx: "auto",
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
          borderBottom: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FileText size={24} color={theme.palette.primary.main} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Add New Warranty
          </Typography>
        </Box>
      </Box>

      {/* Success/Error Messages */}
      {success && (
        <Fade in={Boolean(success)}>
          <Box
            sx={{
              p: 2,
              bgcolor: (theme) => alpha(theme.palette.success.main, 0.1),
              color: "success.main",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <CheckCircle size={18} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {success}
            </Typography>
          </Box>
        </Fade>
      )}

      {error && (
        <Fade in={Boolean(error)}>
          <Box
            sx={{
              p: 2,
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
              color: "error.main",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <AlertTriangle size={18} />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              {error}
            </Typography>
          </Box>
        </Fade>
      )}

      {/* Stepper Content */}
      <Box sx={{ p: 3 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                icon={
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: activeStep >= index ? "primary.main" : "grey.300",
                      color: activeStep >= index ? "white" : "grey.600",
                    }}
                  >
                    {step.icon}
                  </Box>
                }
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {step.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              </StepLabel>
              <StepContent>
                {renderStepContent(index)}

                {/* Step Navigation */}
                {index < 2 && (
                  <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                    <Button
                      disabled={index === 0}
                      onClick={handleBack}
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 500,
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disabled={
                        (index === 0 && !success) ||
                        (index === 1 && (!formValues.nameProduct || !formValues.expirationDate))
                      }
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 500,
                      }}
                    >
                      {index === 1 ? "Review & Continue" : "Continue"}
                    </Button>
                  </Box>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Divider sx={{ my: 3 }} />

        {/* Cancel Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/record")}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </MotionPaper>
  )
}

export default AddWarranty
