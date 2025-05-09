
// import { Card, Chip, Typography, Box, Skeleton } from "@mui/material"
// import { useDispatch, useSelector } from "react-redux"
// import type { AddDispatch, StoreType } from "../../redux/store"
// import { useNavigate } from "react-router-dom"
// import { useEffect, useState } from "react"
// import { getRecords } from "../../redux/recordSlice"
// import { CalendarIcon, BuildingIcon } from "lucide-react"

// const RecordsList = () => {
//   const dispatch = useDispatch<AddDispatch>()
//   const navigate = useNavigate()

//   const { user, token } = useSelector((state: StoreType) => state.auth)
//   const { records, searchQuery, selectedCategory, loading, error } = useSelector((state: StoreType) => state.records)

//   // State for filtered list
//   const [filteredRecords, setFilteredRecords] = useState(records)

//   useEffect(() => {
//     if (user && token) dispatch(getRecords({ token, userId: user.id }))
//   }, [dispatch, user, token])

//   useEffect(() => {
//     const filtered = records.filter((record) => {
//       const matchesSearch = record.warranty.nameProduct.toLowerCase().includes(searchQuery.toLowerCase())
//       const matchesCategory = selectedCategory ? record.warranty.category === selectedCategory : true
//       return matchesSearch && matchesCategory
//     })
//     setFilteredRecords(filtered)
//   }, [records, searchQuery, selectedCategory])

//   if (loading) {
//     return (
//       <div className="space-y-4 w-full">
//         {[1, 2, 3].map((i) => (
//           <Card key={i} className="p-4 rounded-lg shadow-sm border border-gray-100">
//             <Skeleton variant="text" width="60%" height={28} />
//             <Skeleton variant="text" width="40%" height={20} />
//             <Skeleton variant="text" width="30%" height={20} />
//           </Card>
//         ))}
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <Box className="text-center p-6 bg-red-50 rounded-lg">
//         <Typography color="error">Error loading warranty records: {error}</Typography>
//       </Box>
//     )
//   }

//   if (!filteredRecords.length) {
//     return (
//       <Box className="text-center p-8 bg-gray-50 rounded-lg border border-gray-100">
//         <Typography className="text-gray-500">
//           No warranty records found. Add your first warranty document to get started.
//         </Typography>
//       </Box>
//     )
//   }

//   const isExpired = (date: string) => {
//     return new Date(date) < new Date()
//   }

//   return (
//     <div className="space-y-3 w-full">
//       {filteredRecords.map((record) => {
//         const expired = isExpired(record.warranty.expirationDate)

//         return (
//           <Card
//             key={record.id}
//             onClick={() => navigate(`/record/${record.id}`)}
//             className="p-5 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
//             sx={{
//               "&:hover": {
//                 borderColor: "rgba(0, 0, 0, 0.12)",
//               },
//             }}
//           >
//             <div className="flex justify-between items-start">
//               <div className="space-y-2">
//                 <Typography variant="h6" className="font-medium text-gray-900">
//                   {record.warranty.nameProduct}
//                 </Typography>

//                 <div className="flex items-center text-gray-500 space-x-4">
//                   <div className="flex items-center">
//                     <BuildingIcon size={16} className="mr-1.5" />
//                     <Typography variant="body2">{record.warranty.company}</Typography>
//                   </div>

//                   <div className="flex items-center">
//                     <CalendarIcon size={16} className="mr-1.5" />
//                     <Typography variant="body2">
//                       {new Date(record.warranty.expirationDate).toLocaleDateString()}
//                     </Typography>
//                   </div>
//                 </div>
//               </div>

//               <Chip
//                 label={expired ? "Expired" : "Valid"}
//                 size="small"
//                 color={expired ? "error" : "success"}
//                 sx={{
//                   fontWeight: 500,
//                   backgroundColor: expired ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)",
//                   color: expired ? "rgb(220, 38, 38)" : "rgb(22, 163, 74)",
//                   borderRadius: "4px",
//                 }}
//               />
//             </div>

//             {record.warranty.category && (
//               <Typography variant="body2" className="mt-2 text-gray-400">
//                 Category: {record.warranty.category}
//               </Typography>
//             )}
//           </Card>
//         )
//       })}
//     </div>
//   )
// }

// export default RecordsList
"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Card, Typography, Box, Skeleton, Chip, Divider, alpha, Stack, Fade } from "@mui/material"
import { CalendarClock, Building2, Shield, AlertCircle, ChevronRight } from "lucide-react"
import type { AddDispatch, StoreType } from "../../redux/store"
import { getRecords } from "../../redux/recordSlice"
import { motion } from "framer-motion"

const MotionCard = motion(Card)

