

import { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Chip,
  IconButton,
  Grid,
  Divider,
  Skeleton,
  Alert,
} from "@mui/material"
import {
  ArrowBack as ArrowBackIcon,
  CalendarToday as CalendarIcon,
  Business as BusinessIcon,
  Category as CategoryIcon,
} from "@mui/icons-material"
import { useNavigate, useParams } from "react-router-dom"
import SharedDialog from "../sharedDialog"
import { getRecords } from "../../redux/recordSlice"
import { Record } from "../../models/record"
import { useDispatch, useSelector } from "react-redux"
import { AddDispatch, StoreType } from "../../redux/store"
import SharedWith from "../sharedWith"
import MenuWarranty from "./menu"
import ShowFile from "../showFile"
import { ArrowLeft } from "lucide-react"

const WarrantyDetails = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useDispatch<AddDispatch>()
  const { token, user } = useSelector((state: StoreType) => state.auth)
  const { records, loading, error } = useSelector((state: StoreType) => state.records)
  const [record, setRecord] = useState<Record>()

  useEffect(() => {
    if (id && token && user?.id) {
      if (!records.find((r: Record) => r.id === +id) && token) {
        dispatch(getRecords({ token, userId: user?.id }))
      } else {
        setRecord(records.find((r: Record) => r.id === +id))
      }
    }
  }, [])

  useEffect(() => {
    if (records.length > 0 && id) {
      const foundRecord = records.find((r: Record) => r.id === +id)
      if (foundRecord) {
        setRecord(foundRecord)
      }
    }
    console.log(record);
    console.log(record?.roleWarranty);

  }, [records, id])

  const isExpired = (date: string | undefined) => {
    if (date) return new Date(date) < new Date()
    return false
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const expired = isExpired(record?.warranty.expirationDate)
  const daysLeft = !expired
    ? Math.ceil((new Date(record?.warranty.expirationDate || "").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : 0

  if (loading) {
    return (
      <Box className="max-w-3xl mx-auto p-6">
        <Box className="flex items-center mb-6">
          <IconButton onClick={() => navigate(-1)} className="mr-2">
            <ArrowLeft size={20} />
          </IconButton>
          <Skeleton variant="text" width={200} height={40} />
        </Box>
        <Paper className="p-6 rounded-lg shadow-sm">
          <Skeleton variant="text" width="70%" height={40} />
          <Skeleton variant="text" width="50%" height={30} className="mt-4" />
          <Skeleton variant="text" width="40%" height={30} className="mt-2" />
          <Skeleton variant="text" width="60%" height={30} className="mt-2" />
          <Skeleton variant="rectangular" width="100%" height={200} className="mt-6" />
        </Paper>
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="max-w-3xl mx-auto p-6">
        <IconButton onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={20} />
        </IconButton>
        <Alert severity="error">Error loading warranty details: {error}</Alert>
      </Box>
    )
  }

  if (!record) {
    return (
      <Box className="max-w-3xl mx-auto p-6">
        <IconButton onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={20} />
        </IconButton>
        <Alert severity="info">Warranty record not found.</Alert>
      </Box>
    )
  }
  return (
    <>
      <Box sx={{ width: "80vw", marginRight: "10" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => navigate(-1)} sx={{ mr: 2, backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
              Warranty Details
            </Typography>
            {record.roleWarranty!="VIEWER" &&
            <MenuWarranty record={record}></MenuWarranty>}
          </Box>

        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid rgba(0, 0, 0, 0.08)" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {record?.warranty.nameProduct}
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Chip
                    label={expired ? "Expired" : "Valid"}
                    size="small"
                    sx={{
                      fontWeight: 500,
                      backgroundColor: expired ? "rgba(211, 47, 47, 0.1)" : "rgba(46, 125, 50, 0.1)",
                      color: expired ? "error.main" : "success.main",
                    }}
                  />
                  <Chip
                    label={record?.roleWarranty}
                    size="small"
                    sx={{
                      fontWeight: 500,
                      backgroundColor: "rgba(25, 118, 210, 0.1)",
                      color: "primary.main",
                    }}
                  />
                  {record.roleWarranty != "OWNER" && record.emailOwner && (
                    <Chip
                      label={`Shared by: ${record.emailOwner}`}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        backgroundColor: "rgba(255, 193, 7, 0.1)",
                        color: "warning.main",
                      }}
  
                    />
                  )}

                </Box>
              </Box>


              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <BusinessIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Company
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }} color="text.secondary">
                      {record?.warranty.company}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <CategoryIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Category
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {record.warranty.category}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <CalendarIcon fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />
                      <Typography variant="body2" color="text.secondary">
                        Warranty Expiration
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: expired ? "error.main" : daysLeft < 30 ? "warning.main" : "inherit",
                      }}
                    >
                      {formatDate(record?.warranty.expirationDate || "")}
                      {!expired && daysLeft > 0 && (
                        <Typography
                          component="span"
                          sx={{
                            ml: 1,
                            fontSize: "0.875rem",
                            color: daysLeft < 30 ? "warning.main" : "success.main",
                          }}
                        >
                          ({daysLeft} days left)
                        </Typography>
                      )}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Warranty Document
              </Typography>

              <ShowFile warranty={record.warranty} fileName={record.warranty?.linkFile}></ShowFile>

            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            {record.roleWarranty === "OWNER" && (
              <>
                <SharedDialog record={record} showButton={true} />
                {record.warranty.records.length > 1 && (
                  <SharedWith recordId={record.id} />
                )}
              </>
            )}

            {/* {expired && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid rgba(0, 0, 0, 0.08)",
                  backgroundColor: "error.main",
                  color: "white",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Warranty Expired
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                  Your warranty for this product has expired. Consider the following options:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Button
                    variant="contained"
                    color="inherit"
                    sx={{
                      color: "error.main",
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: "8px",
                    }}
                  >
                    Contact Support
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{
                      borderColor: "rgba(255, 255, 255, 0.5)",
                      color: "white",
                      textTransform: "none",
                      fontWeight: 500,
                      borderRadius: "8px",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Purchase New Product
                  </Button>
                </Box>
              </Paper>
            )} */}
          </Grid>
        </Grid>
      </Box>
    </>)

}

export default WarrantyDetails