const RecordsList = () => {
  const dispatch = useDispatch<AddDispatch>()
  const navigate = useNavigate()

  const { user, token } = useSelector((state: StoreType) => state.auth)
  const { records, searchQuery, selectedCategory, loading, error } = useSelector((state: StoreType) => state.records)

  // State for filtered list
  const [filteredRecords, setFilteredRecords] = useState(records)

  useEffect(() => {
    if (user && token) dispatch(getRecords({ token, userId: user.id }))
  }, [dispatch, user, token])

  useEffect(() => {
    const filtered = records.filter((record) => {
      const matchesSearch = record.warranty.nameProduct.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory ? record.warranty.category === selectedCategory : true
      return matchesSearch && matchesCategory&& record.roleWarranty=="OWNER"
    })
    setFilteredRecords(filtered)
  }, [records, searchQuery, selectedCategory])

  if (loading) {
    return (
      <Stack spacing={2} width="100%">
        {[1, 2, 3].map((i) => (
          <Fade key={i} in={true} timeout={300 * i}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
              }}
            >
              <Skeleton variant="rectangular" width="50%" height={28} sx={{ mb: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" width="70%" height={20} sx={{ mb: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" width="40%" height={20} sx={{ borderRadius: 1 }} />
            </Card>
          </Fade>
        ))}
      </Stack>
    )
  }

  if (error) {
    return (
      <Box
        sx={{
          textAlign: "center",
          p: 4,
          bgcolor: alpha("#f44336", 0.08),
          borderRadius: 2,
          border: `1px solid ${alpha("#f44336", 0.2)}`,
        }}
      >
        <AlertCircle size={32} color="#f44336" style={{ marginBottom: 12 }} />
        <Typography color="error" variant="h6" sx={{ mb: 1 }}>
          Unable to Load Warranties
        </Typography>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Box>
    )
  }

  if (!filteredRecords.length) {
    return (
      <Box
        sx={{
          textAlign: "center",
          p: 5,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
          borderRadius: 2,
          border: (theme) => `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
        }}
      >
        <Shield size={40} style={{ marginBottom: 16, opacity: 0.6 }} />
        <Typography variant="h6" sx={{ mb: 1, color: "text.primary" }}>
          No Warranty Records Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Add your first warranty document to get started.
        </Typography>
      </Box>
    )
  }

  const isExpired = (date: string) => {
    return new Date(date) < new Date()
  }

  const getTimeRemaining = (expirationDate: string) => {
    const now = new Date()
    const expDate = new Date(expirationDate)
    const diffTime = expDate.getTime() - now.getTime()

    if (diffTime < 0) return "Expired"

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays > 365) {
      const years = Math.floor(diffDays / 365)
      return `${years} ${years === 1 ? "year" : "years"} left`
    } else if (diffDays > 30) {
      const months = Math.floor(diffDays / 30)
      return `${months} ${months === 1 ? "month" : "months"} left`
    } else {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} left`
    }
  }

  return (
    <Stack spacing={2} width="100%">
      {filteredRecords.map((record, index) => {
        const expired = isExpired(record.warranty.expirationDate)
        const timeRemaining = getTimeRemaining(record.warranty.expirationDate)

        return (
          <MotionCard
            key={record.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => navigate(`/record/${record.id}`)}
            sx={{
              p: 0,
              overflow: "hidden",
              cursor: "pointer",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.09)",
                "& .arrow-icon": {
                  transform: "translateX(4px)",
                  opacity: 1,
                },
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    mb: 0.5,
                  }}
                >
                  {record.warranty.nameProduct}
                </Typography>

                <Chip
                  label={expired ? "Expired" : "Active"}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    px: 1,
                    backgroundColor: expired ? alpha("#f44336", 0.1) : alpha("#10a37f", 0.1),
                    color: expired ? "#f44336" : "#10a37f",
                    borderRadius: "6px",
                    height: "24px",
                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                />
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Building2 size={16} style={{ marginRight: 8, opacity: 0.7 }} />
                  <Typography variant="body2" color="text.secondary">
                    {record.warranty.company}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarClock size={16} style={{ marginRight: 8, opacity: 0.7 }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(record.warranty.expirationDate).toLocaleDateString()}
                    <Typography
                      component="span"
                      sx={{
                        ml: 0.5,
                        color: expired ? "#f44336" : "#10a37f",
                        fontWeight: 500,
                      }}
                    >
                      ({timeRemaining})
                    </Typography>
                  </Typography>
                </Box>
              </Stack>

              {record.warranty.category && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.disabled",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {record.warranty.category}
                </Typography>
              )}
            </Box>

            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                p: 1.5,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.7),
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "primary.main",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                View Details
                <ChevronRight
                  className="arrow-icon"
                  size={16}
                  style={{
                    marginLeft: 4,
                    transition: "all 0.2s ease",
                    opacity: 0.7,
                  }}
                />
              </Typography>
            </Box>
          </MotionCard>
        )
      })}
    </Stack>
  )
}

export default RecordsList

